export const createAuthParams = (init: RequestInit = {}, accessToken: string): RequestInit => {
  return {
    ...init,
    credentials: 'include',
    headers: {
      ...(init.headers || {}),
      Authorization: `Bearer ${accessToken}`,
    },
  } as RequestInit;
};
