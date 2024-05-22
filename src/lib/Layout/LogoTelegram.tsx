import * as React from 'react';

import {LogoTelegramWrapper} from 'src/lib/Layout/Wrappers';

export default function LogoTelegram() {
  return (
    <LogoTelegramWrapper className="logo">
      <picture>
        <img
          src="/logo.png"
          alt="Communa Network"
        />
      </picture>
    </LogoTelegramWrapper>
  );
}
