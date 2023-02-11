import { Module } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { InitController } from './init.controller';

@Module({
  providers: [UserService],
  controllers: [InitController],
  exports: [],
})
export class InitModule {}
