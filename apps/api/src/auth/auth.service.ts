import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { UserRepository } from '../user/user.repository';
import { ROLE } from '../constants/roles';
import { LoginPayload, RegisterUser } from './auth.types';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private userRepository: UserRepository,
  ) {}

  async login(payload: LoginPayload): Promise<User> {
    const { email, firstName } = payload;
    const user = await this.authRepository.findByEmail(email);
    const lastLoginAt = new Date();

    if (!user) {
      return this.register(email, firstName, lastLoginAt);
    }

    await this.authRepository.updateLastLoginAt(user.id, lastLoginAt);

    return user;
  }

  async register(email: string, firstName: string, lastLoginAt: Date): Promise<RegisterUser> {
    return this.userRepository.create({
      email,
      firstName,
      role: ROLE.USER,
      lastLoginAt,
    });
  }
}
