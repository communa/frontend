import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import Head from 'next/head';

import {IActivity} from 'src/interface/IActivity';
import {request} from 'src/Utils';
import {PageWrapper} from 'src/lib/Wrappers';
import {API_HOST, APP_DESCRIPTION, APP_NAME} from 'src/config/consts';
import ActivityFull from 'src/lib/Activity/ActivityFull';
import MenuMain from 'src/lib/Layout/MenuMain';

export const getServerSideProps: GetServerSideProps<{
  activity: IActivity;
}> = async (context: GetServerSidePropsContext) => {
  const {id} = context.query;
  const response = await request({
    url: `${API_HOST}/api/activity/${id}`,
    method: 'GET',
  });

  return {
    props: {
      activity: response.data,
    },
  };
};

const Activity = ({
  activity,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <PageWrapper>
      <Head>
        <title>
          {activity.title} - Web3 Job - {APP_NAME}
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/logo.png" />

        <meta
          name="description"
          content={`${activity.title} - ${APP_DESCRIPTION}`}
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <main>
        <MenuMain />
        <article>
          <ActivityFull activity={activity} />
        </article>
      </main>
    </PageWrapper>
  );
};

export default Activity;
