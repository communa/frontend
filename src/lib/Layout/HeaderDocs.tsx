import * as React from 'react';
import { useState } from 'react';

import Link from 'next/link';
import { HeaderSideWrapper } from 'src/lib/Layout/Wrappers';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';

export default function HeaderDocs() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <HeaderSideWrapper className={`${isOpen ? '__open' : ''}`}>
      <header>
        <div className="logo">
          <Link href="/">
            <picture>
              <img
                width={100}
                height={100}
                src="/logo.png"
                alt="Landscape picture"
              />
              <span>Testnet</span>
            </picture>
          </Link>
        </div>
        <IconButton
          aria-label="delete"
          size="small"
          className="menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <CloseIcon fontSize="inherit" />
          ) : (
            <MenuIcon fontSize="inherit" />
          )}
        </IconButton>
        <nav onClick={() => setIsOpen(false)}>
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
          {/* 
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
          </ul> */}

          <h4>Other</h4>
          <ul>
            <li>
              <a href="https://github.com/communa" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <a href="https://docs.google.com/forms/d/1nBtimLYE6yHDixAnlNhJ2mcB7gzWwlMCXPCdTxGo6lE" target="_blank" rel="noreferrer">
                Business Inquiries
              </a>
            </li>
          </ul>
        </nav>
        <footer>
          <p className="copyright">
            Copyright © 2023 Communa.
          </p>
        </footer>
      </header>
    </HeaderSideWrapper>
  )
}