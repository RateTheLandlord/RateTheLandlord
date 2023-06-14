import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
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
import { IStats, Review, ReviewsResponse } from './models/review';
import { ReviewService } from './review.service';
import { Throttle } from '@nestjs/throttler';
import { INTERNAL_SERVER_ERROR, NOT_ACCEPTABLE } from '../auth/constants';

export type ReviewControllerException = {
  statusCode: number;
  message: string | object;
};

@Controller('review')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    private captchaService: CaptchaService,
  ) {}

  private handleException(
    e: BadRequestException | HttpException | unknown,
  ): never {
    if (e instanceof BadRequestException) {
      throw new HttpException(NOT_ACCEPTABLE, HttpStatus.NOT_ACCEPTABLE);
    } else {
      throw new HttpException(
        INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Get All Reviews
  @Throttle(5, 60)
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
  @Throttle(2, 10)
  @Get('review/:id')
  findOne(@Param('id') id: string): Promise<Review[]> {
    return this.reviewService.findOne(Number(id));
  }

  // Update Review
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
  async report(
    @Param('id') id: number,
    @Body() body: any,
    @IpAddress() ip: string,
  ): Promise<number> {
    const validRequest: boolean = await this.captchaService.verifyToken(
      body.captchaToken,
      ip,
    );

    if (!validRequest) {
      throw new BadRequestException('Invalid captcha');
    }
    return this.reviewService.report(id, body.flagged_reason);
  }

  //Delete Review
  @Throttle(10, 120)
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<boolean> {
    return this.reviewService.delete(id);
  }

  //Create Review
  @Throttle(2, 2628000)
  @Post()
  async create(
    @Body() review: CreateReview,
    @IpAddress() ip: string,
  ): Promise<Review | ReviewControllerException> {
    try {
      await this.captchaService.verifyToken(review.captchaToken, ip);
      return await this.reviewService.create(review.review);
    } catch (e) {
      return this.handleException(e);
    }
  }

  //Get Flagged Reviews
  @Throttle(10, 120)
  @UseGuards(JwtAuthGuard)
  @Get('/flagged')
  getFlagged(): Promise<Review[]> {
    return this.reviewService.getFlagged();
  }

  @Throttle(10, 120)
  @UseGuards(JwtAuthGuard)
  @Get('/stats')
  getStats(): Promise<IStats> {
    return this.reviewService.getStats();
  }

  @Throttle(10, 120)
  @Get('/landlords')
  getLandlords(): Promise<string[]> {
    return this.reviewService.getLandlords();
  }

  @Throttle(10, 120)
  @Post('/landlords/landlord')
  getLandlordReviews(
    @Body() landlord: { landlord: string },
  ): Promise<Review[]> {
    return this.reviewService.getLandlordReviews(landlord.landlord);
  }
}
