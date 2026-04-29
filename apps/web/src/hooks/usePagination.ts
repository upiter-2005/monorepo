import { useState } from 'react';

import { Pagination } from '@org/types';

import { DEFAULT_PAGINATION_PARAMS } from '../constants/queryParams';

type UsePaginationProps = {
  pagination: Pagination;
  setPagination: React.Dispatch<React.SetStateAction<Pagination>>;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
};

export const usePagination = (
  initialParams: Pagination = DEFAULT_PAGINATION_PARAMS,
): UsePaginationProps => {
  const [pagination, setPagination] = useState<Pagination>(initialParams);

  const setPage = (page: number): void => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const setLimit = (limit: number): void => {
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
