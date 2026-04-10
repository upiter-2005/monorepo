import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { User } from '../users/users.entity';
import { AuthDto } from './auth.dto';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private UsersRepository: UsersRepository,
  ) {}

  async login(payload: AuthDto): Promise<User> {
    const { email } = payload;

    let user = await this.authRepository.findExistUser(email);
    const now = new Date();

    if (user) {
      user.lastLoginAt = now;
    } else {
      user = await this.UsersRepository.createUser({
        email,
        role: 'user',
        lastLoginAt: now,
      });
    }

    return this.UsersRepository.saveUser(user);
  }
}
