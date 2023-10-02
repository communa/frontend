import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';
import { Button, Link, Tooltip } from '@mui/material';
import NextLink from 'next/link';
import GitHubIcon from '@mui/icons-material/GitHub';

import { HomePageWrapper } from 'src/lib/Wrappers';
import { APP_NAME } from 'src/config/consts';
import Header from 'src/lib/Layout/Logo';
import { AuthContext } from 'src/contexts/Auth';
import ContractAirdrop from 'src/lib/Contract/Airdrop';
import { ConnectButton } from 'src/lib/Layout/ConnectButton';
import { Faq } from 'src/lib/Layout/Faq';

import Mask1Image from 'src/assets/mask-1.svg';
import Mask2Image from 'src/assets/mask-2.svg';
import Mask3Image from 'src/assets/mask-3.svg';
import image1 from 'src/assets/index-8.jpg';
import image2 from 'src/assets/index-9.jpg';
import image3 from 'src/assets/index-11.jpg';
import timetrackerImage from 'src/assets/timetracker.jpeg';

import ethereumImage from 'src/assets/providers/ethereum-eth-logo.svg';
import gnosisImage from 'src/assets/providers/gnosis-gno-gno-logo.svg';
import polygonImage from 'src/assets/providers/polygon-matic-logo.svg';
import usdtImage from 'src/assets/providers/tether-usdt-logo.svg';
import usdcImage from 'src/assets/providers/usd-coin-usdc-logo.svg';
import daiImage from 'src/assets/providers/multi-collateral-dai-dai-logo.svg';


const Home = () => {
  const { authStatus } = useContext(AuthContext);
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const updatePosition = () => setScrollTop(window.pageYOffset);
    
    window.addEventListener("scroll", updatePosition);
    updatePosition();

    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

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
            {scrollTop < 800 && (
              <div className="tags">
                <div
                  className="tag-orange-inner"
                  style={{
                    filter: `blur(${scrollTop / 10}px)`,
                    transform: `translate(${-scrollTop * 5 / 2}px, ${-scrollTop * 3 / 2}px) scale(${1 + scrollTop / 50}, ${1 + scrollTop / 50}) rotate(${20 + (scrollTop / 3)}deg)`,
                  }}
                >
                  <div className="hHuuya">Censorship resiliant</div>
                </div>
                <div
                  className="tag-green-inner"
                  style={{
                    transform: `translate(${scrollTop * 5 / 2}px, ${-scrollTop * 3 / 2}px) scale(${1 + scrollTop / 50}, ${1 + scrollTop / 50}) rotate(${-20 - (scrollTop / 5)}deg)`,
                    filter: `blur(${scrollTop / 10}px)`,
                  }}
                >
                  <div className="hHuuya">Transparency</div>
                </div>
                <div
                  className="tag-purple-inner"
                  style={{
                    filter: `blur(${scrollTop / 10}px)`,
                    transform: `translate(${scrollTop / 3 * 5}px, ${scrollTop / 2 * 3}px) scale(${1 + scrollTop / 50}, ${1 + scrollTop / 50}) rotate(${20 + (scrollTop / 3)}deg)`,
                  }}
                >
                  <div className="hHuuya">Reputation</div>
                </div>
                <div
                  className="tag-blue-inner"
                  style={{
                    transform: `translate(${-scrollTop / 3 * 5}px, ${scrollTop / 2 * 3}px) scale(${1 + scrollTop / 50}, ${1 + scrollTop / 50}) rotate(${-20 - (scrollTop / 5)}deg)`,
                    filter: `blur(${scrollTop / 10}px)`,
                  }}
                >
                  <div className="hHuuya">Stablecoins</div>
                </div>
              </div>
            )}
            <h1>Web3 marketplace to connect businesses<br />with freelancers</h1>
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
            <div className="left one">
              <picture className="bg">
                <ul>
                  <li>Development &amp; IT</li>
                  <li style={{
                    marginLeft: 30,
                  }}>
                    Design &amp; Creative
                  </li>
                  <li style={{
                    marginLeft: 60,
                  }}>
                    Sales &amp; Marketing
                  </li>
                </ul>
                <img
                  src={image1.src}
                  alt="Client post a job"
                  width={450}
                />
              </picture>
              <picture>
                <img
                  src={Mask1Image.src}
                  alt="Client post a job"
                  width={450}
                />
              </picture>
              <div className="text">
                <h3>
                  Remote Jobs
                </h3>
                <p>
                  We are building Communa with a commitment to transparency and fairness, bringing a suite of tools and resources to help both clients and freelancers manage and truly own their work.
                  Advances in technology have made it possible to work remotely and connect workers and clients worldwide.
                </p>
              </div>
            </div>
            <div className="right two">
              <div className="text">
                <h3>
                  Time Tracking
                </h3>
                <p>
                  Our desktop app is designed to help freelancers track time spent on projects throughout the day.
                  The application operates in the background, automatically recording the time spent with the total number of hours worked always displayed in the system tray.
                </p>
              </div>
              <picture className="bg">
                <picture className="timetracking">
                  <img
                    src={timetrackerImage.src}
                    alt="Time Tracking"
                    width={200}
                    height={130}
                  />
                </picture>
                <img
                  src={image2.src}
                  alt="Client post a job"
                  width={450}
                />
              </picture>
              <picture>
                <img
                  src={Mask2Image.src}
                  alt="Freelancer gets a job"
                  width={450}
                />
              </picture>
            </div>
            <div className="left three">
              <picture className="bg">
                <img
                  src={image3.src}
                  alt="Client post a job"
                  width={448}
                />
              </picture>
              <picture>
                <img
                  src={Mask3Image.src}
                  alt="Freelancer gets a job"
                  width={450}
                />
                <div className="dot dot-info dot-3 levitate delay-2">
                  <picture>
                    <img
                      src={daiImage.src}
                      alt="DAI logo"
                    />
                  </picture>
                </div>
                <div className="dot dot-success dot-5 levitate delay-3">
                  <picture>
                    <img
                      src={usdcImage.src}
                      alt="USDC logo"
                    />
                  </picture>
                </div>
                <div className="dot dot-primary dot-6 levitate">
                  <picture>
                    <img
                      src={usdtImage.src}
                      alt="DAI logo"
                      width={40}
                    />
                  </picture>
                </div>
              </picture>
              <div className="text">
                <h3>
                  Payments in USDT
                </h3>
                <p>
                  Fast and reliable payments are crucial for contractors located across the globe with 100+ different currencies circulating.
                  Blockchain networks and stablecoins like USDT and USDC offer the needed global accessibility both for businesses and freelancers, which is also faster, cheaper, and more independent than usual payments.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="token">
          <div className="tokenContainer">
            <div className="left">
              <h2>Token Airdrop</h2>
              <h5>
                Receive 100 utility tokens by filling in in you Communa profile. FREE.
              </h5><br />
              <p>
                Communa charges a 5% transaction fee on USDT payments, while sedning with COMM token comes with a 0% fee.
                Plus, gas fees to process your transactions which vary.
              </p>
            </div>
            <div className="right">
              <ContractAirdrop />
            </div>
          </div>
        </section>
        <section id="faq">
          <div className="providers">
            <p>
              Although some time in the future Communa is to be technology agnostic
            </p>
            <div className="gallery">
              <a href="https://ethereum.org/" target="_blank" rel="noreferrer">
                <picture>
                  <img
                    src={ethereumImage.src}
                    alt="Ethereum logo"
                  />
                </picture>
              </a>
              <a href="https://tether.to" target="_blank" rel="noreferrer">
                <picture>
                  <img
                    src={usdtImage.src}
                    alt="USDT logo"
                  />
                </picture>
              </a>
              <a href="https://polygon.technology" target="_blank" rel="noreferrer">
                <picture>
                  <img
                    src={polygonImage.src}
                    alt="Polygon logo"
                  />
                </picture>
              </a>
              <a href="https://www.circle.com/en/usdc" target="_blank" rel="noreferrer">
                <picture>
                  <img
                    src={usdcImage.src}
                    alt="USDC logo"
                  />
                </picture>
              </a>
              <a href="https://www.gnosis.io" target="_blank" rel="noreferrer">
                <picture>
                  <img
                    src={gnosisImage.src}
                    alt="Gnosis logo"
                  />
                </picture>
              </a>
              <a href="https://makerdao.com" target="_blank" rel="noreferrer">
                <picture>
                  <img
                    src={daiImage.src}
                    alt="DAI logo"
                  />
                </picture>
              </a>
            </div>
          </div>
          <h2>FAQ</h2>
          <Faq />
          <Header />
          <p className="subtext">
            Web3 freelance marketplace
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
          <a href="https://github.com/communa" target="_blank" rel="noreferrer">
            <GitHubIcon />
          </a>
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
