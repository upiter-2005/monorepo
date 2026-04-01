import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreateDTO } from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  createUser(@Body() body: UserCreateDTO) {
    return this.usersService.createUser(body);
  }
}
