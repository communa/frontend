import type { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';

import { request } from 'src/Utils';
import { API_HOST, APP_NAME } from 'src/config/consts';
import { IUser } from 'src/interface/IUser';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';
import { DocumentPageWrapper } from 'src/lib/Wrappers';
import HeaderJobs from 'src/lib/Layout/HeaderJobs';

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
    <DocumentPageWrapper>
      <Head>
        <title>{user.address} - Software Engineering Jobs - {APP_NAME}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="index, follow" />
        <meta name="description" content={user.address} />
        <link rel="icon" href="/logo.png" />
      </Head>
      <main>
        <aside>
          <HeaderJobs />
        </aside>
        <article>
          <form>
            <h3>Address</h3>{user.address}<br />
            <h3>Name</h3>{user.userName}<br />
            <h3>Company</h3>{user.company}<br />
            <h3>Twitter</h3>{user.twitter}<br />
            <h3>LinkedIn</h3>{user.linkedIn}<br />
            <h3>Telegram</h3>{user.telegram}<br />

            <h3>Bio</h3>
            <div className="body" dangerouslySetInnerHTML={{
              __html: user.bio
            }} />

            <br />
            {address === user.address && (
              <button className='update' onClick={() => onEdit()}>
                Edit
              </button>
            )}
          </form>
        </article>
      </main>
    </DocumentPageWrapper>
  );
};

export default UserProfile;