import type { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useContext, useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { Editor } from '@tinymce/tinymce-react';
import { useRouter } from 'next/router';
import fs from 'fs';
import { TextField } from '@mui/material';
import Switch from '@mui/material/Switch';

import { JobsPageWrapper } from 'src/lib/Wrappers';
import { API_HOST, APP_NAME, TINYMCE_KEY } from 'src/config/consts'
import { request } from 'src/Utils';
import { AuthContext, getJwtLocalStorage } from 'src/contexts/Auth';
import { useNotifications } from 'src/contexts/Notifications';
import { join } from 'path';
import HeaderJobs from 'src/lib/Layout/HeaderJobs';

export const getServerSideProps: GetServerSideProps<{ template: string }> = async (context: GetServerSidePropsContext) => {
  const template = fs.readFileSync(join(__dirname, '../../../../job-template.html')).toString();

  return {
    props: {
      template,
    },
  }
}

const ActivityNew = ({ template }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { authStatus } = useContext(AuthContext);
  const { addNotification } = useNotifications();
  const editorRef = useRef<any>(null);

  const [text, setText] = useState(template);
  const [title, setTitle] = useState('');
  const [keywords, setKeywords] = useState('');
  const [rate, setRate] = useState('');
  const [salary, setSalary] = useState('');
  const [state, setState] = useState('draft');

  console.log(authStatus);

  useEffect(() => {
    if (authStatus === 'unauthenticated') {
      router.push(`/login`);
      addNotification({
        title: 'Authorisation is required',
        subtitle: '',
      });
    };
  }, []);

  const onPublish = async () => {
    const text = editorRef.current.getContent();
    const jwt = getJwtLocalStorage();
    const res = await request({
      url: `${API_HOST}/api/activity`,
      method: 'POST',
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
    const id = res.headers.location.split('/')[3];
    router.push(`/activity/${id}/edit`);

    addNotification({
      title: 'You\'ve added a new job',
      subtitle: '',
    });
  };

  if (authStatus === 'unauthenticated') {
    return null;
  }

  return (
    <JobsPageWrapper>
      <Head>
        <title>Publish - Web3 Jobs - {APP_NAME}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="index, follow" />
        <meta name="description" content={APP_NAME} />
        <link rel="icon" href="/logo.png" />
      </Head>
      <main id="jobNew">
        <HeaderJobs />
        <article>
          <h2>
            Add new job
          </h2>
          <form>
            <TextField
              label="Title"
              variant="outlined"
              placeholder="Title"
              onChange={e => setTitle(e.target.value)}
            />
            <TextField
              label="Rate hourly"
              variant="outlined"
              placeholder="$20 per hour"
              onChange={e => setRate(e.target.value)}
            />
            <TextField
              label="Salary"
              variant="outlined"
              placeholder="$40000 a year"
              onChange={e => setSalary(e.target.value)}
            />
            <TextField
              label="Keywords"
              variant="outlined"
              placeholder="TypeSript, React, AWS"
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

            <button className='update' type='button' onClick={() => onPublish()}>
              Publish
            </button>
          </form>
        </article>
      </main>
    </JobsPageWrapper>
  );
};

export default ActivityNew;