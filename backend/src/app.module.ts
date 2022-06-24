import { Module } from '@nestjs/common';
import { SampleModule } from './sample/sample.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), SampleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
