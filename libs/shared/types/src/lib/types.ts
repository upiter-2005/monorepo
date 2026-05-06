import { ORDER, SORT_BY, ROLES, PAIR_ORDER_TYPE } from '@org/constants';

export interface CredentialResponseData {
  email?: string;
  family_name?: string;
  given_name?: string;
  name?: string;
  picture?: string;
}

export type UserRole = typeof ROLES.USER | typeof ROLES.ADMIN;
export type SortBy = typeof SORT_BY.CREATED_AT | typeof SORT_BY.LAST_LOGIN;
export type Order = typeof ORDER.ASC | typeof ORDER.DESC;

export type OrderType = typeof PAIR_ORDER_TYPE.BUY | typeof PAIR_ORDER_TYPE.SELL;

export type User = {
  id: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  fullName: string;
  avatarUrl: string;
  createdAt: string;
  lastLoginAt: string;
};

export type FetchUsersPayload = User;

export type Params = {
  search?: string;
  sortBy?: SortBy;
  order?: Order;
};

export type Pagination = {
  page: number;
  limit: number;
};

export interface LoginPayload {
  email: string;
  name: string;
}

export type LoginResponse = {
  email: string;
  role: UserRole;
  accessToken: string;
};
