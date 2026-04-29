import { apiClient } from './apiClient';
import { setToken } from '../helpers/token';

export async function refreshSession(): Promise<string> {
  const { data } = await apiClient.get('/auth/refresh');
  setToken(data.accessToken);

  return data.accessToken;
}
