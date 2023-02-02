import { Controller, Delete, Get, Param, Post, Request } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UserController {
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
    console.log('New User: ', req.body);
    return this.userService.create(req.body);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: number): Promise<boolean> {
    console.log(id);
    return this.userService.deleteUser(id);
  }

  //Protected Route to Delete Users
}
