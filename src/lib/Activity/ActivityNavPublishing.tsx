import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from 'src/contexts/Auth';

interface ActivityNavPublishingProps extends React.HTMLAttributes<HTMLElement> {
  state: string
}

const ActivityNavPublishing = ({ state }: ActivityNavPublishingProps) => {
  const { authStatus } = useContext(AuthContext);
  return (
    <nav>
      <Link href="/">
        View All
      </Link>
      {authStatus === 'authenticated' && (
        <>
          <Link href="/activity/my?state=Published">
            Published
          </Link>
          <Link href="/activity/my?state=Draft">
            Drafts
          </Link>
          <Link href="/activity/my?state=Archived">
            Archived
          </Link>
        </>
      )}
    </nav >
  )
}
export default ActivityNavPublishing;
