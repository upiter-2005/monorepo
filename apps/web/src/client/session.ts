import { client } from './client';
import { setToken } from '../helpers/token';

export async function refreshSession(): Promise<string> {
  const { data } = await client.get('/auth/refresh');
  setToken(data.accessToken);

  return data.accessToken;
}
