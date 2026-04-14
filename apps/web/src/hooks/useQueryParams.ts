import { useState } from 'react';

import { Params } from '@org/types';

export const useQueryParams = (initialParams: Partial<Params> = {}) => {
  const [params, setParams] = useState<Params>({
    page: 1,
    limit: 2,
    ...initialParams,
  });

  return {
    params,
    setParams,
  };
};
