import { AxiosRequestConfig } from 'axios';

export const createAuthParams = (
  init: RequestInit = {},
  accessToken: string,
): AxiosRequestConfig => {
  return {
    ...init,
    headers: {
      ...(init.headers || {}),
      Authorization: `Bearer ${accessToken}`,
    },
  } as AxiosRequestConfig;
};
