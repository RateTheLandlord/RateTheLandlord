import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  providers: [UserService, DatabaseService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
