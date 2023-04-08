import { InferGetServerSidePropsType } from 'next'
import { GetServerSideProps } from 'next'
import moment from 'moment'
import Head from 'next/head';
import Link from 'next/link'

import { request } from 'src/Utils';
import { HomePageWrapper } from 'src/lib/Wrappers';
import { IActivitySearch } from 'src/interface/IActivity';
import { API_HOST, APP_NAME } from 'src/config/consts';

export const getServerSideProps: GetServerSideProps<{ search: IActivitySearch }> = async () => {
  const response = await request({
    url: `${API_HOST}/api/activity/search`,
    method: 'POST',
    data: {
      filter: {
      },
      sort: {
        createdAt: 'DESC'
      },
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

  const onScroll = (e: any) => {
    const {
      scrollTop,
      clientHeight,
      scrollHeight,
    } = e.nativeEvent.srcElement;
    const canFetch = scrollTop + clientHeight < scrollHeight;

    console.log('.... canFetch', canFetch);
  }

  return (
    <HomePageWrapper>
      <Head>
        <title>Jobs - {APP_NAME}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="index, follow" />
        <meta name="description" content="About page" />
      </Head>
      {/* <Header /> */}
      <main onScroll={(e) => onScroll(e)}>
        {
          search[0].map(activity => {
            return (
              <article key={activity.id}>
                <Link href={`/activity/${activity.id}`}>
                  {activity.title}
                </Link>
                {activity.position && (
                  <h2>
                    {activity.position}
                  </h2>
                )}
                <p>
                  {moment(activity.createdAt).format('LLL')}
                </p>
                <div className="body">
                  {activity.text}
                </div>
              </article>
            )
          })
        }
      </main>
    </HomePageWrapper >
  );
};

export default Home;
