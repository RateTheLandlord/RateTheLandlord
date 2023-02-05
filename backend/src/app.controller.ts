import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { ReviewService } from './review/review.service';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private reviewService: ReviewService,
  ) {}

  // @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    console.log('login request');
    return this.authService.validateUser(req.body.email, req.body.password);
  }
}
