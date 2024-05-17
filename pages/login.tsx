import Head from 'next/head';
import {IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import NextLink from 'next/link';

import {LoginPageWrapper} from 'src/lib/Wrappers';
import {APP_NAME} from 'src/config/consts';
import Logo from 'src/lib/Layout/Logo';
import {ConnectButtonEth} from 'src/lib/Layout/ConnectButtonEth';
import {ConnectButtonTon} from 'src/lib/Layout/ConnectButtonTon';
import {useAuth} from 'src/contexts/Auth';

const Login = () => {
  const {userAddress} = useAuth();

  return (
    <LoginPageWrapper>
      <Head>
        <title>Welcome to Communa - {APP_NAME}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="index, follow" />
        <meta name="description" content={APP_NAME} />
        <link rel="icon" href="/logo.png" />
      </Head>
      <main>
        <NextLink href="/" passHref>
          <IconButton className="close" size="large">
            <CloseIcon />
          </IconButton>
        </NextLink>
        <Logo />
        <section>
          <header className="middleHeader __white">
            <h2>Welcome to Communa</h2>
            <p>
              Join the future of freelancing with authentication powered by
              Ethereum and TON.
              <br />
              Say goodbye to passwords and hello to Web3 experiences!
              <a href="https://communa.network/help" target="_blank">
                What is Web3 Wallet?
              </a>
            </p>
          </header>
          {userAddress && (
            <p className="connected">
              Connected with: <br />
              {userAddress}
            </p>
          )}
          {!userAddress && (
            <ul>
              <li>
                <ConnectButtonEth />
              </li>
              <li>
                <ConnectButtonTon />
              </li>
            </ul>
          )}
        </section>
        <p className="note">
          <b>Ethereum wallets</b>: WalletConnect, Metamask, TrustWallet,
          Coinbase Wallet, Atomic Wallet, Exodus Wallet, Exodus Wallet, Edge
          Wallet, Trezor Wallet
          <br />
          <b>TON wallets</b>: Telegram Wallet, Tonkeeper, MyTonWallet, OpenMask,
          TonHub, DeWallet, XTONWallet, TON Wallet
          <br />
        </p>
      </main>
    </LoginPageWrapper>
  );
};

export default Login;
