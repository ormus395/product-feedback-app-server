import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  NotFoundException,
  UseInterceptors,
  BadRequestException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SerializeInterceptor } from '../interceptors/serialize.interceptor';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';

@Controller('users')
@UseInterceptors(new SerializeInterceptor(UserDto))
export class UsersController {
  constructor(private usersSerive: UsersService) {}
  @Post('/signup')
  async signup(@Body() body: CreateUserDto) {
    return await this.usersSerive
      .create(body.email, body.password)
      .catch((err) => {
        throw new BadRequestException(err.message);
      });
  }

  @Get('/all')
  async findAll() {
    return this.usersSerive.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/protected')
  getProfile(@Request() req) {
    console.log(req.user);
  }

  @Get('/:id')
  async getUser(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersSerive.findOne(id);

    if (!user) {
      throw new NotFoundException('A user was not found with that ID');
    }

    return user;
  }

  @Patch('/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ) {
    return this.usersSerive.update(id, body);
  }

  @Delete('/:id')
  async removeUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersSerive.remove(id);
  }

  @Get()
  findUserByEmail(@Query('email') email: string) {
    return this.usersSerive.find(email);
  }
}
