import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UserController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService, DatabaseService],
  controllers: [UserController],
  exports: [UsersService],
})
export class UsersModule {}
