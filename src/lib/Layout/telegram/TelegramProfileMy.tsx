import {
  Button,
} from '@telegram-apps/telegram-ui';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import {TelegramWrapper} from './Wrappers';
import {IUser} from 'src/interface/IUser';
import {TelegramProfile} from './TelegramProfile';
import {TELEGRAM_BOT_ID} from 'src/config/consts';
import {useNotifications} from 'src/contexts/Notifications';

export const TelegramProfileMy = (
  { fnEdit, fnDisconnect, user}: {fnEdit: Function, fnDisconnect: Function, user: IUser}
) => {
  const {addNotification} = useNotifications();
  const link = `${TELEGRAM_BOT_ID}?startapp=${user.address}`;

  const onCopy = () => {
    addNotification({
      title: 'Copied to clipboard',
      subtitle: '',
    });
  }
  
  return (
    <TelegramWrapper id="profile">
      <main>
        <TelegramProfile user={user} />
        <nav className="bottom">
          <Button mode="bezeled" onClick={() => fnDisconnect()}>
            Exit
          </Button>
          <CopyToClipboard text={link} onCopy={() => onCopy()}>
            <Button mode="bezeled">
              Share
            </Button>
          </CopyToClipboard>
          <Button mode="filled" onClick={() => fnEdit()}>
            Edit
          </Button>
        </nav>
      </main>
    </TelegramWrapper>
  );
};
