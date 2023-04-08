import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useContext } from 'react';

import { AuthContext } from '../../contexts/Auth';
import { useNotifications } from '../../contexts/Notifications';
import { HeaderWrapper } from './Wrappers';

export default function Header({ }) {
  const { authStatus, connect } = useContext(AuthContext);
  const { addNotification } = useNotifications();

  return (
    <HeaderWrapper>
      <ConnectButton />
      Home - {authStatus}
      <button onClick={() => connect('authenticated')}>
        Connect
      </button>
      <button onClick={() => {
        addNotification({
          title: `Test`,
          subtitle: '',
        });
      }}>
        Trigger Notification
      </button>
    </HeaderWrapper>
  )
}