import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import { useContext, useEffect } from 'react';
import Head from 'next/head';

import { AuthContext } from '../src/contexts/Auth';
import { EntryWrapper } from '../src/lib/Wrappers';
import { useNotifications } from '../src/contexts/Notifications';
import { APIContext } from '../src/contexts/Api';

const Home: NextPage = () => {
  const { authStatus, connect } = useContext(AuthContext);
  const { data, state, query } = useContext(APIContext);
  const { addNotification } = useNotifications();

  useEffect(() => {
    query({
      url: `/api/activity/search`,
      method: 'POST',
      data: {
        filter: {
        },
        sort: { createdAt: 'DESC' },
        page: 0,
      }
    });
  }, [])

  console.log(data[0], state);

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
      {data[0].map(activity => {
        return (
          <>
            {activity.id}
            <hr />
            {activity.title}
            <hr />
            {activity.text}
            <hr />
          </>
        )
      })}
    </EntryWrapper >
  );
};

export default Home;
