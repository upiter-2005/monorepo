import { useEffect, useState } from 'react';

import { Params, User } from '@org/types';

import { concatQueryString } from '../helpers/concatQueryString';

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

  const [users, setUsers] = useState<User[] | null>(null);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async (query?: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`http://localhost:3000/api/users?${query}`);
      const data = await response.json();
      setUsers(data.data);
      setPagination(data.meta);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const changeQuery = (params: Params): void => {
    const finalParams = { ...params };
    const query = concatQueryString(finalParams);
    setParams(finalParams);
    fetchUsers(query);
  };

  useEffect(() => {
    changeQuery(params);
  }, []);

  return {
    data: users,
    pagination,
    loading,
    error,
    params,
    setParams,
    changeQuery,
    fetchUsers,
  };
};
