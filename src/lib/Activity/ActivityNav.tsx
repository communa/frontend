import Link from 'next/link';
import { IActivity } from 'src/interface/IActivity';
import { useAccount } from 'wagmi';

interface ActivityShortProps extends React.HTMLAttributes<HTMLElement> {
  activity: IActivity;
}

const ActivityNav = ({ activity }: ActivityShortProps) => {
  const { address } = useAccount();

  if (!activity.user) {
    return null;
  }

  return (
    <nav>
      <Link href={`/activity/${activity.id}/edit`}>
        Edit
      </Link>
      <button>Delete</button>
    </nav>
  )
}
export default ActivityNav;
