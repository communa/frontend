import type { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { IActivity } from 'src/interface/IActivity';
import { request } from 'src/Utils';
import { ActivityPublishWrapper } from 'src/lib/Wrappers';
import { API_HOST, APP_NAME } from 'src/config/consts';
import Header from 'src/lib/Layout/Header';

export const getServerSideProps: GetServerSideProps<{ activities: IActivity[], state: string }> = async (context: GetServerSidePropsContext) => {
  const { state } = context.query;

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

  console.log(state, response.data);

  return {
    props: {
      activities: response.data,
      state: state as string,
    },
  }
}

const Publishing = ({ activities, state }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <ActivityPublishWrapper>
      <Head>
        <title>Publish - Software Engineering Jobs - {APP_NAME}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="index, follow" />
        <meta name="description" content={APP_NAME} />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header />
      <main>
        <h2>Jobs {state}</h2>
        <nav>
          <Link href="/activity/publish?state=published">
            Published
          </Link>
          <Link href="/activity/publish?state=drafts">
            Drafts
          </Link>
          <Link href="/activity/publish?state=archived">
            Archived
          </Link>
          <Link href="/activity/new">
            Publish a Job
          </Link>
        </nav>
        {activities.map(activity => {
          return (
            <div key={activity.id}>
              {activity.id}
            </div>
          )
        })}
      </main>
    </ActivityPublishWrapper>
  );
};

export default Publishing;