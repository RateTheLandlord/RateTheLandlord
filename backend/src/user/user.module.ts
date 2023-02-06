import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UserController } from './user.controller';
import { UsersService } from './user.service';

@Module({
  providers: [UsersService, DatabaseService],
  controllers: [UserController],
  exports: [UsersService],
})
export class UsersModule {}
