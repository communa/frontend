import {GetServerSidePropsContext, InferGetServerSidePropsType} from 'next'
import {GetServerSideProps} from 'next'
import Head from 'next/head';
import {useContext, useEffect, useState} from 'react';

import AddIcon from '@mui/icons-material/Add';

import {PageWrapper} from 'src/lib/Wrappers';
import {IActivity} from 'src/interface/IActivity';
import {APP_NAME} from 'src/config/consts';
import {APIContext} from 'src/contexts/Api';
import ActivityShort from 'src/lib/Activity/ActivityShort';
import {getJwtLocalStorage} from 'src/contexts/Auth';
import ActivityNavPublishing from 'src/lib/Activity/ActivityNavPublishing';
import MenuLeft from 'src/lib/Layout/MenuLeft';

import HowItWorksImage from 'src/assets/Illustration-6.png';
import Link from 'next/link';
import {Button} from '@mui/material';

export const getServerSideProps: GetServerSideProps<{
  state: string,
  type: string
}> = async (context: GetServerSidePropsContext) => {
  const {state, type} = context.query;

  console.log(state, type);

  return {
    props: {
      state: state as string,
      type: type as string,
    },
  }
}

const Activity = ({state, type}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const api = useContext(APIContext);
  const [activities, setActivities] = useState<IActivity[]>([]);

  useEffect(() => {
    if (api.state === 'ready' && api.data && api.data[0]) {
      setActivities([
        ...activities,
        ...api.data[0],
      ]);
    }
  }, [api.data]);

  useEffect(() => {
    const jwt = getJwtLocalStorage();
    setActivities([]);

    api.query({
      url: `/api/activity/search/business`,
      method: 'POST',
      headers: {
        Authorization: jwt?.access
      },
      data: {
        filter: {
          state,
          type,
        },
        sort: {createdAt: 'DESC'},
        page: 0,
      }
    });
  }, [state, type]);

  return (
    <PageWrapper>
      <Head>
        <title>Full-time Web3 remote jobs  - {APP_NAME}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="index, follow" />
        <meta name="description" content={APP_NAME} />
        <link rel="icon" href="/logo-testnet.png" />
      </Head>
      <main>
        <MenuLeft />
        <article>
          <nav className="actions">
            <h1>My work</h1>
            <Link href={`/activity/new`}>
              <Button variant='contained' startIcon={<AddIcon />}>
                Add New
              </Button>
            </Link>
          </nav>
          <ActivityNavPublishing />
          {activities.length > 0 && activities.map(activity => {
            return <ActivityShort key={activity.id} activity={activity} />
          })}
          {activities.length === 0 && (
            <>
              {type === 'Contract' ? (
                <p>
                  You have no <strong>{state}</strong> contracts
                </p>
              ) : (
                <p>
                  You have no <strong>Personal</strong> projects
                </p>
              )}
              <picture>
                <img
                  src={HowItWorksImage.src}
                  alt="Work Process"
                  width={600}
                />
              </picture>
            </>
          )}
        </article>
      </main>
    </PageWrapper >
  );
};

export default Activity;
