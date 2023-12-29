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
          <h2>
            Let's start a project
          </h2>
          <div className="projectType">
            <div>
              <Link href="/activity/newPersonal">New personal project</Link><br/>
            </div>          
            <div>
              <Link href="/activity/newContract">New hourly contact</Link>  
            </div>                      
          </div>
        </article>
      </main>
    </JobsPageWrapper>
  );
};

export default ActivityNew;