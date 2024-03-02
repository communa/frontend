import React, {useState} from 'react';
import type {AuthContextInterface} from './defaults';
import moment from 'moment';

import {AuthenticationStatus} from '@rainbow-me/rainbowkit';
import * as defaults from './defaults';

export const AuthContext = React.createContext<AuthContextInterface>(
  defaults.defaultAuthContext
);

export const useAuth = () => React.useContext(AuthContext);

export const getJwtLocalStorage = (): { access: string; refresh: string } | null => {
  const searchParams = new URLSearchParams(window.location.search);
  const access = searchParams.get('Authentication');
  const jwt = JSON.parse(localStorage.getItem('JWT') as string);

  if (access) {
    const tokens = {
      access,
      refresh: '', // Refresh token missing
    };

    localStorage.setItem('JWT', JSON.stringify(tokens));

    return tokens;
  }

  if (jwt?.access) {
    return jwt;
  }

  return null;
};

export const getAddressWagmiOrJWT = (address: string | undefined): string => {
  if (address !== undefined) {
    return address;
  }

  const user = JSON.parse(localStorage.getItem('user') as string);

  if (user && user.address) {
    return user.address;
  }

  return '';
};


export const getTimeTrackerNonceLocalStorage = (nonce: string): Boolean => {
  const data = typeof window !== "undefined"
    ? window.localStorage.getItem(`none-${nonce}`)
    : false;

  return Boolean(data);
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

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  let status: AuthenticationStatus = 'loading';

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
