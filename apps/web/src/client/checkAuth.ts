import { STATUS } from '@org/constants';

import { createAuthParams } from '../helpers/createAuthParams';
import { getToken } from '../helpers/token';

export async function checkAuth(url: string, init: RequestInit = {}): Promise<Response> {
  const accessToken = getToken();

  if (!accessToken) {
    throw new Error('No access token found');
  }

  const params = createAuthParams({ ...init }, accessToken);

  const response = await fetch(url, { ...params });

  if (response.status !== STATUS.UNAUTHORIZED) {
    return response;
  }

  return response;
}
