import Link from 'next/link';
import {useContext} from 'react';

import {APIContext} from 'src/contexts/Api';
import {useAuth} from 'src/contexts/Auth';
import {IActivity} from 'src/interface/IActivity';
import {useNotifications} from 'src/contexts/Notifications';
import {useRouter} from 'next/router';
import {Button} from '@mui/material';
import TimerIcon from '@mui/icons-material/Timer';

interface ActivityShortProps extends React.HTMLAttributes<HTMLElement> {
  activity: IActivity;
}

const ActivityNav = ({activity}: ActivityShortProps) => {
  const api = useContext(APIContext);
  const {userAddress, jwt} = useAuth();
  const {addNotification} = useNotifications();
  const router = useRouter();

  if (!activity.user) {
    return null;
  }

  if (activity.user.address !== userAddress) {
    return null;
  }

  const onDelete = () => {
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
    router.push(`/activity?type=Personal&state=Published`);
  }

  return (
    <nav>
      <Link href={`/time?activityId=${activity.id}`}>
        <Button variant='contained' startIcon={<TimerIcon />}>
          Timesheets
        </Button>
      </Link >
      <Link href={`/activity/${activity.id}/edit`}>
        <Button variant='outlined'>
          Edit
        </Button>
      </Link>
      <Button onClick={() => onDelete()} variant='outlined'>Delete</Button>
    </nav >
  )
}
export default ActivityNav;
