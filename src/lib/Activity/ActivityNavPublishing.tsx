import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from 'src/contexts/Auth';

const ActivityNavPublishing = () => {
  const { authStatus } = useContext(AuthContext);
  return (
    <nav className="links">
      <Link href="/">
        View all
      </Link>
      {authStatus === 'authenticated' && (
        <>
          <Link href="/activity/my?type=Personal&state=Published">
            Personal
          </Link>
          <Link href="/activity/my?type=Contract&state=Published">
            Published
          </Link>
          <Link href="/activity/my?type=Contract&state=Draft">
            Drafts
          </Link>
          <Link href="/activity/my?type=Contract&state=Archived">
            Archived
          </Link>
        </>
      )}
    </nav>
  )
}
export default ActivityNavPublishing;
