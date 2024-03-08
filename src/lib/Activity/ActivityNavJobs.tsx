import Link from 'next/link';
import {useAuth} from 'src/contexts/Auth';
import {JOB_KEYWORDS} from 'src/config/consts';

const ActivityNavJobs = () => {
  const {userAddress} = useAuth();

  return (
    <nav className="links">
      <Link href="/">
        View All
      </Link>
      {userAddress && (
        <>
          {JOB_KEYWORDS.map(k => {
            return (
              <Link href={`/?filter=${k}`} key={k}>
                {k}
              </Link>
            );
          })}
        </>
      )}
    </nav>
  )
}
export default ActivityNavJobs;
