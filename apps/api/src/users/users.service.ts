import { Injectable } from '@nestjs/common';
import { GetUsersDto } from '../dto/dto/get-users.dto';
import { UsersRepository } from './users.repository';
import { UserCreateDTO } from './users.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async fetchUsers(params: GetUsersDto) {
    const usersData = await this.usersRepository.findUsers(params);
    return usersData;
  }

  async createUser(body: UserCreateDTO) {
    try {
      const email = body.email;
      const role = body.role;
      const user = await this.usersRepository.createNewUser({ email, role });
      return {
        user,
        message: 'new user',
      };
    } catch (error) {
      return { error };
    }
  }
}
