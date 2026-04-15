import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { User } from '../user/user.entity';
import { LoginDto } from './auth.dto';
import { UserRepository } from '../user/user.repository';
import { ROLE } from '../constants/roles';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private userRepository: UserRepository,
  ) {}

  async login(payload: LoginDto): Promise<User> {
    const { email } = payload;

    let user = await this.authRepository.findByEmail(email);
    const lastLoginAt = new Date();

    if (user) {
      user.lastLoginAt = lastLoginAt;
    } else {
      user = await this.userRepository.create({
        email,
        role: ROLE.USER,
        lastLoginAt,
      });
    }

    return this.userRepository.save(user);
  }
}
