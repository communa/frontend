import {useEffect, useRef, useState} from 'react';
import type {GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType} from 'next';
import Head from 'next/head';
import {useRouter} from 'next/router';
import Link from 'next/link';
import fs from 'fs';
import {join} from 'path';

import {Editor} from '@tinymce/tinymce-react';
import {TextField} from '@mui/material';
import Switch from '@mui/material/Switch';

import {PageWrapper} from 'src/lib/Wrappers';
import {API_HOST, APP_NAME, TINYMCE_KEY} from 'src/config/consts'
import {request} from 'src/Utils';
import {useAuth} from 'src/contexts/Auth';
import {useNotifications} from 'src/contexts/Notifications';
import MenuLeft from 'src/lib/Layout/MenuLeft';

export const getServerSideProps: GetServerSideProps<{
  template: string
}> = async (context: GetServerSidePropsContext) => {
  const template = fs.readFileSync(join(__dirname, '../../../../template-contract.html')).toString();

  return {
    props: {
      template,
    },
  }
}

const ActivityNew = ({template}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const {addNotification} = useNotifications();
  const editorRef = useRef<any>(null);

  const [text, setText] = useState(template);
  const [title, setTitle] = useState('');
  const [keywords, setKeywords] = useState('');
  const [rate, setRate] = useState('');
  const [state, setState] = useState('draft');
  const {jwt, userAddress} = useAuth();

  useEffect(() => {
    if (!userAddress) {
      router.push(`/`);
      addNotification({
        title: 'Authorisation is required',
        subtitle: '',
      });
    };
  }, []);

  const onSaveAndEdit = async () => {
    const text = editorRef.current.getContent();
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

  if (!userAddress) {
    return null;
  }

  return (
    <PageWrapper>
      <Head>
        <title>New hourly contract - {APP_NAME}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="index, follow" />
        <meta name="description" content={APP_NAME} />
        <link rel="icon" href="/logo-testnet.png" />
      </Head>
      <main id="jobNew">
        <MenuLeft />
        <article>
          <h2>
            New hourly contract
          </h2>
          <p>
            You are initiating a new job with an hourly rate. <br />
            After publishing your contract, you have the option to choose a freelancer or assign a specific one. <br />
            Once a freelancer is assigned, the contract becomes non-editable and can only be closed. <br />
            Or, if you wish to publish a contract, please click on the link &nbsp;
            <Link href="/activity/newPersonal">
              Add new project
            </Link>
          </p>
          <br />
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
            <br />
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

            <button className='update' type='button' onClick={() => onSaveAndEdit()}>
              Save
            </button>
          </form>
        </article>
      </main>
    </PageWrapper >
  );
};

export default ActivityNew;