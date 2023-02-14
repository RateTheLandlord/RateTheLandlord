import { BadRequestException, Injectable } from '@nestjs/common';
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
    const findUsers = await this.userService.findOne(email);
    if (findUsers.length) {
      const user = findUsers[0];

      if (user.login_lockout) {
        const currDate = new Date();
        const lastLoginDate = new Date(user.last_login_attempt);
        const milliseconds = Math.abs(
          lastLoginDate.getTime() - currDate.getTime(),
        );
        const hours = milliseconds / 1000 / 3600;

        if (hours >= 1) {
          // Update login attempts on User to 0
          // Update lockout on User to false
          const isMatch = await bcrypt.compare(pass, user.password);
          if (isMatch) {
            const jwt = await this.login(user);

            const { password, ...result } = user;
            const response = {
              result: result,
              jwt: jwt,
            };
            return response;
          }
          // Update Login Attempts + 1
          // Return Failed Login
        }
      } else {
        // Return a lockout reply
      }
      const isMatch = await bcrypt.compare(pass, user.password);
      if (isMatch) {
        const jwt = await this.login(user);

        const { password, ...result } = user;
        const response = {
          result: result,
          jwt: jwt,
        };
        return response;
      } else {
        // Update Login Attempts + 1
        // Return Failed Login
      }
    }
    // Return Failed Login
    return BadRequestException;
  }

  async login(user: IUser) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
