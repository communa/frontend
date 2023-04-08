import { ConnectButton } from '@rainbow-me/rainbowkit';
import { InferGetServerSidePropsType } from 'next'
import { GetServerSideProps } from 'next'
import { useContext } from 'react';
import Head from 'next/head';

import { request } from '../src/Utils';
import { AuthContext } from '../src/contexts/Auth';
import { EntryWrapper } from '../src/lib/Wrappers';
import { useNotifications } from '../src/contexts/Notifications';
import { IActivityCollection } from '../src/interface/IActivity';


export const getServerSideProps: GetServerSideProps<{ data: IActivityCollection }> = async () => {
  const response = await request({
    url: `http://0.0.0.0:4000/api/activity/search`,
    method: 'POST',
    data: {
      filter: {
      },
      sort: { createdAt: 'DESC' },
      page: 0,
    }
  });

  return {
    props: {
      data: response.data,
    },
  }
}

const Home = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { authStatus, connect } = useContext(AuthContext);
  const { addNotification } = useNotifications();

  console.log(data);

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
      <hr />
      {
        data[0].map(activity => {
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
        })
      }
    </EntryWrapper >
  );
};

export default Home;
