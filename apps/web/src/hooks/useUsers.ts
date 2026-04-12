import { useEffect, useState } from 'react';

import { Params, User } from '@org/types';

import { getUsers } from '../client/user.client';
import { createSearchParams } from '../helpers/createSearchParams';

type Pagination = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export const useUsers = (initialParams: Partial<Params> = {}) => {
  const [params, setParams] = useState<Params>({
    page: 1,
    limit: 3,
    ...initialParams,
  });

  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 3,
    total: 0,
    totalPages: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async (query?: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getUsers(query);

      setUsers(data.data);
      setPagination(data.meta);
      setIsLoading(false);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error fetch users');
    }
  };

  const changeQuery = (params: Params): void => {
    const finalParams = { ...params };
    const query = createSearchParams(finalParams);
    setParams(finalParams);
    fetchUsers(query);
  };

  useEffect(() => {
    changeQuery(params);
  }, []);

  return {
    users,
    pagination,
    isLoading,
    error,
    params,
    setParams,
    changeQuery,
    fetchUsers,
  };
};
