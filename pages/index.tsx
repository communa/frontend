import { InferGetServerSidePropsType } from 'next'
import { GetServerSideProps } from 'next'
import Head from 'next/head';
import Link from 'next/link'

import { request } from '../src/Utils';
import { HomePageWrapper } from '../src/lib/Wrappers';
import { IActivitySearch } from '../src/interface/IActivity';
import Header from '../src/lib/layout/Header';

export const getServerSideProps: GetServerSideProps<{ search: IActivitySearch }> = async () => {
  const response = await request({
    url: `http://0.0.0.0:4000/api/activity/search`,
    method: 'POST',
    data: {
      filter: {
      },
      sort: { createdAt: 'DESC' },
      page: 0,
    }
  });

  return {
    props: {
      search: response.data,
    },
  }
}

const Home = ({ search }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <HomePageWrapper>
      <Head>
        <title>Home - Communa.Network</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="index, follow" />
        <meta name="description" content="About page" />
      </Head>
      <Header />
      <main>
        <section>
          {
            search[0].map(activity => {
              return (
                <article key={activity.id}>
                  <Link href={`/activity/${activity.id}`}>
                    {activity.title}
                  </Link>
                  <h2>
                    {activity.position}
                  </h2>
                  {activity.text}
                </article>
              )
            })
          }
        </section>
      </main>
    </HomePageWrapper >
  );
};

export default Home;
