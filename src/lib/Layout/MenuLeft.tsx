import * as React from 'react';
import {useState, useEffect} from 'react';
import NextLink from 'next/link';
import Link from 'next/link';

import {useRouter} from 'next/router';
import {useContext} from 'react';
import {AuthContext, getAddressWagmiOrJWT} from 'src/contexts/Auth';
import {useNotifications} from 'src/contexts/Notifications';
import {HeaderSideWrapper} from 'src/lib/Layout/Wrappers';
import {useAccount, useDisconnect} from 'wagmi';
import {ConnectButton} from 'src/lib/Layout/ConnectButton';
import {Button, IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import {JOB_KEYWORDS} from 'src/config/consts';
import DownloadIcon from '@mui/icons-material/Download';

export default function MenuLeft() {
  const [isOpen, setIsOpen] = useState(false);
  const [userAddress, setUserAddress] = useState('');
  const {address} = useAccount();
  const {authStatus, connect} = useContext(AuthContext);
  const {addNotification} = useNotifications();
  const {disconnect} = useDisconnect()
  const router = useRouter();


  useEffect(() => {
    const addr = getAddressWagmiOrJWT(address);

    setUserAddress(addr);
  }, []);

  const onLogoutClick = () => {
    localStorage.clear();
    router.push('/');
    addNotification({
      title: 'See You',
      subtitle: '',
    });
    connect('unauthenticated');
    disconnect();
  };

  let addressShort = '';

  if (userAddress) {
    addressShort = `${userAddress.slice(0, 6)}..${userAddress.slice(38, 44)}`;
  }

  return (
    <HeaderSideWrapper className={`${isOpen ? '__open' : ''}`}>
      <header>
        <div className="logo">
          <Link href="https://communa.network">
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
                  href={`https://polygonscan.com/address/${userAddress}`}
                  target='_blank'
                >
                  Wallet {addressShort}
                </a>
              </h4>
              <ul>
                <li>
                  <Link href={`/user/${userAddress}`}>
                    My profile
                  </Link>
                </li>
                <li>
                  <p onClick={() => onLogoutClick()}>
                    Disconnect
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
          <NextLink href="https://communa.network/download" passHref>
            <Button variant="outlined" className="downloadTimeTracker">
              <DownloadIcon /> Download Timer
            </Button>
          </NextLink>
          <p className="copyright">
            Copyright © 2023 Communa
          </p>
        </footer>
      </header>
    </HeaderSideWrapper>
  )
}