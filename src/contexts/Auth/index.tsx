import React, { useState } from 'react';
import type { AuthContextInterface } from './defaults';
import moment from 'moment';

import { AuthenticationStatus } from '@rainbow-me/rainbowkit';
import * as defaults from './defaults';

export const AuthContext = React.createContext<AuthContextInterface>(
  defaults.defaultAuthContext
);

export const useAuth = () => React.useContext(AuthContext);

export const getJwtLocalStorage = (): { access: string; refresh: string } | null => {
  const tokens = localStorage.getItem('JWT') as string;

  if (!tokens || tokens === "undefined") {
    return null;
  }

  const JWT = JSON.parse(tokens);

  if (JWT) {
    return JWT;
  }

  return null;
};

export const isJWTexpired = (): boolean => {
  const jwt = getJwtLocalStorage();

  if (jwt) {
    const parts = jwt.access.split('.');
    const exp = JSON.parse(atob(parts[1])).exp;
    const diff = exp - moment().unix();

    if (diff < 1000) {
      return true;
    }
  }

  return false;
};

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
