import moment from 'moment';
import Link from 'next/link';
import { IActivity } from 'src/interface/IActivity';

import { ActivityWrapper } from './Wrappers';
import ActivityNav from './ActivityNav';

interface ActivityShortProps extends React.HTMLAttributes<HTMLElement> {
  activity: IActivity;
}

const ActivityShort = ({ activity }: ActivityShortProps) => {
  const keywords = [
    ...activity.keywords ? activity.keywords : [],
    ...[
      activity.position,
      activity.employment,
      activity.location,
      activity.salary,
    ].filter(n => n),
  ];

  return (
    <ActivityWrapper>
      <article key={activity.id} className='short'>
        <ActivityNav activity={activity} />
        <p className="date">
          {moment(activity.createdAt).format('LLL')}
        </p>
        <Link href={`/activity/${activity.id}`}>
          {activity.title}
        </Link>

        {keywords.length > 0 && (
          <p className="keywords">
            {keywords.map(k => {
              return (
                <span key={k}>{k}</span>
              );
            })}
          </p>
        )}
        <div className="body" dangerouslySetInnerHTML={{
          __html: activity.text
        }} />
      </article>
    </ActivityWrapper>
  )
}
export default ActivityShort;
