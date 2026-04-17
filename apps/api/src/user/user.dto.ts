import * as types from '@org/types';
import { IsIn, IsOptional, IsString, IsDate } from 'class-validator';

export class UserCreateDto {
  @IsString({ message: 'Name should be a string' })
  email: string;

  @IsString({ message: 'Name should be a string' })
  @IsIn(['user', 'admin'])
  role: types.UserRole;

  @IsString({ message: 'Name should be a string' })
  @IsOptional()
  firstName?: string;

  @IsDate()
  @IsOptional()
  lastLoginAt?: Date;
}
