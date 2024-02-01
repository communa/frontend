import {useContext} from 'react';
import Head from 'next/head';
import {PageWrapper} from 'src/lib/Wrappers';
import {APP_NAME} from 'src/config/consts'
import {AuthContext} from 'src/contexts/Auth';
import MenuLeft from 'src/lib/Layout/MenuLeft';
import Link from 'next/link';
import {Button, Chip} from '@mui/material';

const ActivityNew = () => {
  const {authStatus} = useContext(AuthContext);

  if (authStatus === 'unauthenticated') {
    return null;
  }

  return (
    <PageWrapper>
      <Head>
        <title>New project - Web3 Jobs - {APP_NAME}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="index, follow" />
        <meta name="description" content={APP_NAME} />
        <link rel="icon" href="/logo-testnet.png" />
      </Head>
      <main id="jobNew">
        <MenuLeft />
        <article>
          <div className="projectType">
            <Link href="/activity/newPersonal">
              <div className='personal'>
                <p>Pesonal project</p>
                <br />
                Personal projects are not viewable by freelancers, which implies they cannot submit applications for your job. Additionally, you cannot directly assign a freelancer.<br />
              </div>
            </Link>
            <div className='contract'>
              <p>Hourly contact <Chip label="To be available in 2024 Q3" /></p>
              <br />
              After publishing your contract, you have the option to select a freelancer or assign a specific one.
            </div>
          </div>
        </article>
      </main>
    </PageWrapper>
  );
};

export default ActivityNew;