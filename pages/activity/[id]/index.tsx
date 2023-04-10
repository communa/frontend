import { useEffect } from 'react';
import type { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';

import { IActivity } from 'src/interface/IActivity';
import { request } from 'src/Utils';
import { ActivityPageWrapper } from 'src/lib/Wrappers';
// import { useNotifications } from 'src/contexts/Notifications';
import { API_HOST, APP_NAME } from 'src/config/consts';
import ActivityFull from 'src/lib/Activity/ActivityFull';

export const getServerSideProps: GetServerSideProps<{ activity: IActivity }> = async (context: GetServerSidePropsContext) => {
  const { id } = context.query;
  const response = await request({
    url: `${API_HOST}/api/activity/${id}`,
    method: 'GET'
  });

  return {
    props: {
      activity: response.data,
    },
  }
}

const Activity = ({ activity }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // const { addNotification } = useNotifications();

  // useEffect(() => {
  //   addNotification({
  //     title: `You're checking ${activity.title}`,
  //     subtitle: '',
  //   });
  // }, []);

  return (
    <ActivityPageWrapper>
      <Head>
        <title>{activity.title} - {APP_NAME}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="index, follow" />
        <meta name="description" content="About page" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <ActivityFull activity={activity} />
    </ActivityPageWrapper>
  );
};

export default Activity;