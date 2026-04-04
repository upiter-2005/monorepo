type Role = 'admin' | 'user';

export interface CredentialResponseData {
  email?: string;
  family_name?: string;
  given_name?: string;
  name?: string;
  picture?: string;
}

export interface User {
  id: string;
  email: string;
  role: Role;
  firstName: string;
  lastName: string;
  fullName: string;
  avatarUrl: string;
  createdAt: string;
  lastLoginAt: string;
}
