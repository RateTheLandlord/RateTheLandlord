import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService, DatabaseService],
  exports: [UsersService],
})
export class UsersModule {}
