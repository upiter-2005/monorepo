import { Injectable, UnauthorizedException } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { TokenRepository } from './token.repository';
import { User } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class TokenService {
  constructor(
    private tokenRepository: TokenRepository,
    private userRepository: UserRepository,
  ) {}

  async generate(user: User) {
    const { id, email, role } = user;
    const payload = {
      sub: id,
      email,
      role,
    };

    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, {
      expiresIn: '1m',
    });

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, {
      expiresIn: '5m',
    });

    return { accessToken, refreshToken };
  }

  async verify(token: string, type: 'access' | 'refresh') {
    const secret =
      type === 'access' ? process.env.JWT_ACCESS_SECRET : process.env.JWT_REFRESH_SECRET;
    const isTokenValid = jwt.verify(token, secret as string);

    return isTokenValid;
  }

  async create(user: User, refreshToken: string) {
    await this.tokenRepository.delete(user.id);
    return this.tokenRepository.create(user, refreshToken);
  }

  async refresh(refreshToken: string) {
    console.log(refreshToken);
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    const isValid = await this.verify(refreshToken, 'refresh');

    if (!isValid) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const session = await this.tokenRepository.findByRefreshToken(refreshToken);

    if (!session) {
      throw new UnauthorizedException('Session not found');
    }

    const { user_id } = session;
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new Error('User not found');
    }

    const tokens = await this.generate(user);
    await this.tokenRepository.create(user, tokens.refreshToken);

    console.log(refreshToken);
    return { ...user, ...tokens };
  }

  async delete(user_id: string) {
    return this.tokenRepository.delete(user_id);
  }
}
