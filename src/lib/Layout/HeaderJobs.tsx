import * as React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { AuthContext } from 'src/contexts/Auth';
import { useNotifications } from 'src/contexts/Notifications';
import { HeaderSideWrapper } from 'src/lib/Layout/Wrappers';
import { useAccount, useDisconnect } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';


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

  const onLoginClick = () => {
    router.push('/login');
  }

  return (
    <HeaderSideWrapper>
      <div className="logo">
        <Link href="/">
          <picture>
            <img
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
              View All
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
        {/* <h4>Skill</h4>
        <ul className="inline">
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
            <Link href="/activity">
              Solidity
            </Link>
          </li>
        </ul>
        <h4>Location</h4>
        <ul>
          <li>
            <Link href="/activity">
              USA
            </Link>
          </li>
          <li>
            <Link href="/activity">
              United Kingdom
            </Link>
          </li>
          <li>
            <Link href="/activity">
              Germany
            </Link>
          </li>
          <li>
            <Link href="/activity">
              Spain
            </Link>
          </li>
          <li>
            <Link href="/activity">
              UAE
            </Link>
          </li>
        </ul> */}
        {authStatus === 'authenticated' && address && (
          <>
            <h4>My Account</h4>
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
                <Link href="/" onClick={() => onLogoutClick()}>
                  Log out
                </Link>
              </li>
            </ul>
          </>
        )}
        <br />
        <br />
        <br />
        {authStatus !== 'authenticated' && (
          <>
            <ConnectButton />
          </>
        )}

      </nav>
    </HeaderSideWrapper >
  )
}