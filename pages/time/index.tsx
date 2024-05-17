import Head from 'next/head';
import moment from 'moment';
import {useContext, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';

import Box from '@mui/material/Box';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import InfoIcon from '@mui/icons-material/Info';
import PrintIcon from '@mui/icons-material/Print';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Collapse from '@mui/material/Collapse';
import {Button, Chip, FormControl, NativeSelect, Tooltip} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import {API_HOST, APP_NAME} from 'src/config/consts';
import MenuMain from 'src/lib/Layout/MenuMain';
import {APIContext} from 'src/contexts/Api';
import {ITime} from 'src/interface/ITime';
import {useAuth} from 'src/contexts/Auth';
import {request} from 'src/Utils';
import {IActivity} from 'src/interface/IActivity';
import {TimePageWrapper} from 'src/lib/Wrappers';
import {ITimeTotals} from 'src/interface/ITimeTotals';
import {useNotifications} from 'src/contexts/Notifications';

const Time = () => {
  const router = useRouter();
  const {data, state, query, url} = useContext(APIContext);
  const [open, setOpen] = useState('');

  const [time, setTime] = useState<ITime[]>([]);
  const [totals, setTotals] = useState<ITimeTotals[]>([]);
  const [activities, setActivities] = useState<IActivity[]>([]);
  const {addNotification} = useNotifications();
  const [page, setPage] = useState(0);
  const {userAddress, jwt} = useAuth();
  const {activityId} = router.query;

  // useEffect(() => {
  //   if (!userAddress) {
  //     router.push('/');
  //   }
  // });

  const onScroll = (e: any) => {
    const {scrollTop, clientHeight, scrollHeight} = e.nativeEvent.srcElement;
    const canFetch = scrollTop + clientHeight + 150 < scrollHeight;

    if (!canFetch && state !== 'progress') {
      loadTime();
    }
  };

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
      setTime([...time, ...data[0]]);
    }
  }, [data]);

  const loadTime = () => {
    if (router.query.filter) {
      data.filter = {
        keywords: [router.query.filter],
      };
    }

    const filter: any = {};

    if (activityId && activityId !== '0') {
      filter.activityId = activityId;
    }

    query({
      url: `/api/time/search`,
      method: 'POST',
      headers: {
        Authorization: jwt?.access,
      },
      data: {
        filter,
        sort: {createdAt: 'DESC'},
        page,
      },
    });

    setPage(page + 1);
  };

  const loadActivities = async () => {
    const response = await request({
      url: `${API_HOST}/api/activity/search/business`,
      method: 'POST',
      headers: {
        Authorization: jwt?.access,
      },
      data: {
        filter: {
          state: 'Published',
          type: 'Personal',
        },
        sort: {createdAt: 'ASC'},
        page: 0,
      },
    });

    setActivities(response.data[0]);
  };

  const loadTotals = async () => {
    const response = await request({
      url: `${API_HOST}/api/time/totals`,
      method: 'GET',
      headers: {
        Authorization: jwt?.access,
      },
    });

    setTotals(response.data);
  };

  const onDelete = async (activity: IActivity) => {
    await request({
      url: `${API_HOST}/api/activity/${activity.id}`,
      method: 'DELETE',
      headers: {
        Authorization: jwt?.access,
      },
    });
    addNotification({
      title: 'Your project was removed',
      subtitle: '',
    });

    setTimeout(loadActivities, 1000);
  };

  const onMoreClick = (id: string) => {
    id === open ? setOpen('') : setOpen(id);
  };

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
    <TimePageWrapper onScroll={e => onScroll(e)}>
      <Head>
        <title>Timesheets - {APP_NAME}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <main id="timesheets">
        <MenuMain />
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
                  <option value="0">View All</option>
                  {activities.map(a => {
                    return <option value={a.id}>{a.title}</option>;
                  })}
                </NativeSelect>
              </FormControl>
            </p>
            <p>
              <Link href={`/activity/newPersonal`}>
                <button className="apply small">
                  <AccessTimeIcon />
                  Start a project
                </button>
              </Link>
            </p>
          </nav>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Project name</TableCell>
                  <TableCell align="left"></TableCell>
                  <TableCell align="left" className="tooltip">
                    <Tooltip
                      title="Refers to all the time since the start of the time tracking application"
                      placement="top"
                    >
                      <span>
                        Time total
                        <InfoIcon />
                      </span>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="left" className="tooltip">
                    <Tooltip
                      title="Represents active time within a ten-minute block of collected data"
                      placement="top"
                    >
                      <span>
                        Time active
                        <InfoIcon />
                      </span>
                    </Tooltip>
                  </TableCell>
                  <TableCell width="10%" align="left" className="tooltip">
                    <Tooltip
                      title="Accurate measurement of keystrokes to assess typing productivity and time allocation"
                      placement="top"
                    >
                      <span>
                        Keyboard <InfoIcon />
                      </span>
                    </Tooltip>
                  </TableCell>
                  <TableCell width="10%" align="left" className="tooltip">
                    <Tooltip
                      title="Monitoring and recording of mouse clicks to evaluate task engagement and time spent on different activities"
                      placement="top"
                    >
                      <span>
                        Mouse
                        <InfoIcon />
                      </span>
                    </Tooltip>
                  </TableCell>
                  <TableCell width="15%" align="left" className="tooltip">
                    <Tooltip
                      title="Tracking and analysis of mouse movements to understand workflow patterns and optimize productivity levels"
                      placement="top"
                    >
                      <span>
                        Mouse distance
                        <InfoIcon />
                      </span>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activities.map((activity: IActivity) => {
                  let total = totals.find(
                    (t: ITimeTotals) => t.activityId === activity.id
                  );

                  if (!total) {
                    total = {
                      activityId: activity.id,
                      minutes: 0,
                      minutesActive: 0,
                      keyboardKeys: 0,
                      mouseKeys: 0,
                      mouseDistance: 0,
                      rateHour: activity.rateHour,
                      rateTotal: 0,
                    };
                  }

                  const hoursTotal =
                    (total.minutes - (total.minutes % 60)) / 60;
                  const minutesTotal = total.minutes - hoursTotal * 60;
                  const minutesActive = total.minutesActive;
                  const hoursActiveTotal =
                    (minutesActive - (minutesActive % 60)) / 60;
                  const minutesActiveTotal =
                    minutesActive - hoursActiveTotal * 60;

                  return (
                    <>
                      <TableRow
                        key={activity.id}
                        sx={{'& > *': {borderBottom: 'unset'}}}
                      >
                        <TableCell align="left" className="title">
                          {activity?.title}
                        </TableCell>
                        <TableCell align="left">
                          <Chip
                            label={`${total.rateTotal.toFixed(1)} USD`}
                            color="primary"
                            variant="filled"
                          />
                          <IconButton
                            style={{marginLeft: 10}}
                            aria-label="expand row"
                            size="large"
                            onClick={() => onMoreClick(activity.id)}
                          >
                            {open === activity.id ? (
                              <KeyboardArrowUpIcon />
                            ) : (
                              <KeyboardArrowDownIcon />
                            )}
                          </IconButton>
                        </TableCell>
                        <TableCell align="left">
                          {hoursTotal} hr
                          <br />
                          {minutesTotal} min <br />
                        </TableCell>
                        <TableCell align="left">
                          {hoursActiveTotal} hr
                          <br />
                          {minutesActiveTotal} min
                          <br />
                        </TableCell>
                        <TableCell align="center">
                          {total.keyboardKeys}
                        </TableCell>
                        <TableCell align="center">{total.mouseKeys}</TableCell>
                        <TableCell align="center">
                          {total.mouseDistance}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{borderBottom: 'none'}}
                          style={{paddingBottom: 0, paddingTop: 0}}
                          colSpan={12}
                        >
                          <Collapse
                            in={open === activity.id}
                            timeout="auto"
                            unmountOnExit
                          >
                            <Box>
                              <div className="full">
                                <div className="top">
                                  <div>
                                    <p>
                                      Started at{' '}
                                      {moment(activity.createdAt).format('LLL')}
                                    </p>
                                    <p>
                                      {activity.state} | {activity.type}
                                    </p>
                                    <p>{activity.rateHour} USD/hr.</p>
                                    <br />
                                    <div
                                      className="body"
                                      dangerouslySetInnerHTML={{
                                        __html: activity.text,
                                      }}
                                    />
                                  </div>
                                  <div className="actions">
                                    <Link
                                      target="_blank"
                                      href={`/time/report?activityId=${activity?.id}`}
                                    >
                                      <button className="apply small">
                                        <PrintIcon />
                                        Invoice
                                      </button>
                                    </Link>
                                    <Link
                                      href={`/activity/${activity.id}/edit`}
                                    >
                                      <button className="apply small">
                                        <EditIcon />
                                        Edit
                                      </button>
                                    </Link>
                                    <button
                                      className="apply small"
                                      onClick={() => onDelete(activity)}
                                    >
                                      <DeleteIcon />
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <br />
          <br />
          <h2>{activity ? `Worklogs - ${activity.title}` : `Worklogs`}</h2>
          <TableContainer>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Date (from - to)</TableCell>
                  <TableCell align="left">Project name</TableCell>
                  <TableCell align="left">Note</TableCell>
                  <TableCell width="10%" align="left">
                    Time active
                  </TableCell>
                  <TableCell width="10%" align="left">
                    Keyboard
                  </TableCell>
                  <TableCell width="10%" align="left">
                    Mouse
                  </TableCell>
                  <TableCell width="10%" align="left">
                    Mouse distance
                  </TableCell>
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
