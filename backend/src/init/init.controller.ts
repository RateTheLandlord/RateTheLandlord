import { Controller, Post, Request } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Controller('init')
export class InitController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Request() req) {
    return this.userService.create(req.body);
  }
}
