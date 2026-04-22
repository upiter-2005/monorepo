import { Injectable, UnauthorizedException } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { TokenRepository } from './token.repository';
import { User } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { SECRET } from '../constants/jwtSecrets';

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

    const accessToken = jwt.sign(payload, SECRET.ACCESS, {
      expiresIn: '1m',
    });

    const refreshToken = jwt.sign(payload, SECRET.REFRESH, {
      expiresIn: '5m',
    });

    return { accessToken, refreshToken };
  }

  async verify(token: string) {
    const isTokenValid = jwt.verify(token, SECRET.REFRESH);

    return isTokenValid;
  }

  async create(user: User, refreshToken: string) {
    await this.tokenRepository.delete(user.id);
    return this.tokenRepository.create(user, refreshToken);
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    const isValid = await this.verify(refreshToken);

    if (!isValid) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const session = await this.tokenRepository.findByRefreshToken(refreshToken);

    if (!session) {
      throw new UnauthorizedException('Session not found, you should login again');
    }

    const { user_id } = session;
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new Error('User not found');
    }

    const tokens = await this.generate(user);
    await this.tokenRepository.create(user, tokens.refreshToken);

    return { ...user, ...tokens };
  }

  async delete(user_id: string) {
    return this.tokenRepository.delete(user_id);
  }

  async deleteByToken(token: string) {
    return this.tokenRepository.deleteByToken(token);
  }
}
