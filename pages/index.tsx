import Head from 'next/head';
import { useContext } from 'react';
import { Button, IconButton, Link } from '@mui/material';
import NextLink from 'next/link';
import GitHubIcon from '@mui/icons-material/GitHub';

import { HomePageWrapper } from 'src/lib/Wrappers';
import { APP_NAME, FAQ_TOPICS } from 'src/config/consts';
import Header from 'src/lib/Layout/Logo';
import { AuthContext } from 'src/contexts/Auth';
import ContractAirdrop from 'src/lib/Contract/Airdrop';
import { ConnectButton } from 'src/lib/Layout/ConnectButton';
import IntroImage from 'src/assets/Illustration-1.png';
import HowItWorksImage from 'src/assets/Illustration-2.png';
import FeesImage from 'src/assets/Illustration-3.png';
import { Faq } from 'src/lib/Layout/Faq';

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
            <a href="https://github.com/communa" target='_blank' rel="noreferrer">
              GitHub
            </a>
            <NextLink href="/litepaper">
              Help
            </NextLink>
          </p>
          <Header />
          <div className="hero">
            <div className="tag-orange-outer">
              <div className="tag-orange-inner">
                <div className="hHuuya">Decentralisation</div>
              </div>
            </div>
            <div className="tag-green-inner">
              <div className="hHuuya">Transparency</div>
            </div>
            <div className="tag-purple-inner">
              <div className="hHuuya">Public reputation</div>
            </div>
            <div className="tag-blue-inner">
              <div className="hHuuya">Payments in USDT</div>
            </div>
            <h1>Web3 marketplace to connect businesses with talents</h1>
            <h3>...through blockchain!</h3>
          </div>
          <div className="action">
            <NextLink href="/activity" passHref>
              <Button variant="outlined" LinkComponent={Link}>
                Browse Jobs
              </Button>
            </NextLink>
            {authStatus === 'unauthenticated' ? (
              <ConnectButton />
            ) : (
              <Button variant="contained" disabled>
                Download TimeTracker
              </Button>
            )}
          </div>
          <p className="jobsTotal">
            <span>1000+</span> active jobs for hire
          </p>
        </section>
        <section id="howitworks">
          <picture>
            <img
              src={IntroImage.src}
              alt="Work Process"
              width={800}
            />
          </picture>
          <h3>
            Reputation
          </h3>
          <p>
            We all know that a strong reputation is essential in a crowded market, where profiles on social networks like LinkedIn serve as a digital resume. Reputation built on blockchain is a new idea that is gaining popularity in the crypto community.
          </p>

          <h2>How It Works</h2>
          <h3>
            Our smart contracts automate all required processes related to time-tracking.
          </h3>
          <picture>
            <img
              src={HowItWorksImage.src}
              alt="Work Process"
              width={800}
            />
          </picture>
          <p>
            Communa is made to operate borderless where unbiased smart contracts enable freelancers to work with clients directly, without the need for 3rd party services or any other intermediaries.
          </p>
        </section>
        <section id="fees">
          <h2>Low fees</h2>
          <h3>
            Our smart contracts automate all required processes related to time-tracking.
          </h3>
          <picture>
            <img
              src={FeesImage.src}
              alt="Work Process"
              width={800}
            />
          </picture>
          <h3>
            Payments
          </h3>
          <p>
            Communa automates the needed business processes directly on the blockchain: time tracking, invoicing, payments, and reputation. Using blockchain we aim not only to reduce costs, and cut the needs for party systems but also to increase trust bringing a level of autonomy that has never been seen before.
          </p>
        </section>
        <section id="token">
          <h2>Token</h2>
          <h3>
            Airdrop 10 tokens on Goerli Testnet
          </h3><br />
          <ContractAirdrop />
        </section>
        <section id="faq">
          <h2>FAQ</h2>
          <Faq />
          <Header />
          <p className="subtext">
            Web3 marketplace to connect<br />businesses with talents
          </p>
          <div className="action">
            <NextLink href="/activity" passHref>
              <Button variant="outlined" LinkComponent={Link}>
                Browse Jobs
              </Button>
            </NextLink>
            {authStatus === 'unauthenticated' ? (
              <ConnectButton />
            ) : (
              <Button variant="contained" disabled>
                Download TimeTracker
              </Button>
            )}
          </div>
          <NextLink href="https://github.com/communa">
            <GitHubIcon />
          </NextLink>
          <p className="helpLinks">
            <a href="https://github.com/communa" target='_blank' rel="noreferrer">
              GitHub
            </a>
            <NextLink href="/litepaper">
              Help
            </NextLink>
          </p>
          <p className="copyright">
            MIT License. Copyright (c) 2023 Communa
          </p>
        </section>
      </main>
    </HomePageWrapper>
  );
};

export default Home;
