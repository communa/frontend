import Script from 'next/script';
import type { AppProps } from 'next/app';
import {
  RainbowKitProvider,
  darkTheme,
  getDefaultWallets,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, goerli } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

import { AuthProvider } from 'src/contexts/Auth';
import { withProviders } from 'src/lib/Hooks';
import { NotificationsProvider } from 'src/contexts/Notifications';
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

function App({ Component, pageProps }: AppProps) {
  return (
    <MainInterfaceWrapper>
      <WagmiConfig client={wagmiClient}>
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
