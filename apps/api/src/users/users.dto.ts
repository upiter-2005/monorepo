import { IsIn, IsOptional, IsString } from 'class-validator';

export class UserCreateDTO {
  email: string;

  @IsIn(['user', 'admin'])
  role: 'user' | 'user';

  @IsString({ message: 'Name should be a string' })
  @IsOptional()
  firstName?: string;
}
