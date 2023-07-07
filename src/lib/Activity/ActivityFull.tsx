import moment from 'moment';
import Link from 'next/link';
import { IActivity } from 'src/interface/IActivity';

import { ActivityWrapper } from './Wrappers';
import { useAccount } from 'wagmi';
import ActivityNav from './ActivityNav';

interface ActivityShortProps extends React.HTMLAttributes<HTMLElement> {
  activity: IActivity;
}

const ActivityFull = ({ activity }: ActivityShortProps) => {
  const info = [
    activity.position,
    activity.employment,
    activity.location,
    activity.salary,
  ].filter(n => n).flat();

  return (
    <ActivityWrapper>
      <ActivityNav activity={activity} />
      <article key={activity.id}>
        <p className="date">
          {moment(activity.createdAt).format('LLL')}
        </p>
        <Link href={`/activity/${activity.id}`}>
          {activity.title}
        </Link>
        {info.length > 0 && (
          <p className="info">
            {info.map(text => <span key={text}>{text}</span>)}
          </p>
        )}

        {activity.keywords && (
          <p className="keywords">
            {activity.keywords.map(k => {
              return (
                <span key={k}>{k}</span>
              );
            })}
          </p>
        )}
        <div className="body" dangerouslySetInnerHTML={{
          __html: activity.text
        }} />
        <a href={activity.jobUrl} className="apply">
          Apply Now
        </a>
      </article>
    </ActivityWrapper>
  )
}
export default ActivityFull;
