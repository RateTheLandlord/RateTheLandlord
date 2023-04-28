import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CaptchaService } from 'src/captcha/captcha-service';
import { IpAddress } from 'src/decorators/ip-address/ip-address.decorator';
import { CreateReview } from './models/create-review';
import { Review } from './models/review';
import { ReviewService, ReviewsResponse } from './review.service';
import { SkipThrottle, Throttle } from '@nestjs/throttler';

@Controller('review')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    private captchaService: CaptchaService,
  ) {}

  // Get All Reviews
  @SkipThrottle()
  @Get()
  get(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
    @Query('sort') sort?: 'az' | 'za' | 'new' | 'old',
    @Query('state') state?: string,
    @Query('country') country?: string,
    @Query('city') city?: string,
    @Query('zip') zip?: string,
  ): Promise<ReviewsResponse> {
    return this.reviewService.get({
      page,
      limit,
      search,
      sort,
      state,
      country,
      city,
      zip,
    });
  }

  //Get Specific Review
  @Get('review/:id')
  findOne(@Param('id') id: string): Promise<Review[]> {
    return this.reviewService.findOne(Number(id));
  }

  //Update Review
  @Throttle(10, 10)
  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() review: Review,
  ): Promise<Review> {
    return this.reviewService.update(id, review);
  }

  @Throttle(5, 60)
  @Put('/report/:id')
  async report(@Param('id') id:number, @Body() reason: any): Promise<number> {
    return this.reviewService.report(id, reason.flagged_reason)
  }

  //Delete Review
  @Throttle(10, 120)
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<boolean> {
    return this.reviewService.delete(id);
  }

  //Create Review
  @Throttle(2, 60)
  @Post()
  async create(
    @Body() review: CreateReview,
    @IpAddress() ip: string,
  ): Promise<Review> {
    const validRequest = await this.captchaService.verifyToken(
      review.captchaToken,
      ip,
    );

    if (!validRequest) {
      throw new BadRequestException('Invalid captcha');
    }

    return this.reviewService.create(review.review);
  }

  //Get Flagged Reviews
  @Throttle(10, 120)
  @UseGuards(JwtAuthGuard)
  @Get('/flagged')
  getFlagged(): Promise<Review[]> {
    return this.reviewService.getFlagged();
  }
}
