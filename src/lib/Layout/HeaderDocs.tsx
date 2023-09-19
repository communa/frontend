import * as React from 'react';

import Link from 'next/link';
import { HeaderSideWrapper } from 'src/lib/Layout/Wrappers';

export default function HeaderDocs() {
  return (
    <HeaderSideWrapper>
      <div className="logo">
        <Link href="/">
          Communa
        </Link>
        <span>Goerli</span>
      </div>
      <nav>
        <h4>Docs</h4>
        <ul>
          <li>
            <Link href="/litepaper">
              Litepaper
            </Link>
          </li>
          <li>
            <Link href="/roadmap">
              Roadmap
            </Link>
          </li>
        </ul>

        <h4>Smart Contracts</h4>
        <ul>
          <li>
            <Link href="/airdrop">
              Airdrop
            </Link>
          </li>
          <li>
            <Link href="/payment">
              Release Payment
            </Link>
          </li>
        </ul>

        <h4>Other</h4>
        <ul>
          <li>
            <Link href="https://github.com/communa">
              GitHub
            </Link>
          </li>
          <li>
            <Link href="https://docs.google.com/forms/d/1nBtimLYE6yHDixAnlNhJ2mcB7gzWwlMCXPCdTxGo6lE">
              Business Inquiries
            </Link>
          </li>
        </ul>
      </nav>
    </HeaderSideWrapper>
  )
}