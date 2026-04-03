// hooks/useUsers.ts
import { useEffect, useState, useCallback } from 'react';

import { User } from '@org/types';

type Params = {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: 'createdAt' | 'lastLoginAt';
  order?: 'ASC' | 'DESC';
};

type MetaData = {
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

  const [data, setData] = useState<User[] | null>(null);
  const [meta, setMeta] = useState<MetaData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(
    async (overrideParams?: Params) => {
      try {
        setLoading(true);
        setError(null);

        const finalParams = { ...params, ...overrideParams };

        const query = new URLSearchParams(
          Object.entries(finalParams).reduce(
            (acc, [key, value]) => {
              if (value !== undefined) acc[key] = String(value);
              return acc;
            },
            {} as Record<string, string>,
          ),
        ).toString();

        const response = await fetch(`http://localhost:3000/api/users?${query}`);

        if (!response.ok) {
          setLoading(false);
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        setData(data.data);
        setMeta(data.meta);
        setParams(finalParams);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
      }
    },
    [params],
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    data,
    meta,
    loading,
    error,
    params,
    setParams,
    fetchUsers,
  };
};
