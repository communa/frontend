import Head from 'next/head';
import moment from 'moment';
import {useContext, useEffect, useState} from 'react';

import {API_HOST, APP_NAME} from 'src/config/consts';
import MenuLeft from 'src/lib/Layout/MenuLeft';
import {APIContext} from 'src/contexts/Api';
import {ITime} from 'src/interface/ITime';
import {getJwtLocalStorage} from 'src/contexts/Auth';
import {request} from 'src/Utils';
import {IActivity} from 'src/interface/IActivity';
import {useRouter} from 'next/router';
import {TimePageWrapper} from 'src/lib/Wrappers';
import {FormControl, NativeSelect} from '@mui/material';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Link from 'next/link';

const Time = () => {
  const router = useRouter();
  const {data, state, query, url} = useContext(APIContext);

  const [time, setTime] = useState<ITime[]>([]);
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [activitySelected, setActivitySelected] = useState<IActivity | null>();
  const [page, setPage] = useState(0);

  const onScroll = (e: any) => {
    const {
      scrollTop,
      clientHeight,
      scrollHeight,
    } = e.nativeEvent.srcElement;
    const canFetch = scrollTop + clientHeight + 150 < scrollHeight;

    if (!canFetch && state !== 'progress') {
      doQuery();
    }
  }

  useEffect(() => {
    setTime([]);
    setPage(0);
    doQuery();
    loadActivities();
  }, [activitySelected]);

  useEffect(() => {
    if (state === 'ready' && data && data[0] && url === '/api/time/search') {
      setTime([
        ...time,
        ...data[0],
      ]);
    }
  }, [data]);

  const doQuery = () => {
    const jwt = getJwtLocalStorage();

    if (router.query.filter) {
      data.filter = {
        keywords: [router.query.filter]
      }
    }

    const filter: any = {};

    if (activitySelected) {
      filter.activityId = activitySelected.id;
    }

    query({
      url: `/api/time/search`,
      method: 'POST',
      headers: {
        Authorization: jwt?.access
      },
      data: {
        filter,
        sort: {createdAt: 'DESC'},
        page,
      }
    });

    setPage(page + 1);
  }

  const loadActivities = async () => {
    const jwt = getJwtLocalStorage();

    const response = await request({
      url: `${API_HOST}/api/activity/search/business`,
      method: 'POST',
      headers: {
        Authorization: jwt?.access
      },
      data: {
        filter: {
          state: 'Published',
          type: 'Personal',
        },
        sort: {createdAt: 'ASC'},
        page: 0,
      }
    });

    setActivities(response.data[0]);
  }

  const onActivityChange = (event: any) => {
    const activity = activities.find(a => a.id === event.target.value);

    setActivitySelected(activity);

    if (activity) {
      router.push(`/time?activityId=${activity.id}`);
    } else {
      router.push(`/time`);
    }
  };

  return (
    <TimePageWrapper onScroll={(e) => onScroll(e)}>
      <Head>
        <title>Timesheets - {APP_NAME}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/logo-testnet.png" />
      </Head>
      <main id="timesheets">
        <MenuLeft />
        <article>
          <nav>
            <h1>Timesheets</h1>
            <FormControl id="activities">
              <NativeSelect
                id="activitySelected-small"
                value={activitySelected ? activitySelected.id : null}
                onChange={onActivityChange}
              >
                <option value="0">
                  View all
                </option>
                {activities.map(a => {
                  return (
                    <option value={a.id}>{a.title}</option>
                  )
                })}
              </NativeSelect>
            </FormControl>
          </nav>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Date</TableCell>
                  <TableCell align="left">Project</TableCell>
                  <TableCell align="left">Keys keyboard</TableCell>
                  <TableCell align="left">Keys mouse</TableCell>
                  <TableCell align="left">Distance mouse</TableCell>
                  <TableCell align="left">Note</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {time.map(t => (
                  <TableRow
                    key={t.id}
                  >
                    <TableCell align="left">{moment(t.fromAt).format('llll')}</TableCell>
                    <TableCell align="left">
                      <Link href={`/activity/${t.activity.id}`}>
                        {t.activity.title}
                      </Link>
                    </TableCell>
                    <TableCell align="left">{t.keyboardKeys}</TableCell>
                    <TableCell align="left">{t.mouseKeys}</TableCell>
                    <TableCell align="left">{t.mouseDistance}</TableCell>
                    <TableCell align="left">{t.note}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </article>
      </main>
    </TimePageWrapper>
  );
};

export default Time;