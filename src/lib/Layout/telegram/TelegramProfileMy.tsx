import {
  Button,
} from '@telegram-apps/telegram-ui';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import {TelegramWrapper} from './Wrappers';
import {IUser} from 'src/interface/IUser';
import {TelegramProfile} from './TelegramProfile';
import {TELEGRAM_BOT_ID} from 'src/config/consts';
import {useNotifications} from 'src/contexts/Notifications';
import {isUserAsSellerReady} from 'src/Utils';
import {IUserUnsafe} from 'src/interface/IUserUnsafe';

export const TelegramProfileMy = (
  { fnEdit, fnDisconnect, user, userUnsafe}: {
    fnEdit: Function, 
    fnDisconnect: Function, 
    user: IUser, 
    userUnsafe: IUserUnsafe | null
  }
) => {
  const {addNotification} = useNotifications();
  const url = `${TELEGRAM_BOT_ID}?startapp=${user.address}`;
  const isSellerReady = isUserAsSellerReady(user);

  const urlInvitation = `https://t.me/share/url?url=${encodeURIComponent(url)}`;

  const onCopy = () => {
    addNotification({
      title: 'Copied to clipboard',
      subtitle: '',
    });
    // const WebApp = window?.Telegram?.WebApp;
    // WebApp.openTelegramLink(urlInvitation);
  }

  if (isSellerReady) {
    return (
      <TelegramWrapper id="profile" className="active">
        <main>
          <TelegramProfile user={user} />
          <nav className="bottom">
            <Button mode="bezeled" onClick={() => fnDisconnect()}>
              Exit
            </Button>
            <CopyToClipboard text={url} onCopy={() => onCopy()}>
              <Button mode="bezeled">
                Share
              </Button>
            </CopyToClipboard>
            <Button mode="filled" onClick={() => fnEdit()} className="edit">
              Edit
            </Button>
          </nav>
        </main>
      </TelegramWrapper>
    );
  }
  
  return (
    <TelegramWrapper id="profile" className="inactive">
      <main>
        {userUnsafe ? (
          <>
            <section>
              <h2>Hi, {userUnsafe.username}!</h2>
              <p>Turn your Telegram profile<br/>into a sales tool.</p>
            </section>
          </>
        ): (
          <>
            <section>
              <h2>Hi!</h2>
              <p>Turn your Telegram profile<br/>into a sales tool.</p>
            </section>
          </>
        )}

        <nav className="bottom">
          <Button mode="bezeled" onClick={() => fnDisconnect()}>
            Exit
          </Button>
          <CopyToClipboard text={url} onCopy={() => onCopy()}>
            <Button mode="bezeled">
              Share
            </Button>
          </CopyToClipboard>
          <Button mode="filled" onClick={() => fnEdit()} className="edit">
            Edit
          </Button>
        </nav>        
      </main>
    </TelegramWrapper>
  );
};
