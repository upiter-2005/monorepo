import { FetchUsersPayload } from '@org/types';

import { API_URL } from '../constants/apiUrls';
import { createSearchParams } from '../helpers/createSearchParams';

export async function fetchUsers(
  query: string = createSearchParams(),
): Promise<{ data: FetchUsersPayload[]; totalCount: number }> {
  const response = await fetch(`${API_URL}/users?${query}`);

  return response.json();
}
