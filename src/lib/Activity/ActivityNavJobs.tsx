import Link from 'next/link';
import {useContext} from 'react';
import {AuthContext} from 'src/contexts/Auth';
import {JOB_KEYWORDS} from 'src/config/consts';

const ActivityNavJobs = () => {
  const {authStatus} = useContext(AuthContext);
  return (
    <nav className="links">
      <Link href="/">
        View All
      </Link>
      {authStatus === 'authenticated' && (
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
