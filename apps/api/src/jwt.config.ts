import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import { SECRET_KEY } from './constants/jwtSecrets';

export const jwtModuleConfig: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const secret = configService.get<string>(SECRET_KEY.ACCESS);

    if (!secret) {
      throw new Error('JWT_ACCESS_SECRET is not defined');
    }

    return {
      secret,
    };
  },
};
