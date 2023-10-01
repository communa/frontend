import * as React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { AuthContext } from 'src/contexts/Auth';
import { useNotifications } from 'src/contexts/Notifications';
import { HeaderSideWrapper } from 'src/lib/Layout/Wrappers';
import { useAccount, useDisconnect } from 'wagmi';
import { ConnectButton } from 'src/lib/Layout/ConnectButton';
import { Button, Tooltip } from '@mui/material';

export default function HeaderJobs() {
  const { authStatus } = useContext(AuthContext);
  const { addNotification } = useNotifications();
  const { disconnect } = useDisconnect()
  const { address } = useAccount();
  const router = useRouter();

  const onLogoutClick = () => {
    localStorage.clear();
    router.push('/');
    addNotification({
      title: 'See You',
      subtitle: '',
    });
    disconnect();
  }

  return (
    <HeaderSideWrapper>
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
      <nav>
        <h4>Jobs</h4>
        <ul>
          <li>
            <Link href="/activity">
              View all
            </Link>
          </li>
          {authStatus === 'authenticated' && address && (
            <li>
              <Link href="/activity/new">
                Publish a job
              </Link>
            </li>
          )}
        </ul>
        <h4>Technology</h4>
        <ul>
          <li>
            <Link href="/activity">
              TypeScript
            </Link>
          </li>
          <li>
            <Link href="/activity">
              Python
            </Link>
          </li>
          <li>
            <li>
              <Link href="/activity">
                Rust
              </Link>
            </li>
            <li>
              <Link href="/activity">
                Go
              </Link>
            </li>
          </li>
        </ul>
        {authStatus === 'authenticated' && (
          <>
            <h4>My account</h4>
            <ul>
              <li>
                <Link href={`/user/${address}`}>
                  View profile
                </Link>
              </li>
              <li>
                <Link href={`/user/${address}/edit`}>
                  Edit profile
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
        <Tooltip title="Communa TimeTracker is not yet released">
          <Button
            className="downloadTimeTracker"
            variant="contained"
            disabled
          >
            Download TimeTracker
          </Button>
        </Tooltip>
        <p className="copyright">
          Copyright © 2023 Communa.
        </p>
      </footer>
    </HeaderSideWrapper >
  )
}