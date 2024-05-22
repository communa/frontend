import {toUserFriendlyAddress, useTonConnectUI, useTonWallet} from '@tonconnect/ui-react';
import {useCallback, useContext, useEffect, useState} from 'react';
import Image from 'next/image';

import {API_HOST} from 'src/config/consts';
import {request} from 'src/Utils';
import {ConnectButtonWrapper} from 'src/lib/Layout/Wrappers';
import {AuthContext} from 'src/contexts/Auth';

import TonLogo from 'src/assets/toncoin-ton-logo.svg';

// https://docs.ton.org/develop/dapps/ton-connect/react

export const ConnectButtonTon = (
  { 
    twaReturnUrl, 
    label
  }: { 
    twaReturnUrl?: `${string}://${string}`,
    label?: string
  }
) => {
  const [tonConnectUI] = useTonConnectUI();
  const {userLogIn} = useContext(AuthContext);
  const wallet = useTonWallet();
  const [nonce, setNonce] = useState('');

  const recreateProofPayload = useCallback(async () => {
    if (twaReturnUrl) {
      tonConnectUI.uiOptions = {
        actionsConfiguration: {
          twaReturnUrl,
        }
      } 
    }

    tonConnectUI.setConnectRequestParameters({ 
      state: 'loading' 
    });
    
    const res = await request({
      url: `${API_HOST}/api/auth/nonce`,
      method: 'POST',
      data: {
        // address: '',
      },
    });
    tonConnectUI.setConnectRequestParameters({
      state: 'ready',
      value: {tonProof: res.data},
    });
    setNonce(res.data);
	}, [tonConnectUI])

  if (!nonce) {
    recreateProofPayload();
  }

  useEffect(() => tonConnectUI.onStatusChange(async w => {
    if (
      w?.connectItems?.tonProof &&
      'proof' in w?.connectItems.tonProof
    ) {
      const res = await request({
        url: `${API_HOST}/api/auth/ton`,
        method: 'POST',
        data: {
          address: toUserFriendlyAddress(w.account.address),
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

      if (twaReturnUrl) {
        userLogIn(w.account.address, tokens);  
      } else {
        userLogIn(w.account.address, tokens, '/time');        
      }

    }
  }),[tonConnectUI, wallet, nonce]);

  const onLogin = () => {
    if (wallet) {
      tonConnectUI.disconnect();
    }

    tonConnectUI.openModal();
  };

  return (
    <ConnectButtonWrapper>
      <button onClick={onLogin} className="ton">
        <Image
          priority
          src={TonLogo}
          alt="TON Network Logo"
          width={35}
          height={35}
        />
        {label}
      </button>
    </ConnectButtonWrapper>
  );
};
