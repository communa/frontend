import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react';
import { APIContext } from '../../../src/contexts/Api';

const Activity: NextPage = () => {
  const router = useRouter();
  const { data, error, state, query } = useContext(APIContext);
  const id = router.query.id as string

  useEffect(() => {
    query({});
  }, [query])

  return (
    <div>
      <Head>
        <title>Activity - Communa.Network</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="index, follow" />
        <meta name="description" content="About page" />
      </Head>
      Activity {id}
      {data} - {error} - {state}

    </div >
  );
};

export default Activity;