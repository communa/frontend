import {Chip} from '@telegram-apps/telegram-ui';

import {IUser} from 'src/interface/IUser';

export const TelegramProfile = ({user}: {user: IUser}) => {

  return (
    <>
      <header>
        <p className="username">
          {user.userName}
        </p>
        {user.company && <p className="company">{user.company}</p>}
        <div className="tags">
          {user.skills && user.skills.split(',').map(t => <Chip mode="mono">{t}</Chip>)}
        </div>        
      </header>
      <p className="price">
        ${user.price}
      </p>
      <div
        className="bio"
        dangerouslySetInnerHTML={{
          __html: user.bio,
        }}
      />
    </>
  );
};
