import type { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';

import { request } from 'src/Utils';
import { UserPageWrapper } from 'src/lib/Wrappers';
import { API_HOST, APP_NAME } from 'src/config/consts';
import Header from 'src/lib/Layout/Header';
import { IUser } from 'src/interface/IUser';

export const getServerSideProps: GetServerSideProps<{ user: IUser }> = async (context: GetServerSidePropsContext) => {
  const { address } = context.query;
  const response = await request({
    url: `${API_HOST}/api/user/${address}/address`,
    method: 'GET'
  });

  return {
    props: {
      user: response.data,
    },
  }
}

const Activity = ({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <UserPageWrapper>
      <Head>
        <title>{user.address} - Software Engineering Jobs - {APP_NAME}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="index, follow" />
        <meta name="description" content={user.address} />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header />
      <article>
        User: {user.address} <br /><br />
        Early access / Under development
      </article>
    </UserPageWrapper>
  );
};

export default Activity;