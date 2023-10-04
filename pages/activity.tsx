import { InferGetServerSidePropsType } from 'next'
import { GetServerSideProps } from 'next'
import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';

import { request } from 'src/Utils';
import { JobsPageWrapper } from 'src/lib/Wrappers';
import { IActivitySearch } from 'src/interface/IActivity';
import { API_HOST, APP_NAME } from 'src/config/consts';
import { APIContext } from 'src/contexts/Api';
import ActivityShort from 'src/lib/Activity/ActivityShort';
import ActivityNavPublishing from 'src/lib/Activity/ActivityNavPublishing';
import HeaderJobs from 'src/lib/Layout/HeaderJobs';

export const getServerSideProps: GetServerSideProps<{ search: IActivitySearch }> = async () => {
  const response = await request({
    url: `${API_HOST}/api/activity/search`,
    method: 'POST',
    data: {
      filter: {
      },
      sort: {
        createdAt: 'DESC'
      },
      page: 0,
    }
  });

  return {
    props: {
      search: response.data,
    },
  }
}

const Home = ({ search }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [activities, setActivities] = useState(search[0]);
  const [page, setPage] = useState(0);
  const { data, state, query } = useContext(APIContext);

  useEffect(() => {
    if (state === 'ready' && data && data[0]) {
      setActivities([
        ...activities,
        ...data[0],
      ]);
    }
  }, [data]);

  const onScroll = (e: any) => {
    const {
      scrollTop,
      clientHeight,
      scrollHeight,
    } = e.nativeEvent.srcElement;
    const canFetch = scrollTop + clientHeight + 150 < scrollHeight;

    console.log(state);

    if (!canFetch && state !== 'progress') {
      query({
        url: `/api/activity/search`,
        method: 'POST',
        data: {
          filter: {
          },
          sort: { createdAt: 'DESC' },
          page: page + 1,
        }
      });
      setPage(page + 1);
    }
  }

  console.log(activities, state);

  return (
    <JobsPageWrapper onScroll={(e) => onScroll(e)}>
      <Head>
        <title>Web3 Jobs - {APP_NAME}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="index, follow" />
        <meta name="description" content={APP_NAME} />
        <link rel="icon" href="/logo.png" />
      </Head>
      <main>
        <HeaderJobs />
        <article>
          <h2>All jobs</h2>
          <ActivityNavPublishing />
          {activities.map(activity => {
            return <ActivityShort key={activity.id} activity={activity} />
          })}
        </article>
      </main>
    </JobsPageWrapper >
  );
};

export default Home;
