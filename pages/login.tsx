import Head from 'next/head';
import Link from 'next/link';

import { LoginPageWrapper } from 'src/lib/Wrappers';
import { APP_NAME } from 'src/config/consts';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { AuthContext } from 'src/contexts/Auth';
import { useContext } from 'react';

const About = () => {
  const { authStatus } = useContext(AuthContext);

  return (
    <LoginPageWrapper>
      <Head>
        <title>Login - Software Engineering Jobs - {APP_NAME}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className="banner">
        ..
      </div>
      <div className="login">
        <div className="main">
          <h1>Welcome to Communa!</h1>
          <h2>
            Communa is a freelancing platform that connects businesses
            with talented professionals worldwide, making remote work more convenient than ever before.
          </h2>
          {authStatus === 'unauthenticated' && <ConnectButton label='Connect Wallet' />}
        </div>
        <div className="nav">
          <Link href="/">
            Browse Jobs
          </Link>
          <Link href="/about">
            About Us
          </Link>
          <a href="https://github.com/communa" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </div>
    </LoginPageWrapper>
  );
};

export default About;