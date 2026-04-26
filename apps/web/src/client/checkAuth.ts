import { refreshSession } from './session';
import { STATUS } from '../constants/status';
import { createAuthParams } from '../helpers/createAuthParams';
import { getToken, removeToken } from '../helpers/token';

export async function checkAuth(url: string, init: RequestInit = {}): Promise<Response> {
  let accessToken = getToken() || '';
  let params = createAuthParams({ ...init }, accessToken);

  let response = await fetch(url, { ...params });

  if (response.status !== STATUS.UNAUTHORIZED) {
    return response;
  }

  removeToken();
  accessToken = await refreshSession();
  params = createAuthParams({ ...init }, accessToken);

  response = await fetch(url, { ...params });

  return response;
}
