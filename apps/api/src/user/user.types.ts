import { User } from './user.entity';

export type UsersReturn = {
  data: User[];
  totalCount: number;
};

export type UserPayload = User;

export type CurrentUserData = {
  userId: string;
  email: string;
  role: string;
};
