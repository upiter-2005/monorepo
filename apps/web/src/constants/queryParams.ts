import { ORDER, SORT_BY } from '@org/constants';
import { Pagination, Params } from '@org/types';

export const DEFAULT_QUERY_PARAMS: Params = {
  sortBy: SORT_BY.CREATED_AT,
  order: ORDER.DESC,
};

export const DEFAULT_PAGINATION_PARAMS: Pagination = {
  page: 1,
  limit: 3,
};
