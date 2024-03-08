import * as React from 'react';
import {useState} from 'react';
import NextLink from 'next/link';
import Link from 'next/link';
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';

import {useAuth} from 'src/contexts/Auth';

import {ConnectButtonWrapper, HeaderSideWrapper} from 'src/lib/Layout/Wrappers';
import {ConnectButton} from 'src/lib/Layout/ConnectButton';
import {Button, IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import {JOB_KEYWORDS} from 'src/config/consts';
import DownloadIcon from '@mui/icons-material/Download';
import LogoutIcon from '@mui/icons-material/Logout';

export default function MenuLeft() {
  const [isOpen, setIsOpen] = useState(false);
  const {userAddress, userLogOut} = useAuth();

  let addressShort = '';

  if (userAddress) {
    addressShort = `${userAddress.slice(0, 4)}...${userAddress.slice(38, 44)}`;
  }

  return (
    <HeaderSideWrapper className={`${isOpen ? '__open' : ''}`}>
      <header>
        <div className="logo">
          <Link href={userAddress ? '/time' : '/'}>
            <picture>
              <img
                width={100}
                height={100}
                src="/logo.png"
                alt="Landscape picture"
              />
            </picture>
          </Link>
          <span>
            <ConnectButton size={'small'} />
          </span>
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
        </div>
        <nav onClick={() => setIsOpen(false)}>

          {userAddress && (
            <>
              <h4>
                <Link href="/time">
                  Dashboard
                </Link> {addressShort}
              </h4>
              <ul>
                <li>
                  <Link href="/time">
                    My work
                  </Link>
                </li>
                <li>
                  <Link href={`/user/${userAddress}`}>
                    Profile
                  </Link>
                </li>
              </ul>
            </>
          )}

          <h4>
            <Link href='/'>
              Find work
            </Link>
          </h4>
          <ul>
            {JOB_KEYWORDS.map((k, i) => {
              return (
                <li key={i}>
                  <Link href={`/?filter=${k}`}>
                    {k}
                  </Link>
                </li>
              );
            })}
          </ul>
          <br />
          <br />
          <br />
        </nav>
        <footer>
          {addressShort ? (
            <ConnectButtonWrapper className='small'>
              <button type="button" className="small" onClick={() => userLogOut()}>
                <LogoutIcon /> Exit {addressShort}
              </button>
            </ConnectButtonWrapper>
          ) : (
            <ConnectButton size={'small'} />
          )}
          <NextLink href="https://communa.network/download" passHref>
            <Button variant="outlined" className="downloadTimeTracker">
              <DownloadIcon /> Download TimeTracker
            </Button>
          </NextLink>
          <p className="copyright">
            Copyright © 2024 Communa

            <span>
              <a href="https://t.me/communajobs" target="_blank" rel="noreferrer">
                <TwitterIcon />
              </a>
              <a href="https://twitter.com/CommunaNetwork" target="_blank" rel="noreferrer">
                <TelegramIcon />
              </a>
            </span>
          </p>
        </footer>
      </header>
    </HeaderSideWrapper>
  )
}