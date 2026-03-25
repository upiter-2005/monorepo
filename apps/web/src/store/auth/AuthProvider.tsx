import { useEffect, useState, type ReactNode } from 'react';

import type { CredentialResponse } from '@react-oauth/google';
import { googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from './AuthContext';
import {getHash, setHash, removeHash} from "../../share/helpers/tokenHash"
import { ROUTES } from '../../share/routes';
import type { CredentialResponseData } from '../../types/authTypes';
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<CredentialResponseData>({});

  const cleanToken = () => {
    googleLogout();
    removeHash();
    navigate(ROUTES.LOGIN);
  };

  const handleSuccess = (credentialResponseData: CredentialResponse) => {
    const crd = credentialResponseData.credential;
    if (crd) {
      const decoded: CredentialResponse = jwtDecode(crd);
      setHash(crd);
      if (decoded) navigate(ROUTES.HOME);
    }
  };

  useEffect(() => {
      const setupToken =  () => {
        const credentialHash = getHash();
        if (credentialHash) {
          const decodedToken: CredentialResponseData = jwtDecode<CredentialResponseData>(credentialHash);
          setUserData(decodedToken);
        } else {
          navigate(ROUTES.LOGIN);
        }
      }
      setupToken();
  }, [])

  return (
    <AuthContext.Provider value={{ token: userData, cleanToken, handleSuccess }}>
      {children}
    </AuthContext.Provider>
  );
};
