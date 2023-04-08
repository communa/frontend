import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useContext } from 'react';

import { AuthContext } from '../../contexts/Auth';
import { HeaderWrapper } from './Wrappers';

export default function Header({ }) {
  const { authStatus, connect } = useContext(AuthContext);

  return (
    <HeaderWrapper>
      <ConnectButton />
      Home - {authStatus}
      <button onClick={() => connect('authenticated')}>
        Connect
      </button>
    </HeaderWrapper>
  )
}