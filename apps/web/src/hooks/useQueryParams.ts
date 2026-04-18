import { useEffect, useState } from 'react';

import { Pagination, Params } from '@org/types';

import { createSearchParams } from '../helpers/createSearchParams';

type QueryParams = Params & Pagination;

export function useQueryParams(initialParams: Params, pagination: Pagination) {
  const [params, setParams] = useState<QueryParams>({ ...initialParams, ...pagination });
  const [queryString, setQueryString] = useState<string>('');

  useEffect(() => {
    const query = createSearchParams({ ...initialParams, ...pagination });
    setQueryString(query);
    setParams({ ...initialParams, ...pagination });
  }, []);

  const changeQuery = (params: Params, pagination: Pagination): void => {
    console.log('pagination', params, pagination);
    setParams({ ...params, ...pagination });
    const query = createSearchParams({ ...params, ...pagination });
    setQueryString(query);
  };

  return {
    params,
    setParams,
    changeQuery,
    queryString,
  };
}
