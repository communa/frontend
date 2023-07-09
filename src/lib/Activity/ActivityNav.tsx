import { useAccount } from 'wagmi';
import Link from 'next/link';
import { useContext } from 'react';

import { APIContext } from 'src/contexts/Api';
import { getJwtLocalStorage } from 'src/contexts/Auth';
import { IActivity } from 'src/interface/IActivity';

interface ActivityShortProps extends React.HTMLAttributes<HTMLElement> {
  activity: IActivity;
}

const ActivityNav = ({ activity }: ActivityShortProps) => {
  const api = useContext(APIContext);
  const { address } = useAccount();

  if (!activity.user) {
    return null;
  }
  const onDelete = () => {
    const jwt = getJwtLocalStorage();
    api.query({
      url: `/api/activity/${activity.id}`,
      method: 'DELETE',
      headers: {
        Authorization: jwt?.access
      },
      data: {
      }
    });
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
