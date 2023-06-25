import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from 'src/contexts/Auth';
import { HeaderWrapper } from 'src/lib/Layout/Wrappers';

export default function Header({ }) {
  const { authStatus } = useContext(AuthContext);

  return (
    <HeaderWrapper>
      <div className="logo">
        <Link href="/">
          Communa
        </Link>
      </div>
      <div className="nav">
        <Link href="/">
          Browse Jobs
        </Link>
        <Link href="/about">
          About Us
        </Link>
        <Link href="https://github.com/communa">
          GitHub
        </Link>
        {authStatus === 'unauthenticated' && (
          <Link href="/login">
            Log In
          </Link>
        )}
        {authStatus === 'authenticated' && (
          <Link href="/login">
            Log Out
          </Link>
        )}
      </div>
    </HeaderWrapper>
  )
}