import * as React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { AuthContext } from 'src/contexts/Auth';
import { useNotifications } from 'src/contexts/Notifications';
import { HeaderWrapper } from 'src/lib/Layout/Wrappers';
import { useAccount, useDisconnect } from 'wagmi';

import { Button, Divider, Menu, MenuItem } from '@mui/material';

export default function Header({ }) {
  const { authStatus } = useContext(AuthContext);
  const { addNotification } = useNotifications();
  const { disconnect } = useDisconnect()
  const { address } = useAccount();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const onClose = (path: string) => {
    setAnchorEl(null);
    router.push(path);
  };

  const onLogoutClick = () => {
    localStorage.clear();
    router.push('/');
    addNotification({
      title: 'See You',
      subtitle: '',
    });
    disconnect();
  }

  const onLoginClick = () => {
    router.push('/login');
  }

  return (
    <HeaderWrapper>
      <div className="logo">
        <Link href="/">
          Communa
        </Link>
        <span>Goerli</span>
      </div>
      <div className="nav">
        <div>
          <Button
            id="basic-button-jobs"
            aria-haspopup="true"
            onClick={onClick}
          >
            Jobs
          </Button>
          <Menu
            id="menu-jobs"
            anchorEl={anchorEl}
            open={anchorEl?.id === 'basic-button-jobs'}
            onClose={onClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button-jobs',
            }}
          >
            <MenuItem onClick={() => onClose('/')}>
              Browse jobs
            </MenuItem>
            <MenuItem onClick={() => onClose('/activity/new')}>
              Publish a job
            </MenuItem>
          </Menu>
        </div>

        <div>
          <Button
            id="basic-button-token"
            aria-haspopup="true"
            onClick={onClick}
          >
            Token
          </Button>
          <Menu
            id="basic-menu-token"
            anchorEl={anchorEl}
            open={anchorEl?.id === 'basic-button-token'}
            onClose={onClose}
          >
            <MenuItem onClick={() => onClose('/airdrop')}>Token airdrop</MenuItem>
            <MenuItem onClick={() => onClose('/payment')}>Token payment</MenuItem>
          </Menu>
        </div>

        <div>
          <Button
            id="basic-button-docs"
            aria-haspopup="true"
            onClick={onClick}
          >
            Documents
          </Button>
          <Menu
            id="basic-menu-docs"
            anchorEl={anchorEl}
            open={anchorEl?.id === 'basic-button-docs'}
            onClose={onClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button-docs',
            }}
          >
            <MenuItem onClick={() => onClose('/litepaper')}>Litepaper</MenuItem>
            <MenuItem onClick={() => onClose('/roadmap')}>Roadmap</MenuItem>
          </Menu>
        </div>
        <Button
          onClick={() => {
            window.location.replace('https://github.com/communa');
          }}
        >
          GitHub
        </Button>
        {authStatus === 'unauthenticated' && (
          <>
            <Button
              variant="outlined"
              onClick={() => onLoginClick()}
            >
              Log In
            </Button>
          </>
        )}
        {authStatus === 'authenticated' && address && (
          <div>
            <Button
              id="basic-button-profile"
              aria-haspopup="true"
              variant="outlined"
              onClick={onClick}
            >
              Profile ({address.slice(0, 10)})
            </Button>
            <Menu
              id="basic-menu-profile"
              anchorEl={anchorEl}
              open={anchorEl?.id === 'basic-button-profile'}
              onClose={onClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button-profile',
              }}
            >
              <MenuItem onClick={() => onClose(`/user/${address}`)}>My Pofile</MenuItem>
              <MenuItem onClick={() => onClose(`/user/${address}/edit`)}>Edit Pofile</MenuItem>
              <Divider />
              <MenuItem onClick={onLogoutClick}>Log Out</MenuItem>
            </Menu>
          </div>
        )}
      </div>
    </HeaderWrapper>
  )
}