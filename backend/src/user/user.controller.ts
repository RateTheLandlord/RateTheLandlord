import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { IUser } from './models/user';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  //Protected Route to return all users if user is admin

  @Get()
  getUsers() {
    console.log('Get All Users');
    return this.userService.getAll();
  }

  //Protected Route to Create new users

  @Post()
  create(@Request() req) {
    console.log('New User: ', req.body);
    return this.userService.create(req.body);
  }

  @Put('/:id')
  update(@Param('id') id: number, @Body() user: IUser): Promise<boolean> {
    console.log(id);
    return this.userService.update(id, user);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: number): Promise<boolean> {
    console.log(id);
    return this.userService.deleteUser(id);
  }
}
