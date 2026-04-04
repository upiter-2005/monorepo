import { IsEmail, IsOptional, IsString } from 'class-validator';

export class AuthDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  firstName?: string;
}
