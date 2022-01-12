import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const [user] = await this.usersService.find(email);
    if (user) {
      const isMatch = await bcrypt.compare(pass, user.password);
      if (isMatch) {
        return user;
      }
      return null;
    }

    return null;
  }

  async login(user: any) {
    console.log(user);
    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);

    console.log(token);
    return {
      accessToken: token,
    };
  }
}
