import { Controller, Request, Post } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('admincontroller')
  async create(@Request() req) {
    return this.userService.create(req.body);
  }

  // @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    console.log('login request');
    return this.authService.validateUser(req.body.email, req.body.password);
  }
}
