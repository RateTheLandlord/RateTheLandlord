import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { ReviewService } from './review/review.service';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private reviewService: ReviewService,
  ) {}

  //   @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.validateUser(req.body.email, req.body.password);
  }

  //Protected Route to return all flagged reviews
  //   @UseGuards(JwtAuthGuard)
  @Get('review/flagged')
  getFlagged() {
    return this.reviewService.getFlagged();
  }
}
