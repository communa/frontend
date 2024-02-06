import * as React from 'react';

import Link from 'next/link';
import {LogoWrapper} from 'src/lib/Layout/Wrappers';

export default function Header({ }) {
  return (
    <LogoWrapper className="logo">
      <Link href="https://communa.network">
        <picture>
          <img
            src="/logo-testnet.png"
            width={100}
            height={100}
            alt="Landscape picture"
          />
        </picture>
      </Link>
    </LogoWrapper>
  )
}