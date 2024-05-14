import * as React from 'react';
import {useState, useEffect} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import GitHubIcon from '@mui/icons-material/GitHub';
import {IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovementRounded';
import NextLink from 'next/link';

import {useAuth} from 'src/contexts/Auth';
import {ConnectButtonWrapper, MenuMainWrapper} from 'src/lib/Layout/Wrappers';
import {JOB_KEYWORDS} from 'src/config/consts';

export default function MenuMain() {
  const [isOpen, setIsOpen] = useState(false);
  const [menu, setMenu] = useState('');
  const {userAddress, userLogOut} = useAuth();
  const router = useRouter();
  const {redirect} = router.query;

  let addressShort = '';
  let isHide = false;

  if (userAddress) {
    addressShort = `${userAddress.slice(0, 4)}...${userAddress.slice(38, 44)}`;
  }

  useEffect(() => {
    if (redirect === 'from_website' && !userAddress) {
      document?.getElementById('authLogin')?.click();
      router.push(`/`);
    }
  }, [redirect]);

  const showMenu = (id: string) => {
    isHide = false;
    setMenu(id);
    console.log(id);
  }

  const hideMenu = () => {
    isHide = true;
    setTimeout(() => {
      if (isHide) {
        setMenu('');
      }
    }, 1000);
  }

  return (
    <MenuMainWrapper className={`${isOpen ? '__open' : ''}`}>
      <nav>
        <div className="logo">
          <Link href="https://communa.network">
            <picture>
              <img
                width={100}
                height={100}
                src="/logo.png"
                alt="Communa Network"
              />
            </picture>
          </Link>
        </div>
        <ul className="desktop">
          {userAddress && (
            <li
              onMouseEnter={() => showMenu('dashboard')}
              onMouseLeave={() => hideMenu()}
              className={menu === 'dashboard' ? 'active' : ''}
            >
              <Link href="/time">
                Dashboard
              </Link>
            </li>
          )}
          <li
            onMouseEnter={() => showMenu('help')}
            onMouseLeave={() => hideMenu()}
            className={menu === 'help' ? 'active' : ''}
          >
            <Link href="https://communa.network/help">
              Help
            </Link>
          </li>
          <li
            onMouseEnter={() => showMenu('investor')}
            onMouseLeave={() => hideMenu()}
            className={menu === 'investor' ? 'active' : ''}
          >
            <a href="https://docs.google.com/forms/d/1nBtimLYE6yHDixAnlNhJ2mcB7gzWwlMCXPCdTxGo6lE">
              Investors
            </a>
          </li>
          <li
            onMouseEnter={() => showMenu('developer')}
            onMouseLeave={() => hideMenu()}
            className={menu === 'developer' ? 'active' : ''}
          >
            <Link href="https://github.com/communa">
              Developers
            </Link>
          </li>
          <li
            onMouseEnter={() => showMenu('work')}
            onMouseLeave={() => hideMenu()}
            className={menu === 'work' ? 'active' : ''}
          >
            <Link href="/">
              Marketplace
            </Link>
          </li>
          <li>
            <a href="https://communa.network/download">
              Download v0.6.1
            </a>
          </li>
          <li className="social first">
            <a href="https://github.com/communa" target="_blank" rel="noreferrer">
              <GitHubIcon />
            </a>
          </li>
          <li className="social">
            <a href="https://twitter.com/CommunaNetwork" target="_blank" rel="noreferrer">
              <TwitterIcon />
            </a>
          </li>
          <li className="social">
            <a href="https://t.me/communajobs" target="_blank" rel="noreferrer">
              <TelegramIcon />
            </a>
          </li>
        </ul>
        <div className="auth">
          {
            addressShort ? (
              <ConnectButtonWrapper>
                <button type="button" onClick={() => userLogOut()}>
                  <LogoutIcon /> Disconnect {addressShort}
                </button>
              </ConnectButtonWrapper>
            ) : (
              <ConnectButtonWrapper>
                <NextLink href="/login">
                  <button>
                  <SelfImprovementIcon /> Sign In with Web3
                  </button>
                </NextLink>
              </ConnectButtonWrapper>
            )
          }
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
      </nav>

      {isOpen && (
        <div id="mobileMenu">
          <h4>Dashboard</h4>
          <ul>
            <li>
              <Link href={`/time`}>
                Your projects
              </Link>
            </li>
            <li>
              <Link href={`/user/${userAddress}`}>
                Profile
              </Link>
            </li>
          </ul>
          <h4>Marketplace</h4>
          <ul>
            {JOB_KEYWORDS.map((k, i) => {
              return (
                <li key={i}>
                  <Link href={`https://app.communa.network/?filter=${k}`}>
                    {k}
                  </Link>
                </li>
              );
            })}
          </ul>
          <h4>Help</h4>
          <ul>
            <li>
              <Link href="https://communa.network/help">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="https://communa.network/help">
                How it works?
              </Link>
            </li>
            <li>
              <Link href="https://communa.network/help">
                What is wallet?
              </Link>
            </li>
          </ul>
          <h4>Investor</h4>
          <ul>
            <li>
              <a href="https://communa.network/roadmap">
                Roadmap
              </a>
            </li>
            <li>
              <a href="https://communa.network/litepaper">
                Litepaper
              </a>
            </li>
            <li>
              <a href="https://assets.communa.network/PitchDeck.html">
                Pitch Deck
              </a>
            </li>
            <li>
              <a href="https://docs.google.com/forms/d/1nBtimLYE6yHDixAnlNhJ2mcB7gzWwlMCXPCdTxGo6lE">
                Business Inquiry
              </a>
            </li>
            <li>
              <a href="https://docs.google.com/forms/d/1-NVkDj1AU3p6hcUbDprqFAbZ0uj9rkJciwd0eRwZpgA">
                Utility Token
              </a>
            </li>
            <li>
              <a href="mailto:hello@communa.network" target="_blank" rel="noreferrer">
                Email Us
              </a>
            </li>
          </ul>
          <h4>Social</h4>
          <ul>
            <li>
              <a href="https://t.me/communajobs" target="_blank" rel="noreferrer">
                Telegram
              </a>
            </li>
            <li>
              <a href="https://twitter.com/CommunaNetwork" target="_blank" rel="noreferrer">
                Twitter / X
              </a>
            </li>
          </ul>
          <h4>Developer</h4>
          <ul>
            <li>
              <a href="https://app.communa.network/swagger/" target="_blank" rel="noreferrer">
                API
              </a>
            </li>
            <li>
              <a href="https://github.com/communa" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </li>
          </ul>
        </div>
      )}

      <div id="downMenu" className={menu} onMouseEnter={() => showMenu(menu)} onMouseLeave={() => hideMenu()}>
        {menu === 'work' && (
          <ul>
            {JOB_KEYWORDS.map((k, i) => {
              return (
                <li key={i}>
                  <Link href={`https://app.communa.network/?filter=${k}`}>
                    {k}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
        {menu === 'dashboard' && (
          <ul>
            <li>
              <Link href={`/time`}>
                Your projects
              </Link>
            </li>
            <li>
              <Link href={`/user/${userAddress}`}>
                Profile
              </Link>
            </li>
          </ul>
        )}
        {menu === 'developer' && (
          <ul>
            <li>
              <a href="https://github.com/communa">
                GitHub
              </a>
            </li>
            <li>
              <a href="https://app.communa.network/swagger/">
                API
              </a>
            </li>
          </ul>
        )}
        {menu === 'investor' && (
          <ul>
            <li>
              <a href="https://communa.network/roadmap">
                Roadmap
              </a>
            </li>
            <li>
              <a href="https://communa.network/litepaper">
                Litepaper
              </a>
            </li>
            <li>
              <a href="https://assets.communa.network/PitchDeck.html">
                Pitch Deck
              </a>
            </li>
            <li>
              <a href="https://docs.google.com/forms/d/1nBtimLYE6yHDixAnlNhJ2mcB7gzWwlMCXPCdTxGo6lE">
                Business Inquiry
              </a>
            </li>
            <li>
              <a href="https://docs.google.com/forms/d/1-NVkDj1AU3p6hcUbDprqFAbZ0uj9rkJciwd0eRwZpgA">
                Utility Token
              </a>
            </li>
            <li>
              <a href="mailto:hello@communa.network" target="_blank" rel="noreferrer">
                Email Us
              </a>
            </li>
          </ul>
        )}
        {menu === 'help' && (
          <ul>
            <li>
              <Link href="https://communa.network/help">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="https://communa.network/help">
                How it works?
              </Link>
            </li>
            <li>
              <Link href="https://communa.network/help">
                What is wallet?
              </Link>
            </li>
          </ul>
        )}
      </div>
    </MenuMainWrapper >
  )
}