import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { AuthContext } from 'src/contexts/Auth';
import { useNotifications } from 'src/contexts/Notifications';
import { HeaderWrapper } from 'src/lib/Layout/Wrappers';
import { useAccount, useDisconnect } from 'wagmi';

export default function Header({ }) {
  const { authStatus } = useContext(AuthContext);
  const { addNotification } = useNotifications();
  const router = useRouter();
  const { disconnect } = useDisconnect()
  const { address } = useAccount();

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
        <span>alpha</span>
      </div>
      <div className="nav">
        <Link href="/activity/new">
          Publish a Job
        </Link>
        <Link href="/">
          Browse Jobs
        </Link>
        <Link href="/about">
          About Us
        </Link>
        {authStatus === 'unauthenticated' && (
          <>
            <a href="https://github.com/communa" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <button onClick={() => onLoginClick()}>
              Log In
            </button>
          </>
        )}
        {authStatus === 'authenticated' && (
          <>
            <Link href={`/user/${address}`}>
              My Profile
            </Link>
            <button onClick={() => onLogoutClick()}>
              Log Out
            </button>
          </>
        )}
      </div>
    </HeaderWrapper>
  )
}