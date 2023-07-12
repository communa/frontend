import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { GetServerSideProps } from 'next'
import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';

import { HomePageWrapper } from 'src/lib/Wrappers';
import { IActivity } from 'src/interface/IActivity';
import { APP_NAME } from 'src/config/consts';
import { APIContext } from 'src/contexts/Api';
import ActivityShort from 'src/lib/Activity/ActivityShort';
import Header from 'src/lib/Layout/Header';
import { getJwtLocalStorage } from 'src/contexts/Auth';
import ActivityNavPublishing from 'src/lib/Activity/ActivityNavPublishing';

export const getServerSideProps: GetServerSideProps<{ state: string }> = async (context: GetServerSidePropsContext) => {
  const { state } = context.query;

  return {
    props: {
      state: state as string,
    },
  }
}

const My = ({ state }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const api = useContext(APIContext);
  const [activities, setActivities] = useState<IActivity[]>([]);

  useEffect(() => {
    if (api.state === 'ready' && api.data && api.data[0]) {
      setActivities([
        ...activities,
        ...api.data[0],
      ]);
    }
  }, [api.data]);

  useEffect(() => {
    const jwt = getJwtLocalStorage();
    setActivities([]);

    api.query({
      url: `/api/activity/search/publishing`,
      method: 'POST',
      headers: {
        Authorization: jwt?.access
      },
      data: {
        filter: {
          state
        },
        sort: { createdAt: 'DESC' },
        page: 0,
      }
    });
  }, [state]);

  return (
    <HomePageWrapper>
      <Head>
        <title>Software Engineering Jobs - {APP_NAME}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="index, follow" />
        <meta name="description" content={APP_NAME} />
        <link rel="icon" href="/logo.png" />
      </Head>
      <main>
        <Header />
        <h2>Jobs / {state}</h2>
        <ActivityNavPublishing state='' />
        {activities.length > 0 && activities.map(activity => {
          return <ActivityShort key={activity.id} activity={activity} />
        })}
        {activities.length === 0 && (
          <p>
            You have no <strong>{state}</strong> jobs
          </p>
        )}
      </main>
    </HomePageWrapper >
  );
};

export default My;
