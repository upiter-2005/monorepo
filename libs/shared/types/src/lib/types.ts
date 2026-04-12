export interface CredentialResponseData {
  email?: string;
  family_name?: string;
  given_name?: string;
  name?: string;
  picture?: string;
}

export type UserRole = 'admin' | 'user';
export type SortBy = 'createdAt' | 'lastLoginAt';
export type Order = 'ASC' | 'DESC';

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

export type Params = {
  page: number;
  limit: number;
  search?: string;
  sortBy?: SortBy;
  order?: Order;
};
