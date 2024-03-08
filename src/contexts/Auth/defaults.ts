import { AuthenticationStatus } from '@rainbow-me/rainbowkit';

export interface AuthContextInterface {
  authStatus: AuthenticationStatus;
  connect: (s: AuthenticationStatus) => void;
  userAddress: string,
  isJwtExpired: boolean,  
  jwt: { access: string; refresh: string } | null,
  userLogOut: () => void,
  userLogIn: (address: string, tokens: any) => void
}

export const defaultAuthContext: AuthContextInterface = {
  authStatus: 'loading',
  userAddress: '',
  jwt: null,
  isJwtExpired: false,  
  // eslint-disable-next-line
  connect: (s: AuthenticationStatus) => { },
  userLogOut: () => {},
  userLogIn: (address: string, tokens: any) => {},  
};
