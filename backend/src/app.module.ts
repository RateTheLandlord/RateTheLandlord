import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CaptchaModule } from './captcha/captcha.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [ConfigModule.forRoot(), ReviewModule, CaptchaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
