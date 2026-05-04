import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { UserRepository } from '../user/user.repository';
import { ROLE } from '../constants/roles';
import { LoginPayload, LoginUser, RegisterUser } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private userRepository: UserRepository,
  ) {}

  async login(payload: LoginPayload): Promise<LoginUser> {
    const { email } = payload;
    const user = await this.authRepository.findByEmail(email);
    const lastLoginAt = new Date();

    if (!user) {
      return this.register(email, lastLoginAt);
    }

    await this.authRepository.updateLastLoginAt(user.id, lastLoginAt);

    return user;
  }

  async register(email: string, lastLoginAt: Date): Promise<RegisterUser> {
    return this.userRepository.create({
      email,
      role: ROLE.USER,
      lastLoginAt,
    });
  }
}
