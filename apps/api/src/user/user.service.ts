import { Injectable } from '@nestjs/common';
import { UserGetDto } from '../dto/dto/userGet.dto';
import { UserRepository } from './user.repository';
import { UserCreateDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(private usersRepository: UserRepository) {}

  async fetchUsers(params: UserGetDto) {
    return await this.usersRepository.findByParam(params);
  }

  async createUser(userData: UserCreateDto) {
    return await this.usersRepository.create(userData);
  }
}
