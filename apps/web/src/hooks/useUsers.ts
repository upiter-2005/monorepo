import { useEffect, useState } from 'react';

import { TOKEN_ERRORS } from '@org/constants';
import { User } from '@org/types';
import { useNavigate } from 'react-router-dom';

import { fetchUsers } from '../client/user';
import { ROUTES } from '../constants/routes';
import { getToken, setToken } from '../helpers/token';

type UseUsersProps = {
  users: User[];
  total: number;
  isLoading: boolean;
  error: string | null;
};

export function useUsers(searchQuery: string): UseUsersProps {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const refetch = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const accessToken = getToken();

      if (!accessToken) {
        throw new Error(TOKEN_ERRORS.TOKEN_MISSING);
      }

      const { users, totalCount, newAccessToken } = await fetchUsers(searchQuery);

      setToken(newAccessToken);
      setUsers(users);
      setTotal(totalCount);
      setIsLoading(false);
    } catch (err) {
      setError((err as Error).message);

      navigate(ROUTES.LOGIN);
    } finally {
      setIsLoading(false);
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
