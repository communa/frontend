import {useContext, useEffect, useState} from 'react';
import Script from 'next/script';
import type {AppProps} from 'next/app';
import {
  RainbowKitProvider,
  darkTheme,
  getDefaultWallets,
  connectorsForWallets,
  RainbowKitAuthenticationProvider,
  createAuthenticationAdapter,
} from '@rainbow-me/rainbowkit';

import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import {configureChains, createClient, useAccount, WagmiConfig} from 'wagmi';
import {polygon} from 'wagmi/chains';
import {publicProvider} from 'wagmi/providers/public';

import {AuthContext, AuthProvider, useAuth} from 'src/contexts/Auth';
import {withProviders} from 'src/lib/Hooks';
import {NotificationsProvider} from 'src/contexts/Notifications';
import {TooltipProvider} from 'src/contexts/Tooltip';
import {Notifications} from 'src/lib/Notifications';
import {APIProvider} from 'src/contexts/Api';
import {MainInterfaceWrapper} from 'src/lib/Wrappers';
import {API_HOST, APP_NAME, WALLET_CONNECT_PROJECT_ID} from 'src/config/consts';
import {request} from 'src/Utils';

import 'src/assets/global.scss';
import '@rainbow-me/rainbowkit/styles.css';

const {chains, provider} = configureChains(
  [
    polygon,
  ],
  [publicProvider()]
);

const {wallets} = getDefaultWallets({
  appName: APP_NAME,
  projectId: WALLET_CONNECT_PROJECT_ID,
  chains,
});

const appInfo = {
  appName: APP_NAME,
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [
      argentWallet({
        chains,
        projectId: WALLET_CONNECT_PROJECT_ID,
      }),
      trustWallet({
        chains,
        projectId: WALLET_CONNECT_PROJECT_ID,
      }),
      ledgerWallet({
        chains,
        projectId: WALLET_CONNECT_PROJECT_ID,
      }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
});

function App({Component, pageProps}: AppProps) {
  const {authStatus, connect, userLogOut, userLogIn} = useContext(AuthContext);
  const {address} = useAccount();
  const {jwt, isJwtExpired} = useAuth();

  const authenticationAdapter = createAuthenticationAdapter({
    getNonce: async () => {
      const nonce = await request({
        url: `${API_HOST}/api/auth/nonce`,
        method: 'POST',
        data: {
          address,
        }
      });

      return nonce.data;
    },
    createMessage: ({nonce}) => {
      return nonce;
    },
    getMessageBody: ({message}) => {
      return message;
    },
    verify: async ({message, signature}) => {
      const res = await request({
        url: `${API_HOST}/api/auth/web3`,
        method: 'POST',
        data: {
          address,
          signature,
        }
      });
      const tokens = {
        access: res.headers.authorization,
        refresh: res.headers['refresh-token'],
      }

      userLogIn(address as string, tokens);

      return Promise.resolve(true);
    },
    signOut: async () => userLogOut(),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    connect('unauthenticated');

    (async () => {
      if (jwt) {
        const res = await request({
          url: `${API_HOST}/api/auth/status`,
          method: 'GET',
          headers: {
            Authorization: jwt.access
          },
        });

        console.log('auth.user', res.data)

        if (!res.data) {
          userLogOut();
        } else {
          localStorage.setItem('user', JSON.stringify(res.data));
          connect('authenticated');
        }
      }

      if (isJwtExpired && jwt) {
        const res = await request({
          url: `${API_HOST}/api/auth/refresh`,
          method: 'POST',
          data: {
            refreshToken: jwt.refresh,
          }
        });

        localStorage.setItem('JWT', JSON.stringify(res.data));
      }
    })();
  }, []);

  return (
    <MainInterfaceWrapper>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitAuthenticationProvider
          adapter={authenticationAdapter}
          status={authStatus}
        >
          <RainbowKitProvider
            coolMode
            appInfo={appInfo}
            chains={chains}
            theme={darkTheme({
              accentColor: '#1360d3',
              accentColorForeground: 'white',
              fontStack: 'system',
              overlayBlur: 'small',
            })}
          >
            <Notifications />
            <Component {...pageProps} />

            <Script
              src="https://www.googletagmanager.com/gtag/js?id=G-59QX73S7GV"
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-59QX73S7GV');
            `}
            </Script>

          </RainbowKitProvider>
        </RainbowKitAuthenticationProvider>
      </WagmiConfig>
    </MainInterfaceWrapper>
  );
}

export default withProviders(
  NotificationsProvider,
  AuthProvider,
  APIProvider,
  TooltipProvider
)(App);
