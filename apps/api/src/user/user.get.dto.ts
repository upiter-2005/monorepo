import * as types from '@org/types';
import { ORDER, SORT_BY } from '@org/constants';
import { Type } from 'class-transformer';
import { IsOptional, IsInt, Min, IsString, Max } from 'class-validator';
import { IntersectionType } from '@nestjs/mapped-types';

export class UserParamDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  sortBy: types.SortBy = SORT_BY.CREATED_AT;

  @IsOptional()
  order: types.Order = ORDER.DESC;
}

export class UserPaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(15)
  limit = 10;
}

export class UserGetDto extends IntersectionType(UserParamDto, UserPaginationDto) {}
