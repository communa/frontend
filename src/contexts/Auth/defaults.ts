import { AuthenticationStatus } from '@rainbow-me/rainbowkit';

export interface AuthContextInterface {
  authStatus: AuthenticationStatus;
  connect: (s: AuthenticationStatus) => void;
}

export const defaultAuthContext: AuthContextInterface = {
  authStatus: 'unauthenticated',
  // eslint-disable-next-line
  connect: (s: AuthenticationStatus) => { },
};
