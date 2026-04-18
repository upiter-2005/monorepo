import { useState } from 'react';

import { Pagination } from '@org/types';

export const usePagination = (initialParams: Pagination) => {
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
