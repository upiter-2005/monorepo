import { createContext } from 'react';

import type { CredentialResponse } from '@react-oauth/google';
import type { CredentialResponseData } from '../../types/authTypes';

export interface AuthDataContext {
  token: CredentialResponseData | null;
  cleanToken: () => void;
  handleSuccess: (credentialResponseData: CredentialResponse) => void
}


export const AuthContext = createContext<AuthDataContext>({
  token: null,
  cleanToken: function (): void { /* empty */ },
  handleSuccess: function (): void {/* empty */ }
});
