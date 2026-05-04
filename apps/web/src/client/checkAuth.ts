import { AxiosResponse } from 'axios';

import { client } from './client';
import { getToken } from '../helpers/token';

export async function checkAuth(url: string): Promise<AxiosResponse> {
  const accessToken = getToken();

  if (!accessToken) {
    return false as unknown as AxiosResponse;
  }

  const response = await client.get(url);

  return response;
}
