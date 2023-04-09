import moment from 'moment';
import Link from 'next/link';
import { IActivity } from 'src/interface/IActivity';

import { ActivityWrapper } from './Wrappers';

interface ActivityShortProps extends React.HTMLAttributes<HTMLElement> {
  activity: IActivity;
}

const ActivityShort = ({ activity }: ActivityShortProps) => {
  return (
    <ActivityWrapper>
      <article key={activity.id}>
        <p className="date">
          {moment(activity.createdAt).format('LLL')}
        </p>
        <Link href={`/activity/${activity.id}`}>
          {activity.title}
        </Link>
        {activity.position && <p>{activity.position}</p>}
        {activity.employment && <p>{activity.employment}</p>}
        {activity.location && <p>{activity.location}</p>}
        {activity.salary && <p>{activity.salary}</p>}

        {activity.keywords && (
          <p className="keywords">
            {activity.keywords.map(k => {
              return (
                <span key={k}>{k}</span>
              );
            })}
          </p>
        )}
        <div className="body">
          {activity.text}
        </div>
      </article>
    </ActivityWrapper>
  )
}
export default ActivityShort;
