import { API_URL } from '../constants/apiUrls';
import { removeToken } from '../helpers/token';

export const logout = async (): Promise<void> => {
  await fetch(`${API_URL}/auth/logout`, {
    credentials: 'include',
  });
  removeToken();
};
