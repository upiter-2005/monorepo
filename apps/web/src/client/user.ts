import { FetchUsersPayload } from '@org/types';

import { checkAuth } from './checkAuth';
import { createSearchParams } from '../helpers/createSearchParams';
import { setToken } from '../helpers/token';

export async function fetchUsers(
  query: string = createSearchParams(),
): Promise<{ users: FetchUsersPayload[]; totalCount: number }> {
  const response = await checkAuth(`/users?${query}`);

  const newAccessToken = response.headers.get('x-access-token');

  if (response !== null) {
    setToken(newAccessToken);
  }

  const res = await response.data;
  const { data: users, totalCount } = res;

  return { users, totalCount };
}
