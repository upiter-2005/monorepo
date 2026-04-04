import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreateDTO } from './users.dto';
import { GetUsersDto } from '../dto/dto/get-users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query() query: GetUsersDto) {
    return this.usersService.fetchUsers(query);
  }

  @Post()
  createUser(@Body() body: UserCreateDTO) {
    return this.usersService.createUser(body);
  }
}
