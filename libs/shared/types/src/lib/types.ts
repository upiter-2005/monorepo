export interface CredentialResponseData {
  email?: string;
  family_name?: string;
  given_name?: string;
  name?: string;
  picture?: string;
}

type UserRole = 'admin' | 'user';

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
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: 'createdAt' | 'lastLoginAt';
  order?: 'ASC' | 'DESC';
};
