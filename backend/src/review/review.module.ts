import { Module } from '@nestjs/common';
import { CaptchaModule } from 'src/captcha/captcha.module';
import { DatabaseService } from 'src/database/database.service';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

@Module({
  imports: [CaptchaModule],
  controllers: [ReviewController],
  providers: [ReviewService, DatabaseService],
  exports: [ReviewService],
})
export class ReviewModule {}
