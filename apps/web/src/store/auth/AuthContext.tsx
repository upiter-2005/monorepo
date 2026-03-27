import { createContext } from 'react';

import type { CredentialResponseData } from '@org/types';
import type { CredentialResponse } from '@react-oauth/google';

export interface AuthDataContext {
  token: CredentialResponseData | null;
  cleanToken: () => void;
  handleSuccess: (credentialResponseData: CredentialResponse) => void;
}

export const AuthContext = createContext<AuthDataContext>({
  token: null,
  cleanToken: function (): void {
    /* empty */
  },
  handleSuccess: function (): void {
    /* empty */
  },
});
