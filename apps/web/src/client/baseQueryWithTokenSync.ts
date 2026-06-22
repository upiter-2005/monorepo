import {
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

import { API_URL } from '../constants/apiUrls';
import { getResponseHeaders } from '../helpers/getResponseHeaders';
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

  const accessToken = getResponseHeaders(result.meta, 'x-access-token');

  if (accessToken) {
    setToken(accessToken);
  }

  return result;
};
