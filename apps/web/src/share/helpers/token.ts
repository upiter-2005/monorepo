const TOKEN = localStorage.getItem('token');

const getToken = (): string | null => {
  if (TOKEN) {
    return TOKEN;
  } else {
    return null;
  }
};

const setToken = (hash: string): void => {
  localStorage.setItem('token', hash);
};

const removeToken = (): void => {
  localStorage.removeItem('token');
};

export { getToken, setToken, removeToken };
