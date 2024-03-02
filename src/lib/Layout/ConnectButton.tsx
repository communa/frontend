import { ConnectButton as CB } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import MetaMaskFox from 'src/assets/MetaMask_Fox.svg';
import { ConnectButtonWrapper } from './Wrappers';

interface ConnectButtonProps extends React.HTMLAttributes<HTMLElement> {
  size: string;
}

export const ConnectButton = ({ size }: ConnectButtonProps) => {
  return (
    <ConnectButtonWrapper className={size}>
      <CB.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          // Note: If your app doesn't use authentication, you
          // can remove all 'authenticationStatus' checks
          const ready = mounted && authenticationStatus !== 'loading';
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus ||
              authenticationStatus === 'authenticated');

          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                'style': {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <button onClick={openConnectModal} type="button">
                      <Image
                        priority
                        src={MetaMaskFox}
                        alt="MetaMask Logo"
                        width={35}
                        height={35}
                      />
                      Connect Wallet
                    </button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <button onClick={openChainModal} type="button">
                      Wrong network
                    </button>
                  );
                }

                return (
                  <div style={{ display: 'flex', gap: 12 }}>
                    <button onClick={openAccountModal} type="button">
                      {account.displayName}
                      {account.displayBalance
                        ? ` (${account.displayBalance})`
                        : ''}
                    </button>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </CB.Custom>
    </ConnectButtonWrapper>
  );
};