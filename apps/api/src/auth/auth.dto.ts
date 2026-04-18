import { IsEmail, IsOptional, IsString } from 'class-validator';

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
