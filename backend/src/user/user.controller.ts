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
import { UsersService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UsersService) {}

  //Protected Route to return all users if user is admin
  @UseGuards(JwtAuthGuard)
  @Get()
  getUsers() {
    return this.userService.getAll();
  }

  //Protected Route to Create new users
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req) {
    console.log('New User: ', req.body);
    return this.userService.create(req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  update(@Param('id') id: number, @Body() user: IUser): Promise<boolean> {
    console.log(id);
    return this.userService.update(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteUser(@Param('id') id: number): Promise<boolean> {
    console.log(id);
    return this.userService.deleteUser(id);
  }
}
