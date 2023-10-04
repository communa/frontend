import type { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';

import { IActivity } from 'src/interface/IActivity';
import { request } from 'src/Utils';
import { JobsPageWrapper } from 'src/lib/Wrappers';
import { API_HOST, APP_NAME } from 'src/config/consts';
import ActivityFull from 'src/lib/Activity/ActivityFull';
import HeaderJobs from 'src/lib/Layout/HeaderJobs';

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
  return (
    <JobsPageWrapper>
      <Head>
        <title>{activity.title} - Web3 Jobs - {APP_NAME}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="index, follow" />
        <meta name="description" content={activity.title} />
        <link rel="icon" href="/logo.png" />
      </Head>
      <main>
        <HeaderJobs />
        <article>
          <ActivityFull activity={activity} />
        </article>
      </main>
    </JobsPageWrapper>
  );
};

export default Activity;