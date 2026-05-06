import { LOCAL_STORAGE_KEYS } from '../constants/localStorageKeys';

const getToken = (): string | null => {
  return localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
};

const setToken = (hash: string): void => {
  localStorage.setItem('token', hash);
};

const removeToken = (): void => {
  localStorage.removeItem('token');
};

export { getToken, setToken, removeToken };
