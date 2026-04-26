import { UserRole } from '@org/types';

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

export type RefreshReturnTokens = {
  user_id: string;
  refreshToken: string;
};
