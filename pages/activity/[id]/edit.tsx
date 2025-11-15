import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import Head from 'next/head';
import {Editor} from '@tinymce/tinymce-react';
import {useEffect, useRef, useState} from 'react';
import {FormControlLabel, Switch, TextField} from '@mui/material';
import {useRouter} from 'next/router';

import {IActivity} from 'src/interface/IActivity';
import {request} from 'src/Utils';
import {ActivitiyEditWrapper, PageWrapper} from 'src/lib/Wrappers';
import {API_HOST, APP_NAME, TINYMCE_KEY} from 'src/config/consts';
import {useAuth} from 'src/contexts/Auth';
import {useNotifications} from 'src/contexts/Notifications';
import MenuMain from 'src/lib/Layout/MenuMain';
import {EActivityType} from 'src/interface/EActivityType';

export const getServerSideProps: GetServerSideProps<{
  activity: IActivity;
}> = async (context: GetServerSidePropsContext) => {
  const {id} = context.query;
  const response = await request({
    url: `${API_HOST}/api/activity/${id}`,
    method: 'GET',
  });

  return {
    props: {
      activity: response.data,
    },
  };
};

const Activity = ({
  activity,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {addNotification} = useNotifications();
  const router = useRouter();
  const {jwt, userAddress} = useAuth();

  const editorRef = useRef<any>(null);
  const kw = activity.keywords ? activity.keywords.join(',') : '';

  const [text, setText] = useState(activity.text);
  const [state, setState] = useState(activity.state);
  const [title, setTitle] = useState(activity.title);
  const [trackProcesses, setTrackProcesses] = useState(activity.trackProcesses);
  const [trackScreenshots, setTrackScreenshots] = useState(activity.trackScreenshots);
  const [rateHour, setRateHour] = useState(activity.rateHour);
  const [salary, setSalary] = useState(activity.salary);
  const [keywords, setKeywords] = useState(kw);

  useEffect(() => {
    if (userAddress !== activity.user.address) {
      router.push(`/activity}`);
    }
  });

  const onEdit = async () => {
    const text = editorRef.current?.getContent();

    await request({
      url: `${API_HOST}/api/activity/${activity.id}`,
      method: 'PUT',
      headers: {
        Authorization: jwt?.access,
      },
      data: {
        state,
        title,
        text,
        salary,
        rateHour,
        trackProcesses,
        trackScreenshots,
        keywords: keywords.split(','),
      },
    });

    setText(text);

    addNotification({
      title: 'Updates Saved',
      subtitle: '',
    });

    router.push(`/time`);
  };

  return (
    <PageWrapper>
      <Head>
        <title>
          {activity.id} - {APP_NAME}
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="index, follow" />
        <meta name="description" content={activity.title} />
        <link rel="icon" href="/logo.png" />
      </Head>
      <main id="jobEdit">
        <MenuMain />
        <article>
          <nav className="actions">
            <h2>Project edit</h2>
            <button className="apply small" onClick={() => onEdit()}>
              Save changes
            </button>
          </nav>
          <form>
            <ActivitiyEditWrapper>
              <div className="fields">
                <p>
                  You're editing a project for your personal requirements.
                  <br />
                  Personal projects are not viewable by freelancers, which
                  implies they cannot submit applications for your job.
                  Additionally, you cannot directly assign a freelancer.
                  <br />
                </p>
                <TextField
                  label="ID"
                  variant="outlined"
                  placeholder="Id"
                  defaultValue={activity.id}
                  disabled
                />
                <TextField
                  label="Title"
                  variant="outlined"
                  placeholder="Title"
                  defaultValue={title}
                  onChange={e => setTitle(e.target.value)}
                />
                <TextField
                  label="Hourly rate / USD"
                  variant="outlined"
                  type="number"
                  placeholder="$20"
                  defaultValue={rateHour}
                  onChange={e => setRateHour(Number(e.target.value))}
                />
                <div className="group">
                  <FormControlLabel
                    value="bottom"
                    control={
                      <Switch
                        defaultChecked={trackScreenshots}
                        onChange={e => setTrackScreenshots(e.target.checked)}
                      />
                    }
                    label="Track screenshots"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="bottom"
                    control={
                      <Switch
                        defaultChecked={trackProcesses}
                        onChange={e => setTrackProcesses(e.target.checked)}
                      />
                    }
                    label="Track processes"
                    labelPlacement="end"
                  />
                </div>
                {activity.type === EActivityType.HOURLY && (
                  <>
                    <TextField
                      label="Salary annualy"
                      variant="outlined"
                      placeholder="$40000"
                      defaultValue={salary}
                      onChange={e => setSalary(e.target.value)}
                    />
                    <TextField
                      label="Keywords"
                      variant="outlined"
                      placeholder="TypeSript, React, AWS"
                      defaultValue={keywords}
                      onChange={e => setKeywords(e.target.value)}
                    />
                    <p className="jobState">
                      <Switch
                        inputProps={{'aria-label': 'Switch demo'}}
                        onChange={e => {
                          if (state === 'published') {
                            setState('draft');
                          } else {
                            setState('published');
                          }
                        }}
                        value={state}
                      />
                      <label>{state}</label>
                    </p>
                  </>
                )}
              </div>
              <div className="description">
                <h3>Description</h3>
                <Editor
                  apiKey={TINYMCE_KEY}
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue={text}
                  init={{
                    // height: 300,
                    menubar: false,
                    plugins: [
                      'advlist',
                      'autolink',
                      'lists',
                      'link',
                      'image',
                      'charmap',
                      'preview',
                      'anchor',
                      'searchreplace',
                      'visualblocks',
                      'code',
                      'fullscreen',
                      'insertdatetime',
                      'media',
                      'table',
                      'code',
                      'help',
                      'wordcount',
                    ],
                    toolbar:
                      'undo redo | blocks | ' +
                      'bold italic forecolor | alignleft aligncenter ' +
                      'alignright alignjustify | bullist numlist outdent indent | ' +
                      'removeformat | help',
                    content_style:
                      'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                  }}
                />
              </div>
            </ActivitiyEditWrapper>
          </form>
        </article>
      </main>
    </PageWrapper>
  );
};

export default Activity;
