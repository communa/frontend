import type { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';

import { request } from 'src/Utils';
import { UserPageWrapper } from 'src/lib/Wrappers';
import { API_HOST, APP_NAME } from 'src/config/consts';
import Header from 'src/lib/Layout/Header';
import { IUser } from 'src/interface/IUser';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';

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

const UserProfile = ({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { address } = useAccount();

  const onEdit = () => {
    router.push(`/user/${user.address}/edit`);
  }

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
      <main>
        <strong>Address</strong>{user.address}<br />
        <strong>Name</strong>{user.userName}<br />
        <strong>Company</strong>{user.company}<br />
        <strong>Twitter</strong>{user.twitter}<br />
        <strong>LinkedIn</strong>{user.linkedIn}<br />
        <strong>Telegram</strong>{user.telegram}<br />
        <strong>Bio</strong>
        <div className="body" dangerouslySetInnerHTML={{
          __html: user.bio
        }} />

        {address === user.address && (
          <button className='update' onClick={() => onEdit()}>
            Edit
          </button>
        )}
      </main>
    </UserPageWrapper>
  );
};

export default UserProfile;