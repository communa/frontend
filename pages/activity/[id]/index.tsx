import type { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';

import { EntryWrapper } from '../../../src/lib/Wrappers';
import { IActivity } from '../../../src/interface/IActivity';
import { request } from '../../../src/Utils';
import Header from '../../../src/lib/layout/Header';

export const getServerSideProps: GetServerSideProps<{ activity: IActivity }> = async (context: GetServerSidePropsContext) => {
  const { id } = context.query;
  const response = await request({
    url: `http://0.0.0.0:4000/api/activity/${id}`,
    method: 'GET'
  });

  return {
    props: {
      activity: response.data,
    },
  }
}

const Activity = ({ activity }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log(activity);
  return (
    <EntryWrapper>
      <Head>
        <title>{activity.title} - Communa.Network</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="index, follow" />
        <meta name="description" content="About page" />
      </Head>

      <Header />

      <h1>{activity.title}</h1>
      <h2>{activity.position}</h2>
      <h2>{activity.salary}</h2>
      <hr />
      {activity.text}
    </EntryWrapper>
  );
};

export default Activity;