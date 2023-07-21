import { useAccount } from 'wagmi';
import Link from 'next/link';
import { useContext } from 'react';

import { APIContext } from 'src/contexts/Api';
import { getJwtLocalStorage } from 'src/contexts/Auth';
import { IActivity } from 'src/interface/IActivity';
import { useNotifications } from 'src/contexts/Notifications';
import { useRouter } from 'next/router';

interface ActivityShortProps extends React.HTMLAttributes<HTMLElement> {
  activity: IActivity;
}

const ActivityNav = ({ activity }: ActivityShortProps) => {
  const api = useContext(APIContext);
  const { address } = useAccount();
  const { addNotification } = useNotifications();
  const router = useRouter();

  if (!activity.user) {
    return null;
  }

  if (activity.user.address !== address) {
    return null;
  }

  const onDelete = () => {
    const jwt = getJwtLocalStorage();
    api.query({
      url: `/api/activity/${activity.id}`,
      method: 'DELETE',
      headers: {
        Authorization: jwt?.access
      }
    });

    addNotification({
      title: 'Your job was removed',
      subtitle: '',
    });
    router.push(`/activity/my?state=published`);
  }

  return (
    <nav>
      <Link href={`/activity/${activity.id}/edit`}>
        Edit
      </Link>
      <button onClick={() => onDelete()}>Delete</button>
    </nav>
  )
}
export default ActivityNav;
