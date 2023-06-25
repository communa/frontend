import Script from 'next/script';
import type { AppProps } from 'next/app';
import {
  RainbowKitProvider,
  darkTheme,
  getDefaultWallets,
  connectorsForWallets,
  RainbowKitAuthenticationProvider,
  createAuthenticationAdapter,
} from '@rainbow-me/rainbowkit';

import { useContext, useEffect } from 'react';
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createClient, useAccount, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, goerli } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { AuthContext, isJWTexpired, AuthProvider, getJwtLocalStorage } from 'src/contexts/Auth';
import { withProviders } from 'src/lib/Hooks';
import { NotificationsProvider, useNotifications } from 'src/contexts/Notifications';
import { TooltipProvider } from 'src/contexts/Tooltip';
import { Notifications } from 'src/lib/Notifications';
import { APIProvider } from 'src/contexts/Api';
import { MainInterfaceWrapper } from 'src/lib/Wrappers';
import { API_HOST, APP_NAME } from 'src/config/consts';

import 'src/assets/global.css';
import '@rainbow-me/rainbowkit/styles.css';
import { request } from 'src/Utils';

const { chains, provider, webSocketProvider } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli] : []),
  ],
  [publicProvider()]
);

const { wallets } = getDefaultWallets({
  appName: APP_NAME,
  chains,
});

const demoAppInfo = {
  appName: APP_NAME,
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [
      argentWallet({ chains }),
      trustWallet({ chains }),
      ledgerWallet({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function App({ Component, pageProps }: AppProps) {
  const { authStatus, connect } = useContext(AuthContext);
  const { addNotification } = useNotifications();
  const { address } = useAccount();

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
    createMessage: ({ nonce }) => {
      return nonce;
    },
    getMessageBody: ({ message }) => {
      return message;
    },
    verify: async ({ message, signature }) => {
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

      localStorage.setItem('JWT', JSON.stringify(tokens));
      connect('authenticated');

      addNotification({
        title: 'welcome to communa',
        subtitle: '',
      });

      return Promise.resolve(true);
    },
    signOut: async () => {
      localStorage.removeItem('JWT');
      localStorage.removeItem('wagmi.connected');
      localStorage.removeItem('wagmi.store');
      localStorage.removeItem('wagmi.wallet');
      localStorage.removeItem('wagmi.metaMask.shimDisconnect');
      localStorage.removeItem('wagmi.cache');
      connect('unauthenticated');
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const jwt = getJwtLocalStorage();
    const isExpired = isJWTexpired();

    if (jwt) {
      connect('authenticated');
    }

    if (isExpired && jwt) {
      request({
        url: `${API_HOST}/api/auth/refresh`,
        method: 'POST',
        data: {
          refreshToken: jwt.refresh,
        }
      }).then((res) => {
        localStorage.setItem('JWT', JSON.stringify(res.data.authRefresh));
      });
    }
  }, [connect]);

  return (
    <MainInterfaceWrapper>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitAuthenticationProvider
          adapter={authenticationAdapter}
          status={authStatus}
        >
          <RainbowKitProvider
            coolMode
            appInfo={demoAppInfo}
            chains={chains}
            theme={darkTheme({
              accentColor: '#1337ff',
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
