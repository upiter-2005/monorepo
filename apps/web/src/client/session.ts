import { API_URL } from '../constants/apiUrls';
import { setToken } from '../helpers/token';

export async function refreshSession(): Promise<string> {
  const response = await fetch(`${API_URL}/auth/refresh`, { credentials: 'include' });
  const data = await response.json();
  setToken(data.accessToken);

  return data.accessToken;
}
