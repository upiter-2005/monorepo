import { useEffect, useState } from 'react';

import { User } from '@org/types';

import { fetchUsers } from '../client/user';

export function useUsers(searchQuery: string) {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refetch = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { users, totalCount } = await fetchUsers(searchQuery);

      setUsers(users);
      setTotal(totalCount);
      setIsLoading(false);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  useEffect(() => {
    refetch();
  }, [searchQuery]);

  return {
    users,
    total,
    isLoading,
    error,
  };
}
