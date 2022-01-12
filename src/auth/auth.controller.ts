import {
  Controller,
  Post,
  Request,
  Body,
  UseGuards,
  UseInterceptors,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

// @UseInterceptors(new SerializeInterceptor(UserDto))
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

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
}
