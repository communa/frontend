import React, { useState } from 'react';
import type { AuthContextInterface } from './defaults';

import { AuthenticationStatus } from '@rainbow-me/rainbowkit';
import * as defaults from './defaults';

export const AuthContext = React.createContext<AuthContextInterface>(
  defaults.defaultAuthContext
);

export const useAuth = () => React.useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  let status: AuthenticationStatus = 'unauthenticated';

  const [authStatus, setAuthStatus] = useState<AuthenticationStatus>(status);

  const connect = (s: AuthenticationStatus) => {
    setAuthStatus(s);
  };

  return (
    <AuthContext.Provider
      value={{
        authStatus,
        connect,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
