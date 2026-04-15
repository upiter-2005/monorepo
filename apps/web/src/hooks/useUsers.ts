import { useEffect, useState } from 'react';

import { Params, User } from '@org/types';

import { useQueryParams } from './useQueryParams';
import { fetchUsers } from '../client/user';
import { createSearchParams } from '../helpers/createSearchParams';

export const useUsers = (initialParams: Partial<Params> = {}) => {
  const { params } = useQueryParams();

  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refetch = async (query?: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await fetchUsers(query);

      setUsers(data.data);
      setTotal(data.totalCount);
      setIsLoading(false);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const changeQuery = (params: Params): void => {
    const query = createSearchParams(params);
    refetch(query);
  };

  useEffect(() => {
    changeQuery(params);
  }, []);

  return {
    users,
    isLoading,
    error,
    total,
    changeQuery,
    refetch,
  };
};
