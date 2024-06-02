import {useEffect, useState} from 'react';

import {useTonAddress, useTonConnectUI} from '@tonconnect/ui-react';
import { useInterval } from 'usehooks-ts';

import {request} from 'src/Utils';
import {API_HOST, TELEGRAM_BOT_ID} from 'src/config/consts';
import {IUser} from 'src/interface/IUser';
import {TelegramWelcome} from 'src/lib/Layout/telegram/TelegramWelcome';
import {TelegramProfileEdit} from 'src/lib/Layout/telegram/TelegramProfileEdit';
import {TelegramProfileMy} from 'src/lib/Layout/telegram/TelegramProfileMy';
import {useAuth} from 'src/contexts/Auth';
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
  const [isPlaying, setPlaying] = useState<boolean| null>(true)

  let WebApp: any = null;
  let transaction: any = null;

  useInterval(() => {
    setTimer((new Date()).getMilliseconds());
  }, isPlaying ? 1000 : null);

  useEffect(() => {
    if (window !== undefined) {
      WebApp = window?.Telegram?.WebApp;
  
      if (WebApp) {
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
        transaction = {
          validUntil: Math.floor(Date.now() / 1000) + 360 * 6,
          messages: [
              {
                address,
                amount: seller?.price * 1000000000
              }
          ]
        };
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
        fnLoad={() => loadUser(user.address)} 
        fnClose={() => setScreen('profile')} 
      />
    );
  }
  if (user) {
    return (
      <TelegramProfileMy 
        user={user} 
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
