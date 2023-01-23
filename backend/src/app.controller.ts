import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  //Needs to be updated to return reviews that have been flagged
  @UseGuards(JwtAuthGuard)
  @Get('review/flagged')
  getProfile(@Request() req) {
    return req.review;
  }

  //Needs a protected router to return all users if user is admin
}
