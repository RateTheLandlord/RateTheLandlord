import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CaptchaModule } from './captcha/captcha.module';
import { ReviewModule } from './review/review.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigModule.forRoot(), ReviewModule, CaptchaModule, AuthModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
