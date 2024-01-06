import {useContext} from 'react';
import Head from 'next/head';
import {JobsPageWrapper} from 'src/lib/Wrappers';
import {APP_NAME} from 'src/config/consts'
import {AuthContext} from 'src/contexts/Auth';
import HeaderJobs from 'src/lib/Layout/HeaderJobs';
import Link from 'next/link';

const ActivityNew = () => {
  const {authStatus} = useContext(AuthContext);

  if (authStatus === 'unauthenticated') {
    return null;
  }

  return (
    <JobsPageWrapper>
      <Head>
        <title>New project - Web3 Jobs - {APP_NAME}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="index, follow" />
        <meta name="description" content={APP_NAME} />
        <link rel="icon" href="/logo-testnet.png" />
      </Head>
      <main id="jobNew">
        <HeaderJobs />
        <article>
          <div className="projectType">
            <div>
              <Link href="/activity/newPersonal">Pesonal project</Link>
              <br />
              Personal projects are not viewable by freelancers, which implies they cannot submit applications for your job. Additionally, you cannot directly assign a freelancer.<br />
            </div>
            <div>
              <Link href="/activity/newContract">Hourly contact</Link>
              <br />
              After publishing your contract, you have the option to select a freelancer or assign a specific one.
            </div>
          </div>
        </article>
      </main>
    </JobsPageWrapper>
  );
};

export default ActivityNew;