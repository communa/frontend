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

const ActivityFull = ({activity}: ActivityShortProps) => {
  const keywords = [
    ...activity.keywords ? activity.keywords : [],
    ...[
      activity.position,
      activity.employment,
      activity.location,
      activity.salary,
    ].filter(n => n).flat(),
  ];

  const isImported = activity.jobUrl && activity.type === EActivityType.IMPORT;
  const isPersonal = activity.type === EActivityType.PERSONAL;

  return (
    <ActivityWrapper className="full">
      <ActivityNav activity={activity} />
      <article key={activity.id}>

        <p className="date">
          {activity.user && (
            <>
              By <Link href={`/user/${activity.user.address}`}>
                {activity.user.address}
              </Link>
              <br />
            </>
          )}
          {moment(activity.createdAt).format('LLL')}
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
              <p>
                <Chip
                  label={`${activity.rateHour} USD`}
                  color="primary"
                  variant="filled"
                />
              </p>
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
      {isImported && (
        <a href={activity.jobUrl} className="apply" target="_blank" rel="noreferrer">
          Apply Now
        </a>
      )}
    </ActivityWrapper >
  )
}
export default ActivityFull;
