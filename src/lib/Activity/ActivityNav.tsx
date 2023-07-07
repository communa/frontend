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
  if (activity.user && activity.user.addess !== address) {
    return null;
  }

  return (
    <nav>
      {activity.user.address}
      <button>Edit</button>
      <button>Delete</button>
    </nav>
  )
}
export default ActivityNav;
