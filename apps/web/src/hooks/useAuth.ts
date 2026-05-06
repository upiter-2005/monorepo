import { useContext } from 'react';

import { AuthContext, AuthDataContext } from '../store/auth/AuthContext';

export const useAuth = (): AuthDataContext => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
};
