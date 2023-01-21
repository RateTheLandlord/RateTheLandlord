import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
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

  @Get('review/:id')
  findOne(@Param('id') id: string): Promise<Review[]> {
    return this.reviewService.findOne(Number(id));
  }

  //@Put() needed for updating reviews

  //@Delete needed for deleting reviews

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
