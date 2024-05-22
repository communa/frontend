import {useEffect, useState} from "react";

import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';

import {addressToShort, request} from "src/Utils";
import {API_HOST} from "src/config/consts";
import {IUser} from "src/interface/IUser";
import {TelegramWrapper} from "src/lib/Wrappers";
import {useNotifications} from "src/contexts/Notifications";
import Logo from "src/lib/Layout/Logo";

import {useTonAddress, useTonConnectUI} from "@tonconnect/ui-react";
import {ConnectButtonTon} from "src/lib/Layout/ConnectButtonTon";

declare global {
  interface Window { Telegram: any; }
}

const Telegram = () => {
  const [user, setUser] = useState<IUser>();
  const {addNotification} = useNotifications();   
  const tonAddress = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();

  let WebApp: any = null;

  useEffect(() => {
    if (window !== undefined) {
      WebApp = window.Telegram.WebApp;
      WebApp.ready();
      WebApp.expand();
      WebApp.MainButton.setParams({
        text: 'PLACE ORDER'
      });
      WebApp.MainButton.onClick(() => {});

      const address = window.Telegram.WebApp.initDataUnsafe.start_param;

      loadProfile(address);
    }
  }, []);

  const loadProfile = async (address: string) => {
    try {
      const response = await request({
        url: `${API_HOST}/api/user/${address}/address`,
        method: 'GET',
      });
      setUser(response.data);
      WebApp.MainButton.show();
    } catch (e:any) {
      addNotification({
        title: 'Profile not found',
        subtitle: '',
      });
    }
  }

  const isSocial = false;

  if (user) {
    return (
      <TelegramWrapper>
        <div id="name">
          <p className="address">
            {addressToShort(user.address)}
          </p>
          <h2>{user.userName}</h2>
          <h3>{user.company}</h3>
          
          {isSocial && (
            <div id="social">
              {user.twitter && (
                <a href={user.twitter} target="_blank">
                  <TwitterIcon />
                </a>
              )}
              {user.linkedIn && (
                <a href={user.linkedIn} target="_blank">
                  <LinkedInIcon />
                </a>
              )}
              {user.facebook && (
                <a href={user.facebook} target="_blank">
                  <FacebookIcon />
                </a>
              )}
              {user.telegram && (
                <a href={user.telegram} target="_blank">
                  <TelegramIcon />
                </a>
              )}
              {user.github && (
                <a href={user.github} target="_blank">
                  <GitHubIcon />
                </a>
              )}
            </div>
          )}
        </div>
        <div id="bio">
          <div
            className="body"
            dangerouslySetInnerHTML={{
              __html: user.bio,
            }}
          />
        </div>
      </TelegramWrapper>
    );
  }

  const onLogout = () => {
    tonConnectUI?.disconnect();
  };

  if (tonAddress) {
    return (
      <TelegramWrapper>
        Address: {tonAddress}
  
        <button onClick={onLogout} className="ton">
          Disconnect
        </button>
      </TelegramWrapper>
    );
  }

  return (
    <TelegramWrapper>      
      <Logo />
      <ConnectButtonTon 
        twaReturnUrl="https://t.me/communa_network_bot/user_dev" 
        label="Create an Account" 
      />
    </TelegramWrapper>
  );
};

export default Telegram;
