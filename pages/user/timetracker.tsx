import Head from 'next/head';
import {useContext, useEffect, useState} from 'react';
import {IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import NextLink from 'next/link';
import {useRouter} from 'next/router';

import {ConnectButton} from 'src/lib/Layout/ConnectButton';
import Logo from 'src/lib/Layout/Logo';
import {API_HOST, APP_NAME} from 'src/config/consts';
import {useAuth} from 'src/contexts/Auth';
import {APIContext} from 'src/contexts/Api';
import {request} from 'src/Utils';
import {useNotifications} from 'src/contexts/Notifications';
import {AuthTimeTrackerWrapper} from 'src/lib/Wrappers';

const getTimeTrackerNonceLocalStorage = (nonce: string): Boolean => {
  const data = typeof window !== "undefined"
    ? window.localStorage.getItem(`none-${nonce}`)
    : false;

  return Boolean(data);
};

const AuthTimeTracker = () => {
  const router = useRouter();
  const api = useContext(APIContext);
  const {addNotification} = useNotifications();
  const {jwt, userAddress, authStatus} = useAuth();

  const [error, setErrror] = useState<any>();
  const [state, setState] = useState<string>('disconnected');

  const nonce = router.query.nonce;
  const nonceStore = getTimeTrackerNonceLocalStorage(nonce as string);

  useEffect(() => {
    if (api.error) {
      setErrror(api.error.response.data);
    }
  }, [api]);

  useEffect(() => {
    if (nonceStore) {
      setState('init');
    }
  }, [nonceStore]);

  useEffect(() => {
    if (!nonce) {
      return;
    }

    api.query({
      url: `/api/auth/timetracker/${nonce}`,
      method: 'GET',
      headers: {
        Authorization: jwt?.access
      }
    });
  }, [nonce]);

  const connectTimeTracker = async () => {
    localStorage.setItem(`none-${nonce}`, JSON.stringify(true));

    await request({
      url: `${API_HOST}/api/auth/timeTracker/${nonce}/connect`,
      method: 'POST',
      headers: {
        Authorization: jwt?.access
      }
    });

    addNotification({
      title: 'TimeTracker connected with your wallet',
      subtitle: '',
    });

    setState('connected');
  };

  if (['init', 'progress'].includes(api.state)) {
    return false;
  }

  const isErrorAuthentication = error?.name === 'AuthenticationException';
  const isErrorTimeTracker = error?.name === 'TimeTrackerException';

  let body = null;

  if (isErrorAuthentication) {
    body = (
      <header className="middleHeader">
        <h2>TimeTracker</h2>
        <p>{error.message}</p>
      </header>
    );
  }

  if (state === 'init' || state === 'disconnected') {
    body = (
      <header className="middleHeader">
        <h2>TimeTracker</h2>
        <p>
          {isErrorTimeTracker
            ? error.message :
            'TimeTracker is awaiting to be paired with your web3 wallet'
          }
        </p>
      </header>
    );

    if (userAddress) {
      connectTimeTracker();
    }
  }

  if (state === 'connected') {
    body = (
      <header className="middleHeader">
        <h2>TimeTracker</h2>
        <p>
          Authentication is complete, you may close the window
        </p>
      </header>
    );
  }

  return (
    <AuthTimeTrackerWrapper>
      <Head>
        <title>TimeTracker - {APP_NAME}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/logo-testnet.png" />
      </Head>
      <main>
        <NextLink href={userAddress ? '/time' : '/'} passHref>
          <IconButton className="close" size='large'>
            <CloseIcon />
          </IconButton>
        </NextLink>
        <Logo />
        <section>
          {body}
          {!userAddress && (
            <ConnectButton size="largeWhite" />
          )}
        </section>
        <p className="note">
          Login state: {state}<br />
          Wallet state: {authStatus}<br />
          Address: {userAddress}<br />
          Nonce: {nonce}<br />
          {error && (
            <>
              Error: {error?.message}<br />
            </>
          )}
        </p>
      </main>
    </AuthTimeTrackerWrapper >
  )
};

export default AuthTimeTracker;