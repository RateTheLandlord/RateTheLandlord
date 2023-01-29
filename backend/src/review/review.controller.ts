import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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

  // Get All Reviews
  @Get()
  get(): Promise<Review[]> {
    return this.reviewService.get();
  }

  //Get Specific Review
  @Get('review/:id')
  findOne(@Param('id') id: string): Promise<Review[]> {
    return this.reviewService.findOne(Number(id));
  }

  //Update Review
  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() review: Review,
  ): Promise<Review> {
    return this.reviewService.update(id, review);
  }

  //Delete Review
  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<boolean> {
    return this.reviewService.delete(id);
  }

  //Create Review
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

    // if (!validRequest) {
    //   throw new BadRequestException('Invalid captcha');
    // }

    return this.reviewService.create(review.review);
  }

  //Get Flagged Reviews
  @Get('/flagged')
  getFlagged(): Promise<Review[]> {
    return this.reviewService.getFlagged();
  }
}
