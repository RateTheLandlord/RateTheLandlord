import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { SampleController } from './sample.controller';
import { SampleService } from './sample.service';

@Module({
  imports: [],
  controllers: [SampleController],
  providers: [SampleService, DatabaseService],
})
export class SampleModule {}
