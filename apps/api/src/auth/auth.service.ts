import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { User } from '../users/users.entity';
import { LoginDto } from './auth.dto';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private usersRepository: UsersRepository,
  ) {}

  async login(payload: LoginDto): Promise<User> {
    const { email } = payload;

    let user = await this.authRepository.findByEmail(email);
    const lastLoginAt = new Date();

    if (user) {
      user.lastLoginAt = lastLoginAt;
    } else {
      user = await this.usersRepository.createUser({
        email,
        role: 'user',
        lastLoginAt,
      });
    }

    return this.usersRepository.saveUser(user);
  }
}
