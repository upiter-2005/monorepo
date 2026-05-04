import * as types from '@org/types';
import { Type } from 'class-transformer';
import {
  IsIn,
  IsOptional,
  IsString,
  IsDate,
  IsNumber,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { User } from './user.entity';

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

export class UserResponseDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserCreateDto)
  data: User[];

  @IsNumber()
  totalCount: number;
}
