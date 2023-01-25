import { Controller, Get, Post, Request } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class ReviewController {
  constructor(private userService: UsersService) {}

  //Protected Route to return all users if user is admin
  //   @UseGuards(JwtAuthGuard)
  @Get()
  getUsers() {
    return this.userService.getAll();
  }

  //Protected Route to Create new users
  //   @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req) {
    console.log(req);
    return this.userService.create(req);
  }

  //Protected Route to Delete Users
}
