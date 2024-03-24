import {useContext, useEffect, useState} from 'react';
import moment from 'moment';
import {GetServerSidePropsContext, InferGetServerSidePropsType} from 'next'
import {GetServerSideProps} from 'next'
import Head from 'next/head';
import Link from 'next/link';
import {Button, Chip, Paper} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TimerIcon from '@mui/icons-material/Timer';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import {PageWrapper} from 'src/lib/Wrappers';
import {IActivity} from 'src/interface/IActivity';
import {APP_NAME} from 'src/config/consts';
import {APIContext} from 'src/contexts/Api';
import {useAuth} from 'src/contexts/Auth';
import ActivityNavPublishing from 'src/lib/Activity/ActivityNavPublishing';
import MenuLeft from 'src/lib/Layout/MenuLeft';

import HowItWorksImage from 'src/assets/Illustration-6.png';
import {useNotifications} from 'src/contexts/Notifications';

export const getServerSideProps: GetServerSideProps<{
  state: string,
  type: string
}> = async (context: GetServerSidePropsContext) => {
  const {state, type} = context.query;

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
  const {jwt} = useAuth();
  const {addNotification} = useNotifications();

  useEffect(() => {
    if (api.state === 'ready' && api.data && api.data[0]) {
      setActivities([
        ...activities,
        ...api.data[0],
      ]);
    }
  }, [api.data]);

  useEffect(() => {
    loadActivities();
  }, [state, type]);

  const loadActivities = () => {
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
  }

  const onDelete = (activity: IActivity) => {
    api.query({
      url: `/api/activity/${activity.id}`,
      method: 'DELETE',
      headers: {
        Authorization: jwt?.access
      }
    });
    addNotification({
      title: 'Your project was removed',
      subtitle: '',
    });

    setTimeout(loadActivities, 1000);
  }

  return (
    <PageWrapper>
      <Head>
        <title>Remote jobs in web3 - {APP_NAME}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="index, follow" />
        <meta name="description" content={APP_NAME} />
        <link rel="icon" href="/logo-testnet.png" />
      </Head>
      <main>
        <MenuLeft />
        <article>
          <nav className="actions">
            <p>
              <h2>All projects</h2>
              <ActivityNavPublishing />
            </p>
            <Link href={`/activity/newPersonal`}>
              <Button variant='contained' startIcon={<AddIcon />}>
                New project
              </Button>
            </Link>
          </nav>
          {activities.length !== 0 && (
            <TableContainer>
              <Table component={Paper}>
                <TableHead>
                  <TableRow>
                    <TableCell width="20%" align="left">Created</TableCell>
                    <TableCell width="20%" align="left">Title</TableCell>
                    <TableCell width="20%" align="left">Rate</TableCell>
                    <TableCell width="30%" align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {activities.map(a => {
                    return (
                      <TableRow
                        key={a.id}
                      >
                        <TableCell align="left">
                          {moment(a.createdAt).format('LLL')}
                        </TableCell>
                        <TableCell align="left">
                          <Link href={`/activity/${a.id}`}>
                            {a.title}
                          </Link>
                        </TableCell>
                        <TableCell align="left">
                          <Chip
                            label={`${a.rateHour} USD`}
                            color="primary"
                            variant="filled"
                          />
                        </TableCell>
                        <TableCell align="left">
                          <Link href={`/time?activityId=${a.id}`}>
                            <Button variant='text' startIcon={<TimerIcon />}>
                              Timesheets
                            </Button>
                          </Link >
                          <Link href={`/activity/${a.id}/edit`}>
                            <Button variant='text' color='info'>
                              Edit
                            </Button>
                          </Link>
                          <Button onClick={() => onDelete(a)} variant='text'>Delete</Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
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
