import { User } from '@org/types';

import { API_URL } from '../consts/apiUrls';
import { DEFAULT_QUERY_PARAMS } from '../consts/queryParams';
import { createSearchParams } from '../helpers/createSearchParams';

export async function getUsers(
  query: string = createSearchParams(DEFAULT_QUERY_PARAMS),
): Promise<{ data: User[]; pagination: { total: number } }> {
  const response = await fetch(`${API_URL}/users?${query}`);
  return response.json();
}
