import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { CaptchaService } from 'src/captcha/captcha-service';
import { IpAddress } from 'src/decorators/ip-address/ip-address.decorator';
import { CreateReview } from './models/create-review';
import { Review } from './models/review';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    private captchaService: CaptchaService,
  ) {}

  @Get()
  get(): Promise<Review[]> {
    return this.reviewService.get();
  }

  @Post()
  async create(
    @Body() review: CreateReview,
    @IpAddress() ip: string,
  ): Promise<Review> {
    console.log(review);
    const validRequest = await this.captchaService.verifyToken(
      review.captchaToken,
      ip,
    );

    if (!validRequest) {
      throw new BadRequestException('Invalid captcha');
    }

    return this.reviewService.create(review.review);
  }
}
