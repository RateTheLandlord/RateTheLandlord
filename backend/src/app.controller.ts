import { Controller, Request, Post } from '@nestjs/common';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  // @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.validateUser(req.body.email, req.body.password);
  }
}
