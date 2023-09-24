import * as React from 'react';

import Link from 'next/link';
import { LogoWrapper } from 'src/lib/Layout/Wrappers';

export default function Header({ }) {
  return (
    <LogoWrapper className="logo">
      <Link href="/">
        <picture>
          <img
            src="/logo.png"
            alt="Landscape picture"
          />
        </picture>
      </Link>
      <span>Testnet</span>
    </LogoWrapper>
  )
}