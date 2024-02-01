import type {GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType} from 'next';
import Head from 'next/head';

import {IActivity} from 'src/interface/IActivity';
import {request} from 'src/Utils';
import {PageWrapper} from 'src/lib/Wrappers';
import {API_HOST, APP_NAME} from 'src/config/consts';
import ActivityFull from 'src/lib/Activity/ActivityFull';
import MenuLeft from 'src/lib/Layout/MenuLeft';

export const getServerSideProps: GetServerSideProps<{activity: IActivity}> = async (context: GetServerSidePropsContext) => {
  const {id} = context.query;
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

const Activity = ({activity}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <PageWrapper>
      <Head>
        <title>{activity.title} - Web3 Jobs - {APP_NAME}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="index, follow" />
        <meta name="description" content={activity.title} />
        <link rel="icon" href="/logo-testnet.png" />
      </Head>
      <main>
        <MenuLeft />
        <article>
          <ActivityFull activity={activity} />
        </article>
      </main>
    </PageWrapper>
  );
};

export default Activity;