import { Injectable } from '@nestjs/common';
import { GetUsersDto } from '../dto/dto/get-users.dto';
import { UsersRepository } from './users.repository';
import { UserCreateDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async fetchUsers(params: GetUsersDto) {
    return await this.usersRepository.findByParam(params);
  }

  async createUser(userData: UserCreateDto) {
    return await this.usersRepository.createUser(userData);
  }
}
