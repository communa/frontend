import {InferGetServerSidePropsType} from 'next'
import {GetServerSideProps} from 'next'
import Head from 'next/head';
import {useContext, useEffect, useState} from 'react';

import {request} from 'src/Utils';
import {PageWrapper} from 'src/lib/Wrappers';
import {IActivitySearch} from 'src/interface/IActivity';
import {API_HOST, APP_NAME} from 'src/config/consts';
import {APIContext} from 'src/contexts/Api';
import ActivityShort from 'src/lib/Activity/ActivityShort';
import MenuLeft from 'src/lib/Layout/MenuLeft';
import {useRouter} from 'next/router';
import ActivityNavJobs from 'src/lib/Activity/ActivityNavJobs';

export const getServerSideProps: GetServerSideProps<{search: IActivitySearch}> = async (context) => {
  const data = {
    filter: {
    },
    sort: {
      createdAt: 'DESC'
    },
    page: 0,
  };

  if (context.query.filter) {
    data.filter = {
      keywords: [context.query.filter]
    }
  }

  const response = await request({
    url: `${API_HOST}/api/activity/search`,
    method: 'POST',
    data,
  });

  return {
    props: {
      search: response.data,
    },
  }
}

const Activity = ({search}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [activities, setActivities] = useState(search[0]);
  const [page, setPage] = useState(0);
  const router = useRouter();
  const {data, state, query} = useContext(APIContext);

  useEffect(() => {
    if (state === 'ready' && data && data[0]) {
      setActivities([
        ...activities,
        ...data[0],
      ]);
    }
  }, [data]);

  useEffect(() => {
    setPage(0);
    setActivities([]);
    doQuery();
  }, [router.query.filter]);

  const onScroll = (e: any) => {
    const {
      scrollTop,
      clientHeight,
      scrollHeight,
    } = e.nativeEvent.srcElement;
    const canFetch = scrollTop + clientHeight + 150 < scrollHeight;

    if (!canFetch && state !== 'progress') {
      doQuery();
    }
  }
  const doQuery = () => {
    const data = {
      filter: {
      },
      sort: {
        createdAt: 'DESC'
      },
      page: 0,
    };

    if (router.query.filter) {
      data.filter = {
        keywords: [router.query.filter]
      }
    }

    query({
      url: `/api/activity/search`,
      method: 'POST',
      data,
    });
    setPage(page + 1);
  }

  return (
    <PageWrapper onScroll={(e) => onScroll(e)}>
      <Head>
        <title>Web3 Jobs - {APP_NAME}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="index, follow" />
        <meta name="description" content={APP_NAME} />
        <link rel="icon" href="/logo-testnet.png" />
      </Head>
      <main>
        <MenuLeft />
        <article>
          <h1>
            {router.query.filter ? router.query.filter : "All Jobs"}
          </h1>
          <ActivityNavJobs />
          {activities.map(activity => {
            return <ActivityShort key={activity.id} activity={activity} />
          })}
          {activities.length === 0 && (
            <div className="noResults">
              We have no results matching your criteria :(
            </div>
          )}
        </article>
      </main>
    </PageWrapper>
  );
};

export default Activity;
