import { useState } from 'react';

import { Pagination, Params } from '@org/types';

import { createSearchParams } from '../helpers/createSearchParams';

type QueryParams = Params & Pagination;

type UseQueryParamsProps = {
  params: QueryParams;
  setParams: React.Dispatch<React.SetStateAction<QueryParams>>;
  changeQuery: (params: Params, pagination: Pagination) => void;
  query: string;
};

export function useQueryParams(initialParams: Params, pagination: Pagination): UseQueryParamsProps {
  const [params, setParams] = useState<QueryParams>({ ...initialParams, ...pagination });
  const [query, setQuery] = useState<string>(
    createSearchParams({ ...initialParams, ...pagination }),
  );

  const changeQuery = (params: Params, pagination: Pagination): void => {
    setParams({ ...params, ...pagination });
    const query = createSearchParams({ ...params, ...pagination });
    setQuery(query);
  };

  return {
    params,
    setParams,
    changeQuery,
    query,
  };
}
