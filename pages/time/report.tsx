import Head from 'next/head';
import moment from 'moment';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';

import {Button, Chip} from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import {ITimeTotals} from 'src/interface/ITimeTotals';
import {ITime} from 'src/interface/ITime';
import {IActivity} from 'src/interface/IActivity';
import {useNotifications} from 'src/contexts/Notifications';
import {API_HOST, APP_NAME} from 'src/config/consts';
import {useAuth} from 'src/contexts/Auth';
import {request} from 'src/Utils';
import {TimeReportWrapper} from 'src/lib/Wrappers';

const TimeReport = () => {
  const router = useRouter();
  const {addNotification} = useNotifications();
  const {jwt} = useAuth();

  const {activityId} = router.query;
  const [report, setReport] = useState<{
    totals: ITimeTotals[],
    time: ITime[]
  }>();
  const [activity, setActivity] = useState<IActivity>();

  useEffect(() => {
    if (activityId) {
      loadTotals();
    }
  }, [activityId]);

  const loadTotals = async () => {
    const responseReport = await request({
      url: `${API_HOST}/api/time/report/${activityId}`,
      method: 'GET',
      headers: {
        Authorization: jwt?.access
      }
    });
    const responseActivity = await request({
      url: `${API_HOST}/api/activity/${activityId}`,
      method: 'GET',
      headers: {
        Authorization: jwt?.access
      }
    });

    setReport(responseReport.data);
    setActivity(responseActivity.data);
  }

  const printReport = () => {
    print();
    addNotification({
      title: 'Printing report',
      subtitle: '',
    });
  }

  return (
    <TimeReportWrapper>
      <Head>
        <title>Report {activity?.title} - {APP_NAME}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/logo-testnet.png" />
      </Head>
      <main>
        <nav>
          <div id="logo">
            <Link href='/time' id="logo">
              <picture>
                <img
                  src="/logo.png"
                  width={100}
                  height={100}
                  alt="Landscape picture"
                />
              </picture>
            </Link>
          </div>
          <h1>{activity?.title}</h1>
          <Button
            variant="outlined"
            color="primary"
            size="medium"
            startIcon={<PrintIcon />}
            onClick={() => printReport()}
          >
            Print
          </Button>
        </nav>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Project</TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left">Time total</TableCell>
                <TableCell align="left">Time active</TableCell>
                <TableCell align="left">Keyboard</TableCell>
                <TableCell align="left">Mouse</TableCell>
                <TableCell align="left">Mouse distance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {report && activity && report.totals.map((t: ITimeTotals) => {

                const minutes = t.minutes * 10;
                const hoursTotal = (minutes - (minutes % 60)) / 60;
                const minutesTotal = minutes - (hoursTotal * 60);

                const minutesActive = t.minutesActive;
                const hoursActiveTotal = (minutesActive - (minutesActive % 60)) / 60;
                const minutesActiveTotal = minutesActive - (hoursActiveTotal * 60);

                return (
                  <TableRow
                    key={t.activityId}
                  >
                    <TableCell align="left">
                      <Link href={`/activity/${activity?.id}`}>
                        {activity.title}
                      </Link>
                    </TableCell>
                    <TableCell align="left">
                      <Chip
                        label={`${Number(activity?.rateHour) * t.minutes / 10} USD`}
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
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <br />
        <h2>Worklogs</h2>
        <TableContainer>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Date (from - to)</TableCell>
                <TableCell align="left">Time active</TableCell>
                <TableCell align="left">Keyboard</TableCell>
                <TableCell align="left">Mouse</TableCell>
                <TableCell align="left">Mouse distance</TableCell>
                <TableCell align="left">Note</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {report && activity && report.time.map(t => (
                <TableRow
                  key={t.id}
                  className={`activeMinutes __${t.minutesActive}`}
                >
                  <TableCell align="left">
                    {moment(t.fromAt).format('MMM Do Y HH:mm')}-
                    {moment(t.toAt).format('HH:mm')}
                  </TableCell>
                  <TableCell align="left">{t.minutesActive} min</TableCell>
                  <TableCell align="left">{t.keyboardKeys}</TableCell>
                  <TableCell align="left">{t.mouseKeys}</TableCell>
                  <TableCell align="left">{t.mouseDistance}</TableCell>
                  <TableCell align="left">{t.note}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <p className="note">
          This report has been prepared by Communa Network using the Communa time tracking application.<br />
          We utilize keyboard and mouse activity data to measure active time accurately.<br />
          Only active time multiplied by the hourly rate is eligible for payment.<br />
          http://communa.network
          <br />
          <br />
        </p>
      </main>
    </TimeReportWrapper>
  );
};

export default TimeReport;