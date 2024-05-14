import Image from 'next/image';
import {ConnectButton as CB} from '@rainbow-me/rainbowkit';
import LogoutIcon from '@mui/icons-material/Logout';

import MetaMaskFox from 'src/assets/MetaMask_Fox.svg';
import {ConnectButtonWrapper} from './Wrappers';

export const ConnectButtonEth = () => {
  return (
    <ConnectButtonWrapper>
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
                    <button
                      id="authLogin"
                      onClick={openConnectModal}
                      type="button"
                    >
                      <Image
                        priority
                        src={MetaMaskFox}
                        alt="MetaMask Logo"
                        width={35}
                        height={35}
                      />
                      Log In with Ethereum
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
                  <div style={{display: 'flex', gap: 12}}>
                    <button onClick={openAccountModal} type="button" className="small">
                      <LogoutIcon /> Disconnect {account.displayName}
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