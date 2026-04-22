import { refreshSession } from './session';
import { getToken, removeToken } from '../helpers/token';

export async function authFetch(url: string, init: RequestInit = {}): Promise<Response> {
  let accessToken = getToken() || '';

  let response = await fetch(url, {
    ...init,
    credentials: 'include',
    headers: {
      ...(init.headers || {}),
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 401) {
    return response;
  }
  removeToken();
  accessToken = await refreshSession();

  response = await fetch(url, {
    ...init,
    credentials: 'include',
    headers: {
      ...(init.headers || {}),
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
}
