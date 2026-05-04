import { UserRole } from '@org/types';
import { User } from '../user/user.entity';

export type LogoutDto = { status: number };

export type LoginPayload = {
  email: string;
  firstName?: string;
};

export interface TokenPayload {
  email: string;
  role: UserRole;
  sub: string;
}

export interface SessionTokens {
  accessToken: string;
  refreshToken: string;
}

export type RefreshReturnToken = {
  user_id: string;
  refreshToken: string;
};

export type LoginUser = User;
export type RegisterUser = User;

export type VerifyJwtPayload = {
  userId: string;
  email: string;
  role: string;
};
