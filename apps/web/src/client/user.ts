import { User } from '@org/types';

import { API_URL } from '../constants/apiUrls';
import { DEFAULT_QUERY_PARAMS } from '../constants/queryParams';
import { createSearchParams } from '../helpers/createSearchParams';

export async function fetchUsers(
  query: string = createSearchParams(DEFAULT_QUERY_PARAMS),
): Promise<{ data: User[]; totalCount: number }> {
  const response = await fetch(`${API_URL}/users?${query}`);
  return response.json();
}
