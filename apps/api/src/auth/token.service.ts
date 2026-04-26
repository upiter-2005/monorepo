import { Injectable } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { TokenRepository } from './token.repository';
import { User } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { EXPIRED, SECRET } from '../constants/jwtSecrets';
import { RefreshReturnTokens, SessionTokens, TokenPayload } from './auth.types';
import { DeleteResult } from 'typeorm';

@Injectable()
export class TokenService {
  constructor(
    private tokenRepository: TokenRepository,
    private userRepository: UserRepository,
  ) {}

  async generate(payload: TokenPayload): Promise<SessionTokens> {
    const accessToken = jwt.sign(payload, SECRET.ACCESS, {
      expiresIn: EXPIRED.ACCESS,
    });

    const refreshToken = jwt.sign(payload, SECRET.REFRESH, {
      expiresIn: EXPIRED.REFRESH,
    });

    return { accessToken, refreshToken };
  }

  verify(token: string): string | jwt.JwtPayload {
    return jwt.verify(token, SECRET.REFRESH);
  }

  async create(id: string, refreshToken: string): Promise<RefreshReturnTokens> {
    await this.tokenRepository.deleteByUserId(id);
    return this.tokenRepository.create(id, refreshToken);
  }

  async refresh(refreshToken: string, user_id: string): Promise<TokenPayload & SessionTokens> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new Error('User not found');
    }

    const payload = { email: user.email, role: user.role, sub: user.id };
    const tokens = await this.generate(payload);
    await this.tokenRepository.create(user.id, tokens.refreshToken);

    return { ...payload, ...tokens };
  }

  async delete(user_id: string): Promise<DeleteResult> {
    return this.tokenRepository.deleteByUserId(user_id);
  }

  async deleteByToken(token: string): Promise<DeleteResult> {
    return this.tokenRepository.deleteByToken(token);
  }
}
