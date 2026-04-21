import { IsEmail, IsIn, IsOptional, IsString } from 'class-validator';
import * as types from '@org/types';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  firstName?: string;
}

export class SessionCreateDto {
  @IsString()
  refreshToken: string;

  @IsString()
  userData: string;
}

export class TokensDto {
  @IsString()
  refreshToken: string;

  @IsString()
  accessToken: string;
}

export class LoginResponseDto {
  @IsEmail()
  email: string;

  @IsIn(['user', 'admin'])
  role: types.UserRole;

  @IsString()
  accessToken: string;
}
