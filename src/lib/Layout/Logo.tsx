import * as React from 'react';

import Link from 'next/link';
import { LogoWrapper } from 'src/lib/Layout/Wrappers';

export default function Header({ }) {
  return (
    <LogoWrapper className="logo">
      <Link href="/">
        Communa
      </Link>
      <span>Testnet</span>
    </LogoWrapper>
  )
}