import {
  Controller,
  Post,
  Request,
  Body,
  UseGuards,
  UseInterceptors,
  Get,
} from '@nestjs/common';
import { SerializeInterceptor } from '../interceptors/serialize.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { UserDto } from '../users/dto/user.dto';

// @UseInterceptors(new SerializeInterceptor(UserDto))
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/protected')
  getProtected() {
    return 'This route is protected';
  }

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new SerializeInterceptor(UserDto))
  @Get('/profile')
  async getProfile(@Request() req) {
    return this.userService.findOne(req.user.id);
  }
}
