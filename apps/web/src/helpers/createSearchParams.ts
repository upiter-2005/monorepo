import { Params } from '@org/types';

import { DEFAULT_QUERY_PARAMS } from '../constants/queryParams';

export function createSearchParams(params: Params = DEFAULT_QUERY_PARAMS): string {
  return new URLSearchParams(
    Object.entries(params).reduce(
      (acc, [key, value]) => {
        acc[key] = String(value);
        return acc;
      },
      {} as Record<string, string>,
    ),
  ).toString();
}
