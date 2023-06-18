import Link from 'next/link';
import { HeaderWrapper } from 'src/lib/Layout/Wrappers';

export default function Header({ }) {
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
        <Link href="/login">
          Login
        </Link>
        <Link href="/about">
          About
        </Link>
      </div>
    </HeaderWrapper>
  )
}