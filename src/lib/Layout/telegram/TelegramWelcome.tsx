import {Button} from '@telegram-apps/telegram-ui';

import {TelegramWrapper} from './Wrappers';
import LogoTelegram from '../LogoTelegram';
import WelcomeImage from 'src/assets/9bf85475f45d8cd3ee45ba2035d5ef41.jpg';
import {useTonConnectUI} from '@tonconnect/ui-react';

export const TelegramWelcome = ({ fnAbout}: {fnAbout: Function}) => {
  const [tonConnectUI] = useTonConnectUI();

  return (
    <TelegramWrapper id="welcome">
      <main>
        <section>
          <LogoTelegram />
          <h2>P2P Freelance Marketplace</h2>
          <p>
            Communa is a web3 freelance network to connect
            businesses with talented professionals worldwide on Telegram
          </p>
          <picture>
            <img
              src={WelcomeImage.src}
              alt="Communa is a web3 freelance network to connect businesses with talented professionals worldwide on Telegram"
              width={200}
            />
          </picture>
        </section>
        <footer>
          <Button mode='bezeled' onClick={() => fnAbout()}>
            About
          </Button>
          <Button id="authTon" mode="filled" onClick={() => tonConnectUI.openModal()}>
            Connect Wallet
          </Button>
        </footer>        
      </main>
    </TelegramWrapper>
  );
};
