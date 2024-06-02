import {
  toUserFriendlyAddress,
  useTonConnectUI,
  useTonWallet,
} from '@tonconnect/ui-react';
import {useCallback, useContext, useEffect, useState} from 'react';
import {Button} from '@telegram-apps/telegram-ui';

import {API_HOST, TELEGRAM_BOT_ID} from 'src/config/consts';
import {request} from 'src/Utils';
import {AuthContext} from 'src/contexts/Auth';

// https://docs.ton.org/develop/dapps/ton-connect/react

export const ConnectButtonTonTelegram = () => {
  const [tonConnectUI] = useTonConnectUI();
  const {userLogIn} = useContext(AuthContext);
  const wallet = useTonWallet();
  const [nonce, setNonce] = useState('');

  const recreateProofPayload = useCallback(async () => {
    if (tonConnectUI) {
      tonConnectUI.uiOptions = {
        actionsConfiguration: {
          twaReturnUrl: TELEGRAM_BOT_ID,
        },
      };
  
      tonConnectUI.setConnectRequestParameters({
        state: 'loading',
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
    }
  }, [tonConnectUI]);

  if (!nonce) {
    recreateProofPayload();
  }

  useEffect(
    () =>
      tonConnectUI.onStatusChange(async w => {
        if (w?.connectItems?.tonProof && 'proof' in w?.connectItems.tonProof) {
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

          userLogIn(w.account.address, tokens);
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

  return (
    <Button id="authTon" mode="filled" onClick={onLogin}>
      Connect Wallet
    </Button>
  );
};
