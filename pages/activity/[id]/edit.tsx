import type { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';

import { IActivity } from 'src/interface/IActivity';
import { request } from 'src/Utils';
import { ActivityPublishWrapper } from 'src/lib/Wrappers';
import { API_HOST, APP_NAME } from 'src/config/consts';
import Header from 'src/lib/Layout/Header';

export const getServerSideProps: GetServerSideProps<{ activity: IActivity }> = async (context: GetServerSidePropsContext) => {
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
      activity: response.data,
    },
  }
}

const Activity = ({ activity }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <ActivityPublishWrapper>
      <Head>
        <title>Publish - Software Engineering Jobs - {APP_NAME}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="index, follow" />
        <meta name="description" content={activity.title} />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header />
      <></>
    </ActivityPublishWrapper>
  );
};

export default Activity;