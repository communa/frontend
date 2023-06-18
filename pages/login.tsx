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
        <ConnectButton />
      </div>
    </LoginPageWrapper>
  );
};

export default About;