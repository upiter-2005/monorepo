import { Injectable } from '@nestjs/common';
import { UserPaginationDto, UserParamDto } from './user.get.dto';
import { UserRepository } from './user.repository';
import { UserCreateDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUsers(params: UserParamDto, pagination: UserPaginationDto) {
    return this.userRepository.findByParam(params, pagination);
  }

  async createUser(payload: UserCreateDto) {
    const { email } = payload;
    const user = await this.userRepository.findByEmail(email);

    if (user) {
      return null;
    }

    return this.userRepository.create(payload);
  }
}
