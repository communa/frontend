import Link from 'next/link';
import { HeaderWrapper } from 'src/lib/Layout/Wrappers';

export default function Header({ }) {
  return (
    <HeaderWrapper>
      <div className="logo">
        <Link href="/">
          Communa
        </Link><span>alpha</span>
      </div>
      <div className="nav">
        <Link href="/">
          Browse Jobs
        </Link>
        <Link href="/about">
          About
        </Link>
        <Link href="/login">
          Log In
        </Link>
        <Link href="https://github.com/communa">
          GitHub
        </Link>
      </div>
    </HeaderWrapper>
  )
}