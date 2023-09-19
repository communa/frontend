import Head from 'next/head';

import { HomePageWrapper } from 'src/lib/Wrappers';
import { APP_NAME } from 'src/config/consts';
import Header from 'src/lib/Layout/Logo';
import { Button, Link } from '@mui/material';
import NextLink from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { AuthContext } from 'src/contexts/Auth';
import { useContext } from 'react';
import ContractAirdrop from 'src/lib/Contract/airdrop';

const Home = () => {
  const { authStatus } = useContext(AuthContext);

  return (
    <HomePageWrapper>
      <Head>
        <title>Web3 Freelance Marketplace - {APP_NAME}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="index, follow" />
        <meta name="description" content={APP_NAME} />
        <link rel="icon" href="/logo.png" />
      </Head>
      <main>
        <section id="index">
          <p className="helpLinks">
            <NextLink href="https://github.com/communa">
              GitHub
            </NextLink>
            <NextLink href="/litepaper">
              Docs
            </NextLink>
          </p>
          <Header />
          <h1>Web3 marketplace to connect businesses with talents</h1>
          <h3>...through blockchain!</h3>
          <div className="action">
            <NextLink href="/activity" passHref>
              <Button variant="outlined" LinkComponent={Link}>
                Browse Jobs
              </Button>
            </NextLink>
            {authStatus === 'unauthenticated' ? (
              <ConnectButton label="Create a Profile" />
            ) : (
              <Button variant="contained" disabled>
                Download TimeTracker
              </Button>
            )}
          </div>
        </section>
        <section id="howitworks">
          <h2>How It Works</h2>
          <h3>
            Communa automates the needed business processes directly on the blockchain.
          </h3>
        </section>
        <section id="fees">
          <h2>Fees</h2>
          <h3>
            Our smart contracts automate all required processes related to time-tracking.
          </h3>
        </section>
        <section id="token">
          <h2>Token</h2>
          <h3>
            Airdrop 10 tokens (Goerli Testnet)
          </h3><br />
          <ContractAirdrop />
        </section>
        <section id="faq">
          <h2>FAQ</h2>
          <ul className="faq">
            <li>But how does it really work?</li>
            <li>How is the HTTPS enabled?</li>
            <li>Who can access .local domains published by LocalCan?</li>
            <li>Will it work in my Wi-Fi / local network?</li>
            <li>In which networks it wont work?</li>
            <li>How much memory does LocalCan use?</li>
          </ul>
          <Header />
          <p>Web3 freelancing marketplace</p>
          <div className="action">
            <NextLink href="/activity" passHref>
              <Button variant="contained" LinkComponent={Link}>
                Browse Jobs
              </Button>
            </NextLink>
            {authStatus === 'unauthenticated' ? (
              <ConnectButton label="Create a Profile" />
            ) : (
              <Button variant="contained" disabled>
                Download TimeTracker
              </Button>
            )}
          </div>
          <p className="helpLinks">
            <NextLink href="https://github.com/communa">
              GitHub
            </NextLink>
            <NextLink href="/litepaper">
              Read Docs
            </NextLink>
          </p>
          <br />
          <p className="copyright">
            MIT License. Copyright (c) 2023 Ivan Proskuryakov
          </p>
        </section>
      </main>
    </HomePageWrapper>
  );
};

export default Home;
