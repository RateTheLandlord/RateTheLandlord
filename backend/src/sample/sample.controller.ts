import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { SampleService } from './sample.service';

@Controller('sample')
export class SampleController {
  constructor(
    private readonly sampleService: SampleService,
    private readonly databaseService: DatabaseService,
  ) {}

  @Get()
  async getHello(): Promise<string> {
    const num = await this.databaseService.sql<Sample[]>`SELECT 4 + 4 as num`;
    return this.sampleService.getHello() + num[0].num;
  }
}

export interface Sample {
  num: number;
}
