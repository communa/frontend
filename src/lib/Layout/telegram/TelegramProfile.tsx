import Image from 'next/image';
import {Chip} from '@telegram-apps/telegram-ui';

import {IUser} from 'src/interface/IUser';
import UsdtLogo from 'src/assets/tether-usdt-logo.svg';

export const TelegramProfile = ({user}: {user: IUser}) => {

  return (
    <>
      <header>
        <p className="username">
          {user.userName}
        </p>
        <p className="company">
          {user.company}
        </p>
        <div className="tags">
          {user.skills && user.skills.split(',').map(t => <Chip mode="mono">{t}</Chip>)}
        </div>        
      </header>
      <p className="price">
        <Image
          priority
          src={UsdtLogo}
          alt="USDT Logo"
          width={35}
          height={35}
        />
        {user.price} USDT
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
