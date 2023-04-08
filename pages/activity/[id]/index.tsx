import { useEffect } from 'react';
import type { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';

import { IActivity } from 'src/interface/IActivity';
import { request } from 'src/Utils';
import Header from 'src/lib/layout/Header';
import { ActivityPageWrapper } from 'src/lib/Wrappers';
import { useNotifications } from 'src/contexts/Notifications';
import { API_HOST, APP_NAME } from 'src/config/consts';

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
  const { addNotification } = useNotifications();

  useEffect(() => {
    addNotification({
      title: `You're checking ${activity.title}`,
      subtitle: '',
    });
  }, []);

  return (
    <ActivityPageWrapper>
      <Head>
        <title>{activity.title} - {APP_NAME}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="index, follow" />
        <meta name="description" content="About page" />
      </Head>
      {/* <Header /> */}
      <article>
        <h1>{activity.title}</h1>
        <h2>{activity.position}</h2>
        <h2>{activity.salary}</h2>
        <div className="body">
          {activity.text}
        </div>
        <a href={activity.jobUrl} target='_blank' rel="noreferrer">
          {activity.jobUrl}
        </a>
      </article>
    </ActivityPageWrapper>
  );
};

export default Activity;