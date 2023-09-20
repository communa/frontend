import Head from 'next/head';

import { HomePageWrapper } from 'src/lib/Wrappers';
import { APP_NAME, FAQ_TOPICS } from 'src/config/consts';
import Header from 'src/lib/Layout/Logo';
import { Button, IconButton, Link } from '@mui/material';
import NextLink from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { AuthContext } from 'src/contexts/Auth';
import { useContext } from 'react';
import ContractAirdrop from 'src/lib/Contract/Airdrop';
import GitHubIcon from '@mui/icons-material/GitHub';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

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
              Read docs
            </NextLink>
          </p>
          {/* <GitHubIcon /> */}
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
              <ConnectButton label="Log in with MetaMask" />
            ) : (
              <Button variant="contained" disabled>
                Download TimeTracker
              </Button>
            )}
          </div>
        </section>
        <section id="howitworks">
          <h2>How it works</h2>
          <h3>
            Communa automates the needed business processes directly on the blockchain.
          </h3>
          <div className="placeholder" />
          <h3>
            Trusted by 250+ developers
          </h3>
          <p>
            “LocalCan has been an absolute game-changer for my app development process! As a developer, I used to dread dealing with HTTPS certificates, port numbers, and editing /etc/hosts just to test my apps locally.”
          </p>
        </section>
        <section id="fees">
          <h2>Low fees</h2>
          <h3>
            Our smart contracts automate all required processes related to time-tracking.
          </h3>
          <div className="placeholder" />
          <h3>
            Trusted by 250+ developers
          </h3>
          <p>
            “LocalCan has been an absolute game-changer for my app development process! As a developer, I used to dread dealing with HTTPS certificates, port numbers, and editing /etc/hosts just to test my apps locally.”
          </p>
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
            {FAQ_TOPICS.map(t => {
              return (
                <li key={t}>
                  {t}
                  <IconButton aria-label="delete" size="small">
                    <KeyboardArrowDownIcon />
                  </IconButton>
                </li>
              )
            })}
          </ul>
          <Header />
          <p>Web3 freelancing marketplace</p>
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
          <GitHubIcon />
          <p className="helpLinks">
            <NextLink href="https://github.com/communa">
              GitHub
            </NextLink>
            <NextLink href="/litepaper">
              Read docs
            </NextLink>
          </p>
          <br />
          <p className="copyright">
            MIT License. Copyright (c) 2023 Communa
          </p>
        </section>
      </main>
    </HomePageWrapper>
  );
};

export default Home;
