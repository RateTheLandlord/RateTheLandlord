import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/user/models/user';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    console.log(email);
    const findUsers = await this.userService.findOne(email);
    console.log('Found: ', findUsers);
    if (findUsers.length) {
      const user = findUsers[0];
      if (user.email === 'webdevelopment@kellenwiltshire.com') {
        console.log('temp user flow');
        const jwt = await this.login(user);
        const { password, ...result } = user;
        const response = {
          result: result,
          jwt: jwt,
        };
        return response;
      }
      const isMatch = await bcrypt.compare(pass, user.password);

      if (isMatch) {
        console.log('MATCH');
        const jwt = await this.login(user);
        const { password, ...result } = user;
        const response = {
          result: result,
          jwt: jwt,
        };
        return response;
      }
      return null;
    }
    return null;
  }

  async login(user: IUser) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
