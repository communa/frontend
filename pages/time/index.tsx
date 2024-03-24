import Head from 'next/head';
import moment from 'moment';
import {useContext, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';

import AddIcon from '@mui/icons-material/Add';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PrintIcon from '@mui/icons-material/Print';
import {Button, Chip, FormControl, NativeSelect, Tooltip} from '@mui/material';

import {API_HOST, APP_NAME} from 'src/config/consts';
import MenuLeft from 'src/lib/Layout/MenuLeft';
import {APIContext} from 'src/contexts/Api';
import {ITime} from 'src/interface/ITime';
import {useAuth} from 'src/contexts/Auth';
import {request} from 'src/Utils';
import {IActivity} from 'src/interface/IActivity';
import {TimePageWrapper} from 'src/lib/Wrappers';
import {ITimeTotals} from 'src/interface/ITimeTotals';

const Time = () => {
  const router = useRouter();
  const {data, state, query, url} = useContext(APIContext);

  const [time, setTime] = useState<ITime[]>([]);
  const [totals, setTotals] = useState([]);
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [page, setPage] = useState(0);
  const {jwt} = useAuth();
  const {activityId} = router.query;

  const onScroll = (e: any) => {
    const {
      scrollTop,
      clientHeight,
      scrollHeight,
    } = e.nativeEvent.srcElement;
    const canFetch = scrollTop + clientHeight + 150 < scrollHeight;

    if (!canFetch && state !== 'progress') {
      loadTime();
    }
  }

  useEffect(() => {
    setPage(0);
    setTime([]);

    console.log('activityId >>>', activityId, page);

    loadActivities();
    loadTotals();
    loadTime();
  }, [activityId]);

  useEffect(() => {
    if (state === 'ready' && data && data[0] && url === '/api/time/search') {
      setTime([
        ...time,
        ...data[0],
      ]);
    }
  }, [data]);

  const loadTime = () => {
    if (router.query.filter) {
      data.filter = {
        keywords: [router.query.filter]
      }
    }

    const filter: any = {};

    if (activityId && activityId !== '0') {
      filter.activityId = activityId;
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

  const loadTotals = async () => {
    const response = await request({
      url: `${API_HOST}/api/time/totals`,
      method: 'GET',
      headers: {
        Authorization: jwt?.access
      }
    });

    setTotals(response.data);
  }

  const onActivityChange = (event: any) => {
    const activityId = event.target.value;

    setPage(0);

    if (activityId) {
      router.push(`/time?activityId=${activityId}`);
    } else {
      router.push(`/time`);
    }
  };

  const activity = activities.find(a => a.id === activityId);

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
            <p>
              <h1>Dashboard</h1>
              <FormControl id="activities">
                <NativeSelect
                  id="activitySelected-small"
                  value={activityId ? activityId : 0}
                  onChange={onActivityChange}
                >
                  <option value="0">
                    View All
                  </option>
                  {activities.map(a => {
                    return (
                      <option value={a.id}>{a.title}</option>
                    )
                  })}
                </NativeSelect>
              </FormControl>
            </p>
            <p>
              <Link href="/activity?type=Personal&state=Published">
                <Button
                  variant="contained"
                  color="primary"
                >
                  Projects
                </Button>
              </Link>
              <Link href={`/activity/newPersonal`}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                >
                  Add project
                </Button>
              </Link>
            </p>
          </nav>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Project</TableCell>
                  <TableCell align="left"></TableCell>
                  <TableCell align="left" className="tooltip">
                    <Tooltip
                      title="Refers to all the time since the start of the time tracking application"
                      placement="top"
                    >
                      <span>Time total</span>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="left" className="tooltip">
                    <Tooltip
                      title="Represents the recorded time using keyboard and mouse activity data"
                      placement="top"
                    >
                      <span>Time active</span>
                    </Tooltip>
                  </TableCell>
                  <TableCell width="10%" align="left" className="tooltip">
                    <Tooltip
                      title="Counts keystrokes                      "
                      placement="top"
                    >
                      <span>Keyboard</span>
                    </Tooltip>
                  </TableCell>
                  <TableCell width="10%" align="left" className="tooltip">
                    <Tooltip
                      title="Track mouse clicks"
                      placement="top"
                    >
                      <span>Mouse</span>
                    </Tooltip>
                  </TableCell>
                  <TableCell width="10%" align="left" className="tooltip">
                    <Tooltip
                      title="Tracks mouse movements"
                      placement="top"
                    >
                      <span>Mouse distance</span>
                    </Tooltip>
                  </TableCell>
                  <TableCell width="1%" align="left"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {totals.map((t: ITimeTotals) => {
                  const activity = activities.find(a => a.id === t.activityId);

                  if (activity) {
                    const minutes = t.minutes * 10;
                    const hoursTotal = (minutes - (minutes % 60)) / 60;
                    const minutesTotal = minutes - (hoursTotal * 60);

                    const minutesActive = t.minutesActive;
                    const hoursActiveTotal = (minutesActive - (minutesActive % 60)) / 60;
                    const minutesActiveTotal = minutesActive - (hoursActiveTotal * 60);

                    const total = Number((activity?.rateHour) * (t.minutes * 10 / 60)).toFixed(1);
                    return (
                      <TableRow
                        key={activity.id}
                      >
                        <TableCell align="left" className="title">
                          <Link href={`/activity/${activity?.id}`}>
                            {activity?.title}
                          </Link>
                          {/* &nbsp; {activity?.rateHour} */}
                          {/* ={t.minutes * 10 / 60} */}
                        </TableCell>
                        <TableCell align="left">
                          <Chip
                            label={`${total} USD`}
                            color="primary"
                            variant="filled"
                          />
                        </TableCell>
                        <TableCell align="left">
                          {hoursTotal} hr<br />
                          {minutesTotal} min <br />
                          {/* ({t.minutes * 10}) */}
                        </TableCell>
                        <TableCell align="left">
                          {hoursActiveTotal} hr<br />
                          {minutesActiveTotal} min<br />
                          {/* ({t.minutesActive}) */}
                        </TableCell>
                        <TableCell align="left">{t.keyboardKeys}</TableCell>
                        <TableCell align="left">{t.mouseKeys}</TableCell>
                        <TableCell align="left">{t.mouseDistance}</TableCell>
                        <TableCell width="1%" align="right">
                          <Link
                            href={`/time/report?activityId=${activity?.id}`}
                          >
                            <Button
                              size="small"
                              variant='outlined'
                              startIcon={<PrintIcon />}>
                              Invoice
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    )
                  }
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <br />
          <br />
          <h2>
            {
              activity
                ? `Worklogs - ${activity.title}`
                : `Worklogs`
            }
          </h2>
          <TableContainer>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Date (from - to)</TableCell>
                  <TableCell align="left">Project</TableCell>
                  <TableCell align="left">Note</TableCell>
                  <TableCell width="10%" align="left">Time active</TableCell>
                  <TableCell width="10%" align="left">Keyboard</TableCell>
                  <TableCell width="10%" align="left">Mouse</TableCell>
                  <TableCell width="10%" align="left">Mouse distance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {time.map(t => (
                  <TableRow
                    key={t.id}
                    className={`activeMinutes __${t.minutesActive}`}
                  >
                    <TableCell align="left">
                      {moment(t.fromAt).format('MMM Do Y HH:mm')}-
                      {moment(t.toAt).format('HH:mm')}
                    </TableCell>
                    <TableCell align="left">
                      <Link href={`/activity/${t.activity.id}`}>
                        {t.activity.title}
                      </Link>
                    </TableCell>
                    <TableCell align="left">{t.note}</TableCell>
                    <TableCell align="left">{t.minutesActive} min</TableCell>
                    <TableCell align="left">{t.keyboardKeys}</TableCell>
                    <TableCell align="left">{t.mouseKeys}</TableCell>
                    <TableCell align="left">{t.mouseDistance}</TableCell>
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