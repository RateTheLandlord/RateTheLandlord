import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import { PasswordController } from './password.controller';
import { DatabaseService } from 'src/database/database.service';

@Module({
  providers: [PasswordService, DatabaseService],
  controllers: [PasswordController],
  exports: [PasswordService],
})
export class PasswordModule {}
