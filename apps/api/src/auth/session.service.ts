import { Injectable } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { SessionRepository } from './session.repository';
import { EXPIRED, SECRET_KEY } from '../constants/jwtSecrets';
import { RefreshReturnToken, SessionTokens, TokenPayload } from './auth.types';
import { DeleteResult } from 'typeorm';
import { ConfigService } from '@nestjs/config';

type VerifyTokenType = string | jwt.JwtPayload | null;

@Injectable()
export class SessionService {
  constructor(
    private sessionRepository: SessionRepository,
    private readonly configService: ConfigService,
  ) {}

  async generate(payload: TokenPayload): Promise<SessionTokens> {
    const accessSecret = this.configService.get<string>(SECRET_KEY.ACCESS) as string;
    const refreshSecret = this.configService.get<string>(SECRET_KEY.REFRESH) as string;

    const accessToken = jwt.sign(payload, accessSecret, {
      expiresIn: EXPIRED.ACCESS,
    });

    const refreshToken = jwt.sign(payload, refreshSecret, {
      expiresIn: EXPIRED.REFRESH,
    });

    return { accessToken, refreshToken };
  }

  verify(token: string): VerifyTokenType {
    const refreshSecret = this.configService.get<string>(SECRET_KEY.REFRESH);
    if (refreshSecret) {
      return jwt.verify(token, refreshSecret);
    }
    return null;
  }

  async create(id: string, refreshToken: string): Promise<RefreshReturnToken> {
    await this.sessionRepository.deleteByUserId(id);
    return this.sessionRepository.create(id, refreshToken);
  }

  async refresh(
    refreshToken: string,
    tokenPayload: TokenPayload,
  ): Promise<TokenPayload & SessionTokens> {
    const tokens = await this.generate(tokenPayload);

    await this.sessionRepository.create(tokenPayload.sub, tokens.refreshToken);

    return { ...tokenPayload, ...tokens };
  }

  async findByToken(refreshToken: string): Promise<RefreshReturnToken | null> {
    return this.sessionRepository.findByRefreshToken(refreshToken);
  }

  async delete(user_id: string): Promise<DeleteResult> {
    return this.sessionRepository.deleteByUserId(user_id);
  }

  async deleteByToken(token: string): Promise<DeleteResult> {
    return this.sessionRepository.deleteByToken(token);
  }
}
