import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import Head from 'next/head';
import Link from 'next/link';

import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';

import {addressToShort, request} from 'src/Utils';
import {API_HOST, APP_DESCRIPTION, APP_NAME} from 'src/config/consts';
import {IUser} from 'src/interface/IUser';
import {PageWrapper, UserPageWrapper} from 'src/lib/Wrappers';
import MenuMain from 'src/lib/Layout/MenuMain';
import {useAuth} from 'src/contexts/Auth';

export const getServerSideProps: GetServerSideProps<{
  user: IUser;
}> = async (context: GetServerSidePropsContext) => {
  const {address} = context.query;
  const response = await request({
    url: `${API_HOST}/api/user/${address}/address`,
    method: 'GET',
  });

  return {
    props: {
      user: response.data,
    },
  };
};

const UserProfile = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {userAddress} = useAuth();

  return (
    <PageWrapper>
      <Head>
        <title>
          {user.address} - {APP_NAME}
        </title>
        <meta
          name="description"
          content={`${user.address} - ${APP_DESCRIPTION}`}
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <main>
        <MenuMain />
        <article>
          <UserPageWrapper>
            <nav className="action">
              <h2>{addressToShort(user.address)}</h2>
              {userAddress && (
                <Link href={`/user/${user.address}/edit`}>
                  <button className="apply small">
                    <SelfImprovementIcon />
                    Edit profile
                  </button>
                </Link>
              )}
            </nav>
            <div className="userProfile">
              <div className="fields">
                <h3>Address</h3>
                <p className="address">
                  {user.address}
                </p>
                <h3>Username</h3>
                <p>{user.userName}</p>
                <h3>Company</h3>
                <p>{user.company}</p>
                <div className="social">
                  {user.twitter && (
                    <p>
                      <TwitterIcon />
                      <a href={user.twitter} target="_blank">
                        {user.twitter}
                      </a>
                    </p>
                  )}
                  {user.linkedIn && (
                    <p>
                      <LinkedInIcon />
                      <a href={user.linkedIn} target="_blank">
                        {user.linkedIn}
                      </a>
                    </p>
                  )}
                  {user.facebook && (
                    <p>
                      <FacebookIcon />
                      <a href={user.facebook} target="_blank">
                        {user.facebook}
                      </a>
                    </p>
                  )}
                  {user.telegram && (
                    <p>
                      <TelegramIcon />
                      <a href={user.telegram} target="_blank">
                        {user.telegram}
                      </a>
                    </p>
                  )}
                  {user.github && (
                    <p>
                      <GitHubIcon />
                      <a href={user.github} target="_blank">
                        {user.github}
                      </a>
                    </p>
                  )}
                </div>
              </div>
              <div className="bio">
                <h3>Bio</h3>
                <div
                  className="body"
                  dangerouslySetInnerHTML={{
                    __html: user.bio,
                  }}
                />
              </div>
            </div>
          </UserPageWrapper>
        </article>
      </main>
    </PageWrapper>
  );
};

export default UserProfile;
