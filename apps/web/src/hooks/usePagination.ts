import { useMemo } from 'react';

import { Pagination } from '@org/types';

export const usePagination = ({ page, limit, total }: Pagination) => {
  const totalPages = useMemo(() => {
    return Math.max(Math.ceil(total / limit));
  }, [total, limit]);

  return {
    page,
    limit,
    total,
    totalPages,
  };
};
