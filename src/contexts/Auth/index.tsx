import React, {useState} from 'react';
import moment from 'moment';
import {AuthenticationStatus} from '@rainbow-me/rainbowkit';

import * as defaults from './defaults';
import type {AuthContextInterface} from './defaults';
import {useRouter} from 'next/router';
import {useNotifications} from '../Notifications';

export const AuthContext = React.createContext<AuthContextInterface>(
  defaults.defaultAuthContext
);

export const useAuth = () => React.useContext(AuthContext);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  let status: AuthenticationStatus = 'loading';

  const [authStatus, setAuthStatus] = useState<AuthenticationStatus>(status);
  const router = useRouter();
  const {addNotification} = useNotifications();

  const connect = (s: AuthenticationStatus) => {
    setAuthStatus(s);
  };

  const getJwtLocalStorage = (): { access: string; refresh: string } | null => {
    if (typeof window === "undefined") {
      return null;
    };
  
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

  const getUserAddress = () => {
    if (typeof window === "undefined") {
      return '';
    };

    const user = JSON.parse(localStorage.getItem('user') as string);

    if (user && user.address) {
      return user.address;
    }
  
    return '';
  };
  
  const isJWTexpired = (): boolean => {
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

  const userLogOut = (): void => {
    localStorage.clear();
    connect('unauthenticated');
    router.push('/');
  };

  const userLogIn = (address: string, tokens: any): void => {
    localStorage.setItem('user', JSON.stringify(address as string));
    localStorage.setItem('JWT', JSON.stringify(tokens));

    addNotification({
      title: 'Welcome to Communa',
      subtitle: '',
    });

    connect('authenticated');
    router.push('/time');
    location.href = '/time';
  };

  return (
    <AuthContext.Provider
      value={{
        authStatus,
        connect,
        userLogOut,
        userLogIn,
        isJwtExpired: isJWTexpired(),
        userAddress: getUserAddress(),
        jwt: getJwtLocalStorage()
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
