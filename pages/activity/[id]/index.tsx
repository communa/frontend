import { useContext, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router'
import Error from 'next/error'

import { APIContext } from '../../../src/contexts/Api';
import { EntryWrapper } from '../../../src/lib/Wrappers';

const Activity: NextPage = () => {
  const router = useRouter();
  const { data, error, state, query } = useContext(APIContext);
  const id = router.query.id as string

  useEffect(() => {
    if (id) {
      query({
        url: `/api/activity/${id}`,
        method: 'GET',
      });
    }
  }, [id])

  console.log('----- >', error, state, id);

  if (error) {
    return (
      <EntryWrapper>
        <Error statusCode={404} title="This page could not be found." />
      </EntryWrapper>
    );
  }

  return (
    <EntryWrapper>
      <Head>
        <title>{data.title} - Communa.Network</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="index, follow" />
        <meta name="description" content="About page" />
      </Head>
      <hr />
      {data.id}
      <hr />
      {data.title}
      <hr />
      {data.text}
    </EntryWrapper>
  );
};

export default Activity;