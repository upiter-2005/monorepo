import { useState } from 'react';

import { Pagination } from '@org/types';

import { DEFAULT_PAGINATION_PARAMS } from '../constants/queryParams';

export const usePagination = (initialParams: Pagination = DEFAULT_PAGINATION_PARAMS) => {
  const [pagination, setPagination] = useState<Pagination>(initialParams);

  const setPage = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const setLimit = (limit: number) => {
    setPagination((prev) => ({
      ...prev,
      limit,
      page: 1,
    }));
  };

  return {
    pagination,
    setPagination,
    setPage,
    setLimit,
  };
};
