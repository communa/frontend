import {TelegramWrapper} from './Wrappers';
import {IUser} from 'src/interface/IUser';
import {TelegramProfile} from './TelegramProfile';
import {isUserAsSellerReady} from 'src/Utils';

export const TelegramSeller = ({user}: {user: IUser}) => {
  const isSellerReady = isUserAsSellerReady(user);

  if (isSellerReady) {
    return (
      <TelegramWrapper id="profile" className="active">
        <main>
          <TelegramProfile user={user} />
        </main>
      </TelegramWrapper>
    );    
  }

  return (
    <TelegramWrapper id="profile" className="inactive">
      <main>
        <section>
          <h2>Hi!</h2>
          <p>Turn your Telegram profile<br/>into a sales tool.</p>
        </section>
      </main>
    </TelegramWrapper>
  );
};
