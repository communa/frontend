import {Button} from '@telegram-apps/telegram-ui';
import CopyToClipboard from 'react-copy-to-clipboard';

import {TelegramWrapper} from './Wrappers';
import LogoTelegram from '../LogoTelegram';
import {ConnectButtonTonTelegram} from '../ConnectButtonTonTelegram';
import WelcomeImage from 'src/assets/9bf85475f45d8cd3ee45ba2035d5ef41.jpg';
import {useNotifications} from 'src/contexts/Notifications';
import {TELEGRAM_BOT_ID} from 'src/config/consts';

export const TelegramWelcome = ({ fnAbout}: {fnAbout: Function}) => {
  const {addNotification} = useNotifications();
  const link = `${TELEGRAM_BOT_ID}`;

  const onCopy = () => {
    addNotification({
      title: 'Copied to clipboard',
      subtitle: '',
    });
  }

  return (
    <TelegramWrapper id="welcome">
      <main>
        <section>
          <LogoTelegram />
          <h2>Freelance Marketplace</h2>
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
          <>
            <CopyToClipboard text={link} onCopy={() => onCopy()}>
              <Button mode='bezeled'>
                Invite
              </Button>
            </CopyToClipboard>
          </>
          <Button mode='bezeled' onClick={() => fnAbout()}>
            About
          </Button>          
          <ConnectButtonTonTelegram />
        </footer>
      </main>
    </TelegramWrapper>
  );
};
