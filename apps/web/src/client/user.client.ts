import { createSearchParams } from '../helpers/createSearchParams';
import { API_URL, DEFAULT_QUERY_PARAMS } from '../share/consts';

export async function getUsers(query: string | undefined) {
  if (query === 'undefined') {
    query = createSearchParams(DEFAULT_QUERY_PARAMS);
  }
  const response = await fetch(`${API_URL}/users?${query}`);
  const data = await response.json();
  return data;
}
