import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { User } from '../user/user.entity';
import { LoginDto } from './auth.dto';
import { UserRepository } from '../user/user.repository';
import { ROLE } from '../constants/roles';
import { TokenService } from './token.service';
import { TokenRepository } from './token.repository';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private userRepository: UserRepository,
    private tokenService: TokenService,
    private tokenRepository: TokenRepository,
  ) {}

  async login(payload: LoginDto) {
    const { email } = payload;

    const user = await this.authRepository.findByEmail(email);
    const lastLoginAt = new Date();

    if (user) {
      user.lastLoginAt = lastLoginAt;
      const tokens = await this.tokenService.generate(user);
      await this.tokenRepository.create(user, tokens.refreshToken);

      return { user, tokens };
    }

    return this.register(email, lastLoginAt);
  }

  async register(email: string, lastLoginAt: Date) {
    const user = await this.userRepository.create({
      email,
      role: ROLE.USER,
      lastLoginAt,
    });
    const tokens = await this.tokenService.generate(user);
    await this.tokenRepository.create(user, tokens.refreshToken);

    return { user, tokens };
  }
}
