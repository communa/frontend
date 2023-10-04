import type { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { Editor } from '@tinymce/tinymce-react';
import { useRef, useState } from 'react';

import { IActivity } from 'src/interface/IActivity';
import { request } from 'src/Utils';
import { JobsPageWrapper } from 'src/lib/Wrappers';
import { API_HOST, APP_NAME, TINYMCE_KEY } from 'src/config/consts';
import { getJwtLocalStorage } from 'src/contexts/Auth';
import { useNotifications } from 'src/contexts/Notifications';
import HeaderJobs from 'src/lib/Layout/HeaderJobs';
import { Switch, TextField } from '@mui/material';

export const getServerSideProps: GetServerSideProps<{ activity: IActivity }> = async (context: GetServerSidePropsContext) => {
  const { id } = context.query;
  const response = await request({
    url: `${API_HOST}/api/activity/${id}`,
    method: 'GET'
  });

  return {
    props: {
      activity: response.data,
    },
  }
}

const Activity = ({ activity }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { addNotification } = useNotifications();
  const editorRef = useRef<any>(null);

  const [text, setText] = useState(activity.text);
  const [state, setState] = useState(activity.state);
  const [title, setTitle] = useState(activity.title);
  const [rate, setRate] = useState(activity.rate);
  const [salary, setSalary] = useState(activity.salary);
  const [keywords, setKeywords] = useState(activity.keywords.join(','));

  const onEdit = async () => {
    const text = editorRef.current.getContent();
    const jwt = getJwtLocalStorage();

    await request({
      url: `${API_HOST}/api/activity/${activity.id}`,
      method: 'PUT',
      headers: {
        Authorization: jwt?.access
      },
      data: {
        state,
        title,
        text,
        salary,
        rate,
        keywords: keywords.split(','),
      }
    });

    setText(text);

    addNotification({
      title: 'Updates Saved',
      subtitle: '',
    });
  };

  return (
    <JobsPageWrapper>
      <Head>
        <title>Publish - Web3 Jobs - {APP_NAME}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="index, follow" />
        <meta name="description" content={activity.title} />
        <link rel="icon" href="/logo.png" />
      </Head>
      <main id="jobEdit">
        <HeaderJobs />
        <article>
          <h2>
            Job editing
          </h2>
          <form>
            <TextField
              label="Title"
              variant="outlined"
              placeholder="Title"
              defaultValue={title}
              onChange={e => setTitle(e.target.value)}
            />
            <TextField
              label="Rate hourly"
              variant="outlined"
              placeholder="$20"
              defaultValue={rate}
              onChange={e => setRate(e.target.value)}
            />
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
                inputProps={{ 'aria-label': 'Switch demo' }}
                onChange={e => {
                  if (state === 'published') {
                    setState('draft');
                  } else {
                    setState('published');
                  }
                }}
                value={state}
              />
              <label>
                {state}
              </label>
            </p>
            <label>Job description full</label>
            <Editor
              apiKey={TINYMCE_KEY}
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue={text}
              init={{
                // height: 300,
                menubar: false,
                plugins: [
                  'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                  'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                  'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                ],
                toolbar: 'undo redo | blocks | ' +
                  'bold italic forecolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
              }}
            />
            <button className='update' type='button' onClick={() => onEdit()}>
              Update
            </button>
          </form>
        </article>
      </main>
    </JobsPageWrapper >
  );
};

export default Activity;