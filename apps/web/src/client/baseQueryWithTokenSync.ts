import {
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

import { API_URL } from '../constants/apiUrls';
import { getToken, setToken } from '../helpers/token';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: 'include',

  prepareHeaders: (headers) => {
    const accessToken = getToken();

    if (accessToken) {
      headers.set('authorization', `Bearer ${accessToken}`);
    }

    return headers;
  },
});

export const baseQueryWithTokenSync: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  const newAccessToken = result.meta?.response?.headers.get('x-access-token');

  if (newAccessToken) {
    setToken(newAccessToken);
  }

  return result;
};
