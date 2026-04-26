import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { UserRepository } from '../user/user.repository';
import { ROLE } from '../constants/roles';
import { LoginPayload } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private userRepository: UserRepository,
  ) {}

  async login(payload: LoginPayload) {
    const { email } = payload;
    const user = await this.authRepository.findByEmail(email);
    const lastLoginAt = new Date();

    if (!user) {
      const user = await this.register(email, lastLoginAt);

      return user;
    }

    await this.authRepository.updateLastLoginAt(user.id, lastLoginAt);

    return user;
  }

  async register(email: string, lastLoginAt: Date) {
    const user = await this.userRepository.create({
      email,
      role: ROLE.USER,
      lastLoginAt,
    });

    return user;
  }
}
