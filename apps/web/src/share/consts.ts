import { Params } from '@org/types';

export const API_URL = import.meta.env.VITE_API_PATH;

export const DEFAULT_QUERY_PARAMS: Params = {
  page: 1,
  limit: 10,
  sortBy: 'createdAt',
  order: 'DESC',
};
