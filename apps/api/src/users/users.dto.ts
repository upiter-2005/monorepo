import { IsOptional, IsString } from 'class-validator';

export class UserCreateDTO {
  email: string;

  @IsString({ message: 'Name should be a string' })
  @IsOptional()
  firstName?: string;
}
