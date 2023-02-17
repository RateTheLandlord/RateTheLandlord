import { Injectable, UnauthorizedException } from '@nestjs/common';
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

  updateUserFailedLogin = (user: IUser) => {
    console.log('Failed Login: ', user);
    if (user.login_attempts >= 2 && !user.login_lockout) {
      const failedLoginUser = {
        ...user,
        last_login_attempt: new Date(Date.now()).toString(),
        login_lockout: true,
      };
      this.userService.update(user.id, failedLoginUser);
    } else if (user.login_attempts >= 2 && user.login_lockout) {
      console.log('User Locked Out Already');
    } else {
      const failedLoginUser = {
        ...user,
        login_attempts: user.login_attempts + 1,
      };
      this.userService.update(user.id, failedLoginUser);
    }
  };

  resetUser = (user: IUser) => {
    console.log('Reset User: ', user);
    const updatedUser = {
      ...user,
      login_attempts: 0,
      login_lockout: false,
    };
    this.userService.update(user.id, updatedUser);
  };

  async validateUser(email: string, pass: string): Promise<any> {
    const findUsers = await this.userService.findOne(email);

    if (findUsers.length) {
      const user = findUsers[0];

      if (user.login_lockout) {
        const currDate = new Date();
        const lockoutTime = new Date(user.last_login_attempt);
        const milliseconds = Math.abs(
          lockoutTime.getTime() - currDate.getTime(),
        );
        const hours = milliseconds / 1000 / 3600;

        console.log('Hours: ', hours);

        if (hours >= 1) {
          // Update login attempts on User to 0
          // Update lockout on User to false
          this.resetUser(user);
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
            this.updateUserFailedLogin(user);
            // Return Failed Login
            return UnauthorizedException;
          }
        } else {
          console.log('User Locked Out');
          return UnauthorizedException;
        }
      } else {
        console.log('User Not Locked Out');
        const isMatch = await bcrypt.compare(pass, user.password);
        if (isMatch) {
          console.log('Match');
          const jwt = await this.login(user);

          const { password, ...result } = user;
          const response = {
            result: result,
            jwt: jwt,
          };
          return response;
        } else {
          // Update Login Attempts + 1
          this.updateUserFailedLogin(user);
          // Return Failed Login
          return UnauthorizedException;
        }
      }
    } else {
      return UnauthorizedException;
    }
  }

  async login(user: IUser) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
