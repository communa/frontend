import {useCallback, useContext, useEffect, useState} from 'react';
import {toUserFriendlyAddress, useTonAddress, useTonConnectUI, useTonWallet} from '@tonconnect/ui-react';
import { useInterval } from 'usehooks-ts';

import {buildTransactionTon, request} from 'src/Utils';
import {API_HOST, TELEGRAM_BOT_ID} from 'src/config/consts';
import {IUser} from 'src/interface/IUser';
import {IUserUnsafe} from 'src/interface/IUserUnsafe';
import {TelegramWelcome} from 'src/lib/Layout/telegram/TelegramWelcome';
import {TelegramProfileEdit} from 'src/lib/Layout/telegram/TelegramProfileEdit';
import {TelegramProfileMy} from 'src/lib/Layout/telegram/TelegramProfileMy';
import {AuthContext, useAuth} from 'src/contexts/Auth';
import {TelegramSeller} from 'src/lib/Layout/telegram/TelegramSeller';
import {TelegramLoading} from 'src/lib/Layout/telegram/TelegramLoading';
import {TelegramAbout} from 'src/lib/Layout/telegram/TelegramAbout';

declare global {
  interface Window {
    Telegram: any;
  }
}

const Telegram = () => {
  const [tonConnectUI] = useTonConnectUI();
  const tonAddress = useTonAddress();
  const {userAddress, userLogOut} = useAuth();
  const [timer, setTimer] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [seller, setSeller] = useState<IUser|null>(null);
  const [user, setUser] = useState<IUser|null>(null);
  const [screen, setScreen] = useState<string>('profile');
  const [isPlaying, setPlaying] = useState<boolean| null>(true);
  const [userUnsafe, setUserUnsafe] = useState<IUserUnsafe|null>(null);

  const {userLogIn} = useContext(AuthContext);
  const wallet = useTonWallet();
  const [nonce, setNonce] = useState('');

  let WebApp: any = null;
  let transaction: any = null;

  useInterval(() => {
    setTimer((new Date()).getMilliseconds());
  }, isPlaying ? 1000 : null);

  useEffect(() => {
    document.body.classList.add('miniApp');
    document.body.classList.remove('miniAppEdit');
  }, [screen]);

  useEffect(() => {
    if (window !== undefined) {
      WebApp = window?.Telegram?.WebApp;
  
      if (WebApp) {
        setUserUnsafe(WebApp.initDataUnsafe.user);

        console.log('>>>>', userUnsafe, WebApp.initDataUnsafe.user);

        setPlaying(null);
        WebApp.ready();
        WebApp.expand();
        
        const address = WebApp.initDataUnsafe.start_param;

        if (!address && !tonAddress) {
          setIsLoading(false);
        }

        if (address) {         
          loadSeller(address);
        } else {
          loadUser(tonAddress);
        }
      }
    }
  }, [timer, tonAddress]);


  const loadSeller = async (address: string) => {
    try {
      const response = await request({
        url: `${API_HOST}/api/user/${address}/address`,
        method: 'GET',
      });
      
      const seller = response.data;

      if (tonAddress) {
        const transaction = await buildTransactionTon(seller, 'Communa');;

        WebApp.MainButton.setParams({
          text: 'PAY NOW',
        });
        WebApp.MainButton.onClick(() => tonConnectUI?.sendTransaction(transaction));
      } else {
        tonConnectUI.uiOptions = {
          actionsConfiguration: {
            twaReturnUrl: `${TELEGRAM_BOT_ID}?startapp=${address}`,
          },
        };
        WebApp.MainButton.setParams({
          text: 'CONNECT WALLET & PAY',
        });
        WebApp.MainButton.onClick(() => tonConnectUI.openModal());
      }

      WebApp.MainButton.show();

      setSeller(seller);
      setIsLoading(false);
    } catch (e: any) {
      setIsLoading(false);
    }
  };

  const loadUser = async (address: string) => {
    try {
      const response = await request({
        url: `${API_HOST}/api/user/${address}/address`,
        method: 'GET',
      });
       
      setUser(response.data);
      setIsLoading(false);
    } catch (e: any) {
      setIsLoading(false);
    }
  };

  const onLogout = () => {
    setUser(null);
    tonConnectUI?.disconnect();
    userLogOut();
  };


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

  
  if (isLoading) {
    return <TelegramLoading />;
  }
  if (seller) {
    return <TelegramSeller user={seller} />;
  }
  if (user && screen === 'edit') {
    return (
      <TelegramProfileEdit
        user={user}
        userUnsafe={userUnsafe}
        fnLoad={() => loadUser(user.address)} 
        fnClose={() => setScreen('profile')} 
      />
    );
  }
  if (user) {
    return (
      <TelegramProfileMy
        user={user} 
        userUnsafe={userUnsafe}
        fnDisconnect={() => onLogout()} 
        fnEdit={() => setScreen('edit')} 
      />
    );
  }

  if (screen === 'about') {
    return <TelegramAbout fnBack={() => setScreen('edit')}/>;
  }
  if (!user || !seller) {
    return <TelegramWelcome 
      fnAbout={() => setScreen('about')}
    />;
  } 
};

export default Telegram;
