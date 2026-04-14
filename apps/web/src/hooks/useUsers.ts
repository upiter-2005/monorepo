import { useEffect, useState } from 'react';

import { Params, User } from '@org/types';

import { useQueryParams } from './useQueryParams';
import { getUsers } from '../client/user';
import { createSearchParams } from '../helpers/createSearchParams';

export const useUsers = (initialParams: Partial<Params> = {}) => {
  const { params, setParams } = useQueryParams();

  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async (query?: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getUsers(query);

      setUsers(data.data);
      setTotal(data.pagination.total);
      setIsLoading(false);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error fetch users');
    }
  };

  const changeQuery = (params: Params): void => {
    const finalParams = { ...params };
    const query = createSearchParams(finalParams);
    fetchUsers(query);
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
    fetchUsers,
  };
};
