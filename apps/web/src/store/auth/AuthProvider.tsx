import { useEffect, useState, type ReactNode } from 'react';

import type { CredentialResponseData } from '@org/types';
import type { CredentialResponse } from '@react-oauth/google';
import { googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from './AuthContext';
import { ROUTES } from '../../constants/routes';
import { getToken, setToken, removeToken } from '../../helpers/token';
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<CredentialResponseData>({});

  const cleanToken = () => {
    googleLogout();
    removeToken();
    navigate(ROUTES.LOGIN);
  };

  const handleSuccess = (credentialResponseData: CredentialResponse) => {
    console.log(credentialResponseData);
    const crd = credentialResponseData.credential;
    if (crd) {
      const decoded: CredentialResponse = jwtDecode(crd);
      setToken(crd);
      console.log(decoded);
      if (decoded) navigate(ROUTES.HOME);
    }
  };

  useEffect(() => {
    const setupToken = () => {
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
