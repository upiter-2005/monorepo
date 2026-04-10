import * as types from '@org/types';
import { IsIn, IsOptional, IsString, IsDate } from 'class-validator';

export class UserCreateDto {
  email: string;

  @IsIn(['user', 'admin'])
  role: types.UserRole;

  @IsString({ message: 'Name should be a string' })
  @IsOptional()
  firstName?: string;

  @IsDate()
  @IsOptional()
  lastLoginAt?: Date;
}
