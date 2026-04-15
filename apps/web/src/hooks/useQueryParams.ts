import { useState } from 'react';

import { Params } from '@org/types';

import { DEFAULT_QUERY_PARAMS } from '../constants/queryParams';

export const useQueryParams = (initialParams: Partial<Params> = {}) => {
  const [params, setParams] = useState<Params>(DEFAULT_QUERY_PARAMS);

  return {
    params,
    setParams,
  };
};
