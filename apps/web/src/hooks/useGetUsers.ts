import { useEffect, useState } from 'react';

import { Params, User } from '@org/types';

import { getUsers } from '../client/user';
import { createSearchParams } from '../helpers/createSearchParams';

type PaginationData = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export const useGetUsers = (initialParams: Params = {}) => {
  const [params, setParams] = useState<Params>({
    page: 1,
    limit: 3,
    ...initialParams,
  });

  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
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
    } catch (err: any) {
      setError(err.message);
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
    data: users,
    pagination,
    isLoading,
    error,
    params,
    setParams,
    changeQuery,
    fetchUsers,
  };
};
