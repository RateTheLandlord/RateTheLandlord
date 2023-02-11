import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UserService } from 'src/user/user.service';
import { InitController } from './init.controller';

@Module({
  providers: [UserService, DatabaseService],
  controllers: [InitController],
  exports: [UserService],
})
export class UserModule {}
