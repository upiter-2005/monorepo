import { JSX, useEffect, useState, type ReactNode } from 'react';

import type { CredentialResponseData, LoginPayload } from '@org/types';
import type { CredentialResponse } from '@react-oauth/google';
import { googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from './AuthContext';
import { login } from '../../client/auth';
import { logout } from '../../client/auth';
import { ROUTES } from '../../constants/routes';
import { getToken, setToken, removeToken } from '../../helpers/token';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<CredentialResponseData>({});

  const cleanToken = async (): Promise<void> => {
    googleLogout();
    removeToken();
    logout();
    navigate(ROUTES.LOGIN);
  };

  const handleSuccess = async (credentialResponseData: CredentialResponse): Promise<void> => {
    const crd = credentialResponseData.credential;
    if (crd) {
      const decoded: CredentialResponse & LoginPayload = jwtDecode(crd);
      const { accessToken } = await login(decoded.email);
      setToken(accessToken);
      if (decoded) navigate(ROUTES.HOME);
    }
  };

  useEffect(() => {
    const setupToken = (): void => {
      const credentialHash = getToken();
      if (credentialHash) {
        const decodedToken: CredentialResponseData =
          jwtDecode<CredentialResponseData>(credentialHash);
        setUserData(decodedToken);
      } else {
        navigate(ROUTES.LOGIN);
      }
    };
    setupToken();
  }, []);

  return (
    <AuthContext.Provider value={{ token: userData, cleanToken, handleSuccess }}>
      {children}
    </AuthContext.Provider>
  );
};
