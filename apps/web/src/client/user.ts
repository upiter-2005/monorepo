import { FetchUsersPayload } from '@org/types';

import { checkAuth } from './checkAuth';
import { API_URL } from '../constants/apiUrls';
import { createSearchParams } from '../helpers/createSearchParams';
import { getToken } from '../helpers/token';

export async function fetchUsers(
  query: string = createSearchParams(),
): Promise<{ users: FetchUsersPayload[]; totalCount: number }> {
  const accessToken = getToken();
  const response = await checkAuth(`${API_URL}/users?${query}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const res = await response.json();
  const { data: users, totalCount } = res;

  return { users, totalCount };
}
