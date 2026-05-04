import { LoginResponse } from '@org/types';

import { client } from './client';
import { removeToken, setToken } from '../helpers/token';

export async function login(email: string): Promise<LoginResponse> {
  const { data } = await client.post('/auth/login', { email });

  setToken(data.accessToken);

  return { email: data.email, role: data.role, accessToken: data.accessToken };
}

export const logout = async (): Promise<void> => {
  await client.get('/auth/logout');
  removeToken();
};
