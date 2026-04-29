import { Injectable } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { TokenRepository } from './token.repository';
import { EXPIRED, SECRET_KEY } from '../constants/jwtSecrets';
import { RefreshReturnToken, SessionTokens, TokenPayload } from './auth.types';
import { DeleteResult } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
  constructor(
    private tokenRepository: TokenRepository,
    private readonly configService: ConfigService,
  ) {}

  async generate(payload: TokenPayload): Promise<SessionTokens> {
    const accessSecret = this.configService.get<string>(SECRET_KEY.ACCESS);
    const refreshSecret = this.configService.get<string>(SECRET_KEY.REFRESH);
    if (!accessSecret || !refreshSecret) {
      throw new Error('JWT secrets are not defined');
    }
    const accessToken = jwt.sign(payload, accessSecret, {
      expiresIn: EXPIRED.ACCESS,
    });

    const refreshToken = jwt.sign(payload, refreshSecret, {
      expiresIn: EXPIRED.REFRESH,
    });

    return { accessToken, refreshToken };
  }

  verify(token: string): string | jwt.JwtPayload | null {
    const refreshSecret = this.configService.get<string>(SECRET_KEY.REFRESH);
    if (refreshSecret) {
      return jwt.verify(token, refreshSecret);
    }
    return null;
  }

  async create(id: string, refreshToken: string): Promise<RefreshReturnToken> {
    await this.tokenRepository.deleteByUserId(id);
    return this.tokenRepository.create(id, refreshToken);
  }

  async refresh(
    refreshToken: string,
    tokenPayload: TokenPayload,
  ): Promise<TokenPayload & SessionTokens> {
    const { email, role, sub } = tokenPayload;
    const payload = { email, role, sub };
    const tokens = await this.generate(payload);

    await this.tokenRepository.create(sub, tokens.refreshToken);

    return { ...payload, ...tokens };
  }

  async findByToken(refreshToken: string): Promise<RefreshReturnToken | null> {
    return this.tokenRepository.findByRefreshToken(refreshToken);
  }

  async delete(user_id: string): Promise<DeleteResult> {
    return this.tokenRepository.deleteByUserId(user_id);
  }

  async deleteByToken(token: string): Promise<DeleteResult> {
    return this.tokenRepository.deleteByToken(token);
  }
}
