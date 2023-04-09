import moment from 'moment';
import Link from 'next/link';
import { IActivity } from 'src/interface/IActivity';

import { ActivityWrapper } from './Wrappers';

interface ActivityShortProps extends React.HTMLAttributes<HTMLElement> {
  activity: IActivity;
}

const ActivityShort = ({ activity }: ActivityShortProps) => {
  const info = [
    activity.position,
    activity.employment,
    activity.location,
    activity.salary,
  ].filter(n => n);

  return (
    <ActivityWrapper>
      <article key={activity.id}>
        <p className="date">
          {moment(activity.createdAt).format('LLL')}
        </p>
        <Link href={`/${activity.id}`}>
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
      </article>
    </ActivityWrapper>
  )
}
export default ActivityShort;
