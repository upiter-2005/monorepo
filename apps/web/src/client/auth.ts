import { LoginResponse } from '@org/types';

import { API_URL } from '../constants/apiUrls';
import { removeToken, setToken } from '../helpers/token';

export async function login(email: string): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();
  setToken(data.accessToken);

  return { email: data.email, role: data.role, accessToken: data.accessToken };
}

export const logout = async (): Promise<void> => {
  await fetch(`${API_URL}/auth/logout`, {
    credentials: 'include',
  });
  removeToken();
};
