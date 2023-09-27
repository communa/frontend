import Head from 'next/head';
import { useContext } from 'react';
import { Button, Link, Tooltip } from '@mui/material';
import NextLink from 'next/link';
import GitHubIcon from '@mui/icons-material/GitHub';

import { HomePageWrapper } from 'src/lib/Wrappers';
import { APP_NAME } from 'src/config/consts';
import Header from 'src/lib/Layout/Logo';
import { AuthContext } from 'src/contexts/Auth';
import ContractAirdrop from 'src/lib/Contract/Airdrop';
import { ConnectButton } from 'src/lib/Layout/ConnectButton';
import IntroImage from 'src/assets/Illustration-2.png';
import HowItWorksImage from 'src/assets/Illustration-2.png';
import FeesImage from 'src/assets/Illustration-2.png';
import { Faq } from 'src/lib/Layout/Faq';

import ClientImage from 'src/assets/client.png';
import FreelancerImage from 'src/assets/freelancer.png';

const Home = () => {
  const { authStatus } = useContext(AuthContext);

  return (
    <HomePageWrapper>
      <Head>
        <title>Web3 Jobs - {APP_NAME}</title>
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
            <h5>...through blockchain!</h5>
          </div>
          <div className="action">
            <Tooltip title="TimeTacker is in development and not yet ready" arrow>
              <NextLink href="/activity" passHref>
                <Button variant="outlined" LinkComponent={Link}>
                  Browse Jobs
                </Button>
              </NextLink>
            </Tooltip>
            {authStatus === 'unauthenticated' ? (
              <ConnectButton size={'large'} />
            ) : (
              <Tooltip title="TimeTacker is in development and not yet ready" arrow>
                <Button variant="contained" disabled>
                  Download TimeTracker
                </Button>
              </Tooltip>
            )}
          </div>
          <p className="jobsTotal">
            <span>1000+</span> active jobs for hire
          </p>
        </section>
        <section id="howitworks">
          <div className="blueprint">
            <picture>
              <img
                src={IntroImage.src}
                alt="Work Process"
                width={800}
              />
            </picture>
            <p>
              Like numerous web2 freelancing platforms, Communa automates the needed business processes directly on the blockchain: time tracking, invoicing, payments, and reputation. Using blockchain we aim not only to reduce costs, and cut the needs for party systems but also to increase trust bringing a level of autonomy that has never been seen before.
            </p>
          </div>
          <h3>How It Works</h3>
          <h5>
            Our smart contracts automate all required processes related to time-tracking.
          </h5>
          <div className="blueprint">
            <picture>
              <img
                src={ClientImage.src}
                alt="Client post a job"
                width={400}
              />
            </picture><span>Job</span>
            <picture>
              <img
                src={FreelancerImage.src}
                alt="Freelancer gets a job"
                width={400}
              />
            </picture>
          </div>
          <h3>
            Reputation
          </h3>
          <p>
            Communa is made to operate borderless where unbiased smart contracts enable freelancers to work with clients directly, without the need for 3rd party services or any other intermediaries.
          </p>
        </section>
        <section id="fees">
          <h2>Low fees</h2>
          <h5>
            Our smart contracts automate all required processes related to time-tracking.
          </h5>
          <div className="blueprint">
            <picture>
              <img
                src={FeesImage.src}
                alt="Work Process"
                width={800}
              />
            </picture>
          </div>
          <h3>
            Payments
          </h3>
          <p>
            Communa automates the needed business processes directly on the blockchain: time tracking, invoicing, payments, and reputation. Using blockchain we aim not only to reduce costs, and cut the needs for party systems but also to increase trust bringing a level of autonomy that has never been seen before.
          </p>
        </section>
        <section id="token">
          <h2>Token</h2>
          <h5>
            Airdrop 10 tokens on Goerli Testnet.<br /> Fill in you Communa profile to recieve the FREE tokens.
          </h5><br />
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
              <ConnectButton size={'large'} />
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
            Copyright (c) 2023 Communa.
          </p>
        </section>
      </main>
    </HomePageWrapper >
  );
};

export default Home;
