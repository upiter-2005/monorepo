//import { getToken } from '../helpers/token';
import { refreshSession } from './session';

export async function authFetch(url: string, init: RequestInit = {}): Promise<Response> {
  let accessToken = localStorage.getItem('token');

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
