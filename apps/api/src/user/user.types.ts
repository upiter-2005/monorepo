import { User } from './user.entity';

export type UsersReturn = {
  data: User[];
  totalCount: number;
};

export type UserPayload = User;
