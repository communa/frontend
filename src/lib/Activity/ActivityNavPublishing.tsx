import Link from 'next/link';

interface ActivityNavPublishingProps extends React.HTMLAttributes<HTMLElement> {
  state: string
}

const ActivityNavPublishing = ({ state }: ActivityNavPublishingProps) => {
  return (
    <nav>
      <Link href="/">
        View All
      </Link>
      <Link href="/activity/my?state=published">
        Published
      </Link>
      <Link href="/activity/my?state=draft">
        Drafts
      </Link>
      <Link href="/activity/my?state=archived">
        Archived
      </Link>
      {/* <Link href="/activity/new">
        Publish a Job
      </Link> */}
    </nav >
  )
}
export default ActivityNavPublishing;
