import * as React from 'react';

import Link from 'next/link';
import {LogoWrapper} from 'src/lib/Layout/Wrappers';

export default function Logo() {
  return (
    <LogoWrapper className="logo">
      <Link href="https://communa.network">
        <picture>
          <img
            src="/logo.png"
            width={100}
            height={100}
            alt="Landscape picture"
          />
        </picture>
      </Link>
    </LogoWrapper>
  )
}