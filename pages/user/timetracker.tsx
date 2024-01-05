import Head from 'next/head';
import {useAccount} from 'wagmi';
import {useContext, useEffect, useState} from 'react';

import {API_HOST, APP_NAME} from 'src/config/consts';
import {JobsPageWrapper} from 'src/lib/Wrappers';
import {AuthContext, getJwtLocalStorage, getTimeTrackerNonceLocalStorage} from 'src/contexts/Auth';
import {useRouter} from 'next/router';
import {APIContext} from 'src/contexts/Api';
import {request} from 'src/Utils';
import {useNotifications} from 'src/contexts/Notifications';
import HeaderJobs from 'src/lib/Layout/HeaderJobs';
import HowItWorksImage from 'src/assets/Illustration-6.png';

const AuthTimeTracker = () => {
  const {address} = useAccount();
  const {authStatus} = useContext(AuthContext);
  const router = useRouter();
  const api = useContext(APIContext);
  const [error, setErrror] = useState<any>();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const {addNotification} = useNotifications();

  const nonce = router.query.nonce;
  const nonceStore = getTimeTrackerNonceLocalStorage(nonce as string);
  const isAuthenticated = authStatus === 'authenticated' && address;

  useEffect(() => {
    if (api.error) {
      setErrror(api.error.response.data);
    }
  }, [api]);

  useEffect(() => {
    if (nonceStore) {
      setIsConnected(true);
    }
  }, [nonceStore]);

  useEffect(() => {
    if (!nonce) {
      return;
    }

    const jwt = getJwtLocalStorage();

    api.query({
      url: `/api/auth/timetracker/${nonce}`,
      method: 'GET',
      headers: {
        Authorization: jwt?.access
      }
    });
  }, [nonce]);

  const onConnect = async () => {
    const jwt = getJwtLocalStorage();

    setIsConnected(true);
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
  };

  if (['init', 'progress'].includes(api.state)) {
    return false;
  }

  const isErrorAuthentication = error?.name === 'AuthenticationException';
  const isErrorTimeTracker = error?.name === 'TimeTrackerException';

  if (isErrorAuthentication) {
    return (
      <JobsPageWrapper>
        <Head>
          <title>TimeTracker - {APP_NAME}</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="robots" content="index, follow" />
          <link rel="icon" href="/logo-testnet.png" />
        </Head>
        <main id="userProfile">
          <HeaderJobs />
          <article>
            <h1>TimeTracker</h1>
            <p>{error.message}</p>
            <p>
              <br />
              <picture>
                <img
                  src={HowItWorksImage.src}
                  alt="Authentication Error"
                  width={600}
                />
              </picture>
            </p>
          </article>
        </main>
      </JobsPageWrapper>
    );
  }

  if (isAuthenticated && !isConnected) {
    return (
      <JobsPageWrapper>
        <Head>
          <title>TimeTracker - {APP_NAME}</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="robots" content="index, follow" />
          <link rel=" icon" href="/logo-testnet.png" />
        </Head>
        <main id="userProfile">
          <HeaderJobs />
          <article>
            <h1>TimeTracker</h1>
            Nonce: {nonce}<br />
            Status: awaiting connection<br />
            {isErrorTimeTracker && (
              <p>Error: {error.message}</p>
            )}
            <br />
            <button className='apply' onClick={() => onConnect()}>
              Connect
            </button>
          </article>
        </main>
      </JobsPageWrapper>
    );
  }

  if (isConnected) {
    return (
      <JobsPageWrapper>
        <Head>
          <title>TimeTracker - {APP_NAME}</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="robots" content="index, follow" />
          <link rel="icon" href="/logo-testnet.png" />
        </Head>
        <main id="userProfile">
          <HeaderJobs />
          <article>
            <h1>TimeTracker</h1>
            Nonce: {nonce}<br />
            Status: connected<br />
            <p>
              <br />
              <picture>
                <img
                  src={HowItWorksImage.src}
                  alt="Authentication Error"
                  width={600}
                />
              </picture>
            </p>
          </article>
        </main>
      </JobsPageWrapper>
    );
  }
};

export default AuthTimeTracker;