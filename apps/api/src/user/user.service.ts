import { Injectable } from '@nestjs/common';
import { UserPaginationDto, UserParamDto } from '../dto/dto/userGet.dto';
import { UserRepository } from './user.repository';
import { UserCreateDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUsers(params: UserParamDto, pagination: UserPaginationDto) {
    return this.userRepository.findByParam(params, pagination);
  }

  async createUser(userData: UserCreateDto) {
    const { email } = userData;
    let user = await this.userRepository.findByEmail(email);

    if (user) {
      return null;
    }

    return this.userRepository.create(userData);
  }
}
