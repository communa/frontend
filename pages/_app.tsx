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
import { AuthContext, isJWTexpired, AuthProvider } from 'src/contexts/Auth';
import { withProviders } from 'src/lib/Hooks';
import { NotificationsProvider, useNotifications } from 'src/contexts/Notifications';
import { TooltipProvider } from 'src/contexts/Tooltip';
import { Notifications } from 'src/lib/Notifications';
import { APIProvider } from 'src/contexts/Api';
import { MainInterfaceWrapper } from 'src/lib/Wrappers';
import { APP_NAME } from 'src/config/consts';

import 'src/assets/global.css';
import '@rainbow-me/rainbowkit/styles.css';

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

const [getNonce] = [0];
const [authRefresh] = [0];
const [getJWT] = [0];

function App({ Component, pageProps }: AppProps) {
  const { authStatus, connect } = useContext(AuthContext);
  const { addNotification } = useNotifications();
  const { address } = useAccount();

  const authenticationAdapter = createAuthenticationAdapter({
    getNonce: async () => {
      const res = await getNonce({
        variables: {
          walletAddress: address,
        },
      });
      const message = res.data.authWalletRequest.message.trim();

      return new Promise((resolve) => {
        resolve(message);
      });
    },
    createMessage: ({ nonce }) => {
      return nonce;
    },
    getMessageBody: ({ message }) => {
      return message;
    },
    verify: async ({ message, signature }) => {
      const res = await getJWT({
        variables: {
          walletAddress: address,
          signedMessage: signature,
        },
      });

      localStorage.setItem('JWT', JSON.stringify(res.data.authWalletLogin));
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
    const jwt = getJWT();
    const isExpired = isJWTexpired();

    if (isExpired && jwt) {
      authRefresh({
        variables: {
          refreshToken: jwt.refresh,
        },
      }).then((res) => {
        console.log(res.data.authRefresh);
        localStorage.setItem('JWT', JSON.stringify(res.data.authRefresh));
      });
    }
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
            appInfo={demoAppInfo}
            chains={chains}
            theme={darkTheme({
              accentColor: '#1337ff',
              accentColorForeground: 'white',
              // borderRadius: 'small',
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
