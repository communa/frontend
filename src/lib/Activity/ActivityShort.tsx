import moment from 'moment';
import Link from 'next/link';
import {IActivity} from 'src/interface/IActivity';

import {ActivityWrapper} from './Wrappers';
import ActivityNav from './ActivityNav';
import {Chip} from '@mui/material';
import {EActivityType} from 'src/interface/EActivityType';

interface ActivityShortProps extends React.HTMLAttributes<HTMLElement> {
  activity: IActivity;
}

const ActivityShort = ({activity}: ActivityShortProps) => {
  const keywords = [
    ...activity.keywords ? activity.keywords : [],
    ...[
      activity.position,
      activity.employment,
      activity.location,
      activity.salary,
    ].filter(n => n),
  ];

  const isPersonal = activity.type === EActivityType.PERSONAL;
  const isImported = activity.jobUrl && activity.type === EActivityType.IMPORT;

  return (
    <ActivityWrapper className='short'>
      <article key={activity.id}>
        <ActivityNav activity={activity} />
        <p className="date">
          <>
            {moment(activity.createdAt).format('LLL')}
          </>
        </p>
        <Link href={`/activity/${activity.id}`}>
          {activity.title}
        </Link>
        {!isPersonal && keywords && (
          <p className="keywords">
            <Chip
              label={activity.type}
              color="success"
              variant="filled"
            />
            {!isImported && (
              <Chip
                label={`${activity.rateHour} USD`}
                color="primary"
                variant="filled"
              />
            )}
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
