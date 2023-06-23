import Head from 'next/head';

import { LoginPageWrapper } from 'src/lib/Wrappers';
import { APP_NAME } from 'src/config/consts';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const About = () => {
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
        <h1>Welcome to Communa</h1>
        <h2>
          Web3 freelancing platform that connects businesses
          with talented professionals worldwide, making remote work more convenient than ever before.
        </h2>
        <ConnectButton />
      </div>
    </LoginPageWrapper>
  );
};

export default About;