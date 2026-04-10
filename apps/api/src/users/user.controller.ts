import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreateDto } from './users.dto';
import { GetUsersDto } from '../dto/dto/get-users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query() query: GetUsersDto) {
    const { page, limit, search, sortBy, order } = query;
    return this.usersService.fetchUsers({ page, limit, search, sortBy, order });
  }

  @Post()
  createUser(@Body() payload: UserCreateDto) {
    return this.usersService.createUser(payload);
  }
}
