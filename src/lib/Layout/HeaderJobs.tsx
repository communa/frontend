import * as React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { AuthContext } from 'src/contexts/Auth';
import { useNotifications } from 'src/contexts/Notifications';
import { HeaderSideWrapper } from 'src/lib/Layout/Wrappers';
import { useAccount, useDisconnect } from 'wagmi';


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
          Communa
        </Link>
        <span>Goerli</span>
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
        {authStatus !== 'authenticated' && (
          <>
            <h4>My Account</h4>
            <ul>
              <li>
                <Link href="/" onClick={() => onLoginClick()}>
                  Log In
                </Link>
              </li>
            </ul>
          </>
        )}
      </nav>
    </HeaderSideWrapper>
  )
}