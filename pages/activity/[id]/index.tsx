import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router'

const Activity: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string

  return (
    <div>
      <Head>
        <title>Activity - Communa.Network</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="index, follow" />
        <meta name="description" content="About page" />
      </Head>
      Activity {id}

    </div >
  );
};

export default Activity;