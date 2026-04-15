import { ORDER, SORT_BY } from '@org/constants';
import { Params } from '@org/types';

export const DEFAULT_QUERY_PARAMS: Params = {
  page: 1,
  limit: 3,
  sortBy: SORT_BY.CREATED_AT,
  order: ORDER.DESC,
};
