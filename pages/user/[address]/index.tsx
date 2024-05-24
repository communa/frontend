import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import Head from 'next/head';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {useInterval} from 'usehooks-ts';
import {useRouter} from 'next/router';
import {useTonConnectUI} from '@tonconnect/ui-react';

import {Chip} from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import PaymentIcon from '@mui/icons-material/Payment';

import {API_HOST, APP_DESCRIPTION, APP_NAME} from 'src/config/consts';
import {PageWrapper, UserPageWrapper} from 'src/lib/Wrappers';
import {ConnectButtonTon} from 'src/lib/Layout/ConnectButtonTon';
import {addressToShort, buildTransactionTon, getAddressNetwork, request} from 'src/Utils';
import {IUser} from 'src/interface/IUser';
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

let WebApp: any = null;

const UserProfile = ({user }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [tonConnectUI] = useTonConnectUI();
  const {userAddress} = useAuth();
  const [timer, setTimer] = useState(0);
  const [isPlaying, setPlaying] = useState<boolean| null>(true)
  const router = useRouter();
  const {redirect} = router.query;
  const network = getAddressNetwork(user.address);

  useInterval(() => {
    setTimer((new Date()).getMilliseconds());
  }, isPlaying ? 1000 : null);

  useEffect(() => {
    if (window !== undefined) {
      WebApp = window?.Telegram?.WebApp;
  
      if (WebApp) {
        setPlaying(null);
        WebApp.ready();
        WebApp.expand();
      }
    }
  }, [timer]);

  useEffect(() => {
    const pay = async () => {     
      if (redirect === 'payment' && !isPlaying) {
        const transaction = await buildTransactionTon(user, 'Communa');
        tonConnectUI?.sendTransaction(transaction);
      }
    };
  
    pay();

    return () => {};
  }, [redirect, isPlaying]);

  const pay = async () => {
    const transaction = await buildTransactionTon(user, 'Communa');
    tonConnectUI?.sendTransaction(transaction);
  }

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
              <p>
                {userAddress && (
                  <Link href={`/user/${user.address}/edit`}>
                    <button className="apply small">
                      <SelfImprovementIcon />
                      Edit profile
                    </button>
                  </Link>
                )}
              </p>
            </nav>
            <div className="userProfile">
              <div className="fields">
                <h3>Address ({network})</h3>
                <p className="address">{user.address}</p>
                <h3>Username</h3>
                <p>{user.userName}</p>
                <h3>Company</h3>
                <p>{user.company}</p>
                <h3>Skills</h3>
                <div className="skills">
                  {user.skills && (user.skills.split(',').map(skill => {
                    return (
                      <Chip
                        label={skill}
                        color="default"
                        variant="filled"
                      />
                    )
                  }))}
                </div>                
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
                <h3>
                  ${user.price}
                </h3>
                <div
                  className="body"
                  dangerouslySetInnerHTML={{
                    __html: user.bio,
                  }}
                />
                {network === 'TON' && (
                  <>
                    {userAddress ? (
                      <button
                        className="apply small pay" 
                        onClick={pay}
                      >
                        <PaymentIcon />
                        Pay Now
                      </button>
                      ) : (
                        <ConnectButtonTon 
                          paymentUrl={`/user/${user.address}?redirect=payment`} 
                        />
                    )}
                  </>
                )}
                {network === 'EVM' && userAddress && (
                  <>
                    <br />
                    <p>Payment on EVM networks are not yet supported.</p>
                  </>
                )}
              </div>
            </div>
          </UserPageWrapper>
        </article>
      </main>
    </PageWrapper>
  );
};

export default UserProfile;
