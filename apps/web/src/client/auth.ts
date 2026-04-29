import { LoginResponse } from '@org/types';

import { apiClient } from './apiClient';
import { removeToken, setToken } from '../helpers/token';

export async function login(email: string): Promise<LoginResponse> {
  const { data } = await apiClient.post('/auth/login', { email });

  setToken(data.accessToken);

  return { email: data.email, role: data.role, accessToken: data.accessToken };
}

export const logout = async (): Promise<void> => {
  await apiClient.get('/auth/logout');
  removeToken();
};
