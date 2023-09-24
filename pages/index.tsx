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
// import MetaMaskFox from 'src/assets/MetaMask_Fox.svg';
import GitHubIcon from '@mui/icons-material/GitHub';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import Image from 'next/image';


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
              Help
            </NextLink>
          </p>
          {/* <GitHubIcon /> */}
          {/* <Image
            priority
            src={MetaMaskFox}
            alt="Follow us on Twitter"
          /> */}
          {/* <MetaMaskFox /> */}
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
              <div className="hHuuya">Reputation</div>
            </div>
            <div className="tag-blue-inner">
              <div className="hHuuya">Payments</div>
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
              <ConnectButton label="Connect Wallet" />
            ) : (
              <Button variant="contained" disabled>
                Download TimeTracker
              </Button>
            )}
          </div>
          <p className="jobsTotal">
            <span>1000+</span> jobs available
          </p>
        </section>
        <section id="howitworks">
          <div className="placeholder __top" />
          <h3>
            Trusted by 250+ developers
          </h3>
          <p>
            “LocalCan has been an absolute game-changer for my app development process! As a developer, I used to dread dealing with HTTPS certificates, port numbers, and editing /etc/hosts just to test my apps locally.”
          </p>

          <h2>How it works</h2>
          <h3>
            Forget editing /etc/hosts or typing 192.168.0.12!
            Your Wi-Fi
          </h3>
          <div className="placeholder" />
          <p>
            Publish e.g. www.myapp.local domain from your MacBook,
            and it will be visible to all devices in your local network ⟶ pointing to your MacBook.
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
          <p className="subtext">Web3 freelancing marketplace</p>
          <div className="action">
            <NextLink href="/activity" passHref>
              <Button variant="outlined" LinkComponent={Link}>
                Browse Jobs
              </Button>
            </NextLink>
            {authStatus === 'unauthenticated' ? (
              <ConnectButton label="Connect Wallet" />
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
            <NextLink href="https://github.com/communa">
              GitHub
            </NextLink>
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
