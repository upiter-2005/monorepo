import { IsString } from 'class-validator';

export class UserCreateDTO {
  email: string;

  @IsString({ message: 'Name should be a string' })
  firstName: string;
}
