import {
  toUserFriendlyAddress,
  useTonConnectUI,
  useTonWallet,
} from '@tonconnect/ui-react';
import {useCallback, useContext, useEffect, useState} from 'react';
import Image from 'next/image';
import PaymentIcon from '@mui/icons-material/Payment';

import {API_HOST} from 'src/config/consts';
import {request} from 'src/Utils';
import {ConnectButtonWrapper} from 'src/lib/Layout/Wrappers';
import {AuthContext} from 'src/contexts/Auth';

import TonLogo from 'src/assets/toncoin-ton-logo.svg';

// https://docs.ton.org/develop/dapps/ton-connect/react

export const ConnectButtonTon = ({paymentUrl}: {paymentUrl?: string}) => {
  const [tonConnectUI] = useTonConnectUI();
  const {userLogIn} = useContext(AuthContext);
  const wallet = useTonWallet();
  const [nonce, setNonce] = useState('');

  const recreateProofPayload = useCallback(async () => {
    tonConnectUI?.setConnectRequestParameters({
      state: 'loading',
    });

    const res = await request({
      url: `${API_HOST}/api/auth/nonce`,
      method: 'POST',
      data: {
        // address: '',
      },
    });
    tonConnectUI?.setConnectRequestParameters({
      state: 'ready',
      value: {tonProof: res.data},
    });
    setNonce(res.data);
  }, [tonConnectUI]);

  if (!nonce) {
    recreateProofPayload();
  }

  useEffect(
    () =>
      tonConnectUI.onStatusChange(async w => {
        if (w?.connectItems?.tonProof && 'proof' in w?.connectItems.tonProof) {
          const addressFriendly = toUserFriendlyAddress(w.account.address);
          
          const res = await request({
            url: `${API_HOST}/api/auth/ton`,
            method: 'POST',
            data: {
              address: addressFriendly,
              network: w.account.chain,
              public_key: w.account.publicKey,
              proof: {
                ...w.connectItems.tonProof.proof,
                state_init: w.account.walletStateInit,
              },
            },
          });

          const tokens = {
            access: res.headers.authorization,
            refresh: res.headers['refresh-token'],
          };
          
          const redirectTo = paymentUrl ? paymentUrl : `/user/${addressFriendly}`;

          userLogIn(w.account.address, tokens, redirectTo);
        }
      }),
    [tonConnectUI, wallet, nonce]
  );

  const onLogin = () => {
    if (wallet) {
      tonConnectUI.disconnect();
    }

    tonConnectUI.openModal();
  };


  if (paymentUrl) {
    return (
      <button className="apply small pay" onClick={onLogin} >
        <PaymentIcon />
        Pay Now
      </button>
    )
  }

  return (
    <ConnectButtonWrapper>
      <button onClick={onLogin} className="ton">
        <Image
          priority
          src={TonLogo}
          alt="TON Network Logo"
          width={35}
          height={35}
        />{' '}
        Sign In with TON
      </button>
    </ConnectButtonWrapper>
  );
};
