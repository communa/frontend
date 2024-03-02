import type {GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType} from 'next';
import Head from 'next/head';

import {request} from 'src/Utils';
import {API_HOST, APP_NAME} from 'src/config/consts';
import {IUser} from 'src/interface/IUser';
import {UserPageWrapper} from 'src/lib/Wrappers';
import MenuLeft from 'src/lib/Layout/MenuLeft';
import Link from 'next/link';
import {Button} from '@mui/material';
import {useAccount} from 'wagmi';
import EditIcon from '@mui/icons-material/Edit';

export const getServerSideProps: GetServerSideProps<{user: IUser}> = async (context: GetServerSidePropsContext) => {
  const {address} = context.query;
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

const UserProfile = ({user}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {address} = useAccount();

  return (
    <UserPageWrapper>
      <Head>
        <title>{user.address} - {APP_NAME}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="index, follow" />
        <meta name="description" content={user.address} />
        <link rel="icon" href="/logo-testnet.png" />
      </Head>
      <main>
        <MenuLeft />
        <article>
          <nav className="action">
            <h2>{user.address}</h2>
            {address && (
              <Link href={`/user/${user.address}/edit`}>
                <Button variant='contained' startIcon={<EditIcon />}>
                  Edit profile
                </Button>
              </Link>
            )}
          </nav>
          <form>
            <h3>Name</h3>{user.userName}<br />
            <h3>Company</h3>{user.company}<br />
            <h3>Twitter</h3>{user.twitter}<br />
            <h3>LinkedIn</h3>{user.linkedIn}<br />
            <h3>Telegram</h3>{user.telegram}<br />
            <h3>Bio</h3>
            <div className="body" dangerouslySetInnerHTML={{
              __html: user.bio
            }} />
          </form>
        </article>
      </main >
    </UserPageWrapper>
  );
};

export default UserProfile;