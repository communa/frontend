import type {GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType} from 'next';
import {useContext, useEffect, useRef, useState} from 'react';
import Head from 'next/head';
import {Editor} from '@tinymce/tinymce-react';
import {useRouter} from 'next/router';
import fs from 'fs';
import {TextField} from '@mui/material';
import Switch from '@mui/material/Switch';

import {JobsPageWrapper} from 'src/lib/Wrappers';
import {API_HOST, APP_NAME, TINYMCE_KEY} from 'src/config/consts'
import {request} from 'src/Utils';
import {AuthContext, getJwtLocalStorage} from 'src/contexts/Auth';
import {useNotifications} from 'src/contexts/Notifications';
import {join} from 'path';
import HeaderJobs from 'src/lib/Layout/HeaderJobs';
import Link from 'next/link';

export const getServerSideProps: GetServerSideProps<{template: string}> = async (context: GetServerSidePropsContext) => {
  const template = fs.readFileSync(join(__dirname, '../../../../contract-template.html')).toString();

  return {
    props: {
      template,
    },
  }
}

const ActivityNew = ({template}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const {authStatus} = useContext(AuthContext);
  const {addNotification} = useNotifications();
  const editorRef = useRef<any>(null);

  const [text, setText] = useState(template);
  const [title, setTitle] = useState('');
  const [keywords, setKeywords] = useState('');
  const [rate, setRate] = useState('');
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
        rate,
        keywords: keywords.split(','),
        type: 'Contract',
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
        <title>New hourly contract - {APP_NAME}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="index, follow" />
        <meta name="description" content={APP_NAME} />
        <link rel="icon" href="/logo-testnet.png" />
      </Head>
      <main id="jobNew">
        <HeaderJobs />
        <article>
          <h2>
            New hourly contract
          </h2>
          <p>
            You're creating a new new job with hourly basis rate.<br/>
            You may pick up a freelancer or assign the one you need once your contract is publsihed.
            Once a freelancer is assigned the contract can not no longer editer, but only to be closed.<br/>
            Or, if you need to publish a contract, click by the link -&nbsp;
            <Link href="/activity/newPersonal">
              New personal project
            </Link>   
          </p>          
          <br/>
          <form>
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
              <label>
                {state}
              </label>
            </p>
            <br/>
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
              label="Keywords"
              variant="outlined"
              placeholder="TypeScript, React, AWS"
              onChange={e => setKeywords(e.target.value)}
            />
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
              Save
            </button>
          </form>
        </article>
      </main>
    </JobsPageWrapper>
  );
};

export default ActivityNew;