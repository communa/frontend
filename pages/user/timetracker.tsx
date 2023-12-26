import Head from 'next/head';
import {useAccount} from 'wagmi';
import {useContext, useEffect, useState} from 'react';

import {API_HOST, APP_NAME} from 'src/config/consts';
import {AuthTimeTrackerWrapper, JobsPageWrapper} from 'src/lib/Wrappers';
import {AuthContext, getJwtLocalStorage} from 'src/contexts/Auth';
import {ConnectButton} from 'src/lib/Layout/ConnectButton';
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
  const [error, setErrror] = useState('');
  const {addNotification} = useNotifications();
  const nonce = router.query.nonce;

  const isAuthenticated = authStatus === 'authenticated' && address;

  useEffect(() => {
    if (api.error) {
      setErrror(api.error.response.data.message);
    }
  }, [api]);

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

    await request({
      url: `${API_HOST}/api/timeTracker/${nonce}/connect`,
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

  if (error) {
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
            <p>{error}</p>
            <p>
              <br />
              <picture>
                <img
                  src={HowItWorksImage.src}
                  alt="Work Process"
                  width={600}
                />
              </picture>
            </p>
          </article>
        </main>
      </JobsPageWrapper>
    );
  }

  if (isAuthenticated) {
    return (
      <AuthTimeTrackerWrapper>
        <Head>
          <title>TimeTracker - {APP_NAME}</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="robots" content="index, follow" />
          <link rel=" icon" href="/logo-testnet.png" />
        </Head>
        <main>
          <h1>TimeTracker</h1><br />
          Address: {address}<br />
          Nonce: {nonce}<br />

          <button onClick={() => onConnect()}>
            Approve Log In
          </button>
        </main>
      </AuthTimeTrackerWrapper >
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
        <h1>TimeTracker</h1><br />
        Address: {address}<br />
        Nonce: {nonce}<br />

        <ConnectButton size={'small'} />
      </main>
    </AuthTimeTrackerWrapper >
  );
};

export default AuthTimeTracker;