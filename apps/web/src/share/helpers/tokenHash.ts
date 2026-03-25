const getHash = (): string | null => {
  if (localStorage.getItem('token')) {
    return localStorage.getItem('token');
  } else {
    return null;
  }
};

const setHash = (hash: string): void => {
  localStorage.setItem('token', hash);
};

const removeHash = (): void => {
  localStorage.removeItem('token');
};

export { getHash, setHash, removeHash };
