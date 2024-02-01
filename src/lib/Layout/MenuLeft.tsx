import * as React from 'react';
import {useState} from 'react';

import Link from 'next/link';
import {useRouter} from 'next/router';
import {useContext} from 'react';
import {AuthContext} from 'src/contexts/Auth';
import {useNotifications} from 'src/contexts/Notifications';
import {HeaderSideWrapper} from 'src/lib/Layout/Wrappers';
import {useAccount, useDisconnect} from 'wagmi';
import {ConnectButton} from 'src/lib/Layout/ConnectButton';
import {IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import {JOB_KEYWORDS} from 'src/config/consts';

export default function MenuLeft() {
  const [isOpen, setIsOpen] = useState(false);
  const {authStatus} = useContext(AuthContext);
  const {addNotification} = useNotifications();
  const {disconnect} = useDisconnect()
  const {address} = useAccount();
  const router = useRouter();

  const onLogoutClick = () => {
    localStorage.clear();
    router.push('/');
    addNotification({
      title: 'See You',
      subtitle: '',
    });
    disconnect();
  };

  let addressShort = '';

  if (address) {
    addressShort = `${address.slice(0, 6)}..${address.slice(38, 44)}`;
  }

  return (
    <HeaderSideWrapper className={`${isOpen ? '__open' : ''}`}>
      <header>
        <div className="logo">
          <Link href="/">
            <picture>
              <img
                width={100}
                height={100}
                src="/logo-testnet.png"
                alt="Landscape picture"
              />
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
          {authStatus !== 'authenticated' && (
            <>
              <h4>
                <Link href='/'>
                  Jobs
                </Link>
              </h4>
              <ul>
                <li>
                  <Link href='/'>
                    View all
                  </Link>
                </li>
                {JOB_KEYWORDS.map(k => {
                  return (
                    <li>
                      <Link href={`/?filter=${k}`} key={k}>
                        {k}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
          {authStatus === 'authenticated' && (
            <>
              <h4>
                <Link href='/'>
                  Jobs
                </Link>
              </h4>
              <ul>
                <li>
                  <Link href='/'>
                    View all
                  </Link>
                </li>
              </ul>
              <h4>
                <Link href="/activity?type=Personal&state=Published">
                  Dashboard
                </Link>
              </h4>
              <ul>
                <li>
                  <Link href="/activity?type=Personal&state=Published">
                    My work
                  </Link>
                </li>
                <li>
                  <Link href="/time">
                    Timesheets
                  </Link>
                </li>
              </ul>
              <h4>
                <a
                  href={`https://polygonscan.com/address/${address}`}
                  target='_blank'
                >
                  Wallet {addressShort}
                </a>
              </h4>
              <ul>
                <li>
                  <Link href={`/user/${address}`}>
                    My profile
                  </Link>
                </li>
                <li>
                  <p onClick={() => onLogoutClick()}>
                    Log out
                  </p>
                </li>
              </ul>
            </>
          )}
          <br />
          <br />
          <br />
        </nav>
        <footer>
          {authStatus !== 'authenticated' && (
            <ConnectButton size={'small'} />
          )}
          <p className="copyright">
            Copyright © 2023 Communa
          </p>
        </footer>
      </header>
    </HeaderSideWrapper >
  )
}