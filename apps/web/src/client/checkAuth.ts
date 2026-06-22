import { AxiosResponse } from 'axios';

import { client } from './client';
import { getToken } from '../helpers/token';

export async function checkAuth(url: string): Promise<AxiosResponse | boolean> {
  const accessToken = getToken();

  if (!accessToken) {
    return false;
  }

  const response = await client.get(url);

  return response;
}
