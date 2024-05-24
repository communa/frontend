import {TelegramWrapper} from './Wrappers';
import {IUser} from 'src/interface/IUser';
import {TelegramProfile} from './TelegramProfile';

export const TelegramSeller = ({user}: {user: IUser}) => {
  return (
    <TelegramWrapper id="profile">
      <main>
        <TelegramProfile user={user} />
      </main>
    </TelegramWrapper>
  );
};
