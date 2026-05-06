import { FetchUsersPayload } from '@org/types';

import { client } from './client';
import { createSearchParams } from '../helpers/createSearchParams';

type ResposeFetchedUsers = {
  users: FetchUsersPayload[];
  totalCount: number;
  newAccessToken: string;
};

export async function fetchUsers(
  query: string = createSearchParams(),
): Promise<ResposeFetchedUsers> {
  const response = await client.get(`/users?${query}`);
  const newAccessToken = response.headers['x-access-token'];

  const res = await response.data;
  const { data: users, totalCount } = res;

  return { users, totalCount, newAccessToken };
}
