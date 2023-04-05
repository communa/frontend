import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import { useContext } from 'react';
import Head from 'next/head';

import { AuthContext } from '../src/contexts/Auth';
import { EntryWrapper } from '../src/lib/Wrappers';
import { useNotifications } from '../src/contexts/Notifications';

const Home: NextPage = () => {
  const { authStatus, connect } = useContext(AuthContext);
  const { addNotification } = useNotifications();
  return (
    <EntryWrapper>
      <Head>
        <title>Home - Communa.Network</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="index, follow" />
        <meta name="description" content="About page" />
      </Head>

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
    </EntryWrapper>
  );
};

export default Home;
