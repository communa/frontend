import Link from 'next/link';
import {useAuth} from 'src/contexts/Auth';

const ActivityNavPublishing = () => {
  const {userAddress} = useAuth();

  return (
    <nav className="links">
      {/* <Link href="/activity">
        View all
      </Link> */}
      {userAddress && (
        <>
          <Link href="/activity?type=Personal&state=Published">
            Personal
          </Link>
          <Link href="/activity?type=Contract&state=Published">
            Published
          </Link>
          <Link href="/activity?type=Contract&state=Draft">
            Drafts
          </Link>
          <Link href="/activity?type=Contract&state=Archived">
            Archived
          </Link>
        </>
      )}
    </nav>
  )
}
export default ActivityNavPublishing;
