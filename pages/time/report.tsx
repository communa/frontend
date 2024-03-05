import Head from 'next/head';
import moment from 'moment';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';

import {API_HOST, APP_NAME} from 'src/config/consts';
import {getJwtLocalStorage} from 'src/contexts/Auth';
import {request} from 'src/Utils';
import {TimeReportWrapper} from 'src/lib/Wrappers';
import {Chip} from '@mui/material';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Link from 'next/link';
import {ITimeTotals} from 'src/interface/ITimeTotals';
import {ITime} from 'src/interface/ITime';
import {IActivity} from 'src/interface/IActivity';

const TimeReport = () => {
  const router = useRouter();
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
        Authorization: getJwtLocalStorage()?.access
      }
    });
    const responseActivity = await request({
      url: `${API_HOST}/api/activity/${activityId}`,
      method: 'GET',
      headers: {
        Authorization: getJwtLocalStorage()?.access
      }
    });

    setReport(responseReport.data);
    setActivity(responseActivity.data);

    setTimeout(() => {
      print();
    }, 2000);
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
        <div id="logo">
          <picture>
            <img
              src="/logo.png"
              width={100}
              height={100}
              alt="Landscape picture"
            />
          </picture>  
        </div>
        <h1>{activity?.title}</h1>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Project</TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left">Minutes</TableCell>
                <TableCell align="left">Minutes active</TableCell>
                <TableCell align="left">Keyboard</TableCell>
                <TableCell align="left">Mouse</TableCell>
                <TableCell align="left">Mouse distance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {report && activity && report.totals.map((t: ITimeTotals) => {
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
                    <TableCell align="left">{t.minutes * 10}</TableCell>
                    <TableCell align="left">{t.minutesActive}</TableCell>
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
        <h1>Timesheets (active sessions)</h1>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Date (from - to)</TableCell>
                <TableCell align="left">Minutes active</TableCell>                  
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
                    {moment(t.fromAt).format('DD-MM-YY HH:mm')} -&nbsp;
                    {moment(t.toAt).format('HH:mm')}
                  </TableCell>
                  <TableCell align="left">{t.minutesActive}</TableCell>
                  <TableCell align="left">{t.keyboardKeys}</TableCell>
                  <TableCell align="left">{t.mouseKeys}</TableCell>
                  <TableCell align="left">{t.mouseDistance}</TableCell>
                  <TableCell align="left">{t.note}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </main>
    </TimeReportWrapper>
  );
};

export default TimeReport;