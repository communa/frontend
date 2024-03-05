import type {GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType} from 'next';
import {useContext, useEffect, useRef, useState} from 'react';
import Head from 'next/head';
import {Editor} from '@tinymce/tinymce-react';
import {useRouter} from 'next/router';
import fs from 'fs';
import {Button, TextField} from '@mui/material';

import {PageWrapper} from 'src/lib/Wrappers';
import {API_HOST, APP_NAME, TINYMCE_KEY} from 'src/config/consts'
import {request} from 'src/Utils';
import {AuthContext, getJwtLocalStorage} from 'src/contexts/Auth';
import {useNotifications} from 'src/contexts/Notifications';
import {join} from 'path';
import MenuLeft from 'src/lib/Layout/MenuLeft';
import Link from 'next/link';

export const getServerSideProps: GetServerSideProps<{template: string}> = async (context: GetServerSidePropsContext) => {
  const template = fs.readFileSync(join(__dirname, '../../../../project-template.html')).toString();

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
  const [rateHour, setRateHour] = useState(0);

  useEffect(() => {
    if (authStatus === 'unauthenticated') {
      router.push(`/login`);
      addNotification({
        title: 'Authorisation is required',
        subtitle: '',
      });
    };
  }, []);

  const onSaveAndEdit = async () => {
    const text = editorRef.current.getContent();
    const jwt = getJwtLocalStorage();
    const res = await request({
      url: `${API_HOST}/api/activity`,
      method: 'POST',
      headers: {
        Authorization: jwt?.access
      },
      data: {
        title,
        text,
        rateHour,
        state: 'Published',
        type: 'Personal'
      }
    });
    console.log(res.headers.location);
    const id = res.headers.location.split('/')[3];
    router.push(`/activity/${id}/edit`);

    addNotification({
      title: 'You\'ve added a new project',
      subtitle: '',
    });
  };

  if (authStatus === 'unauthenticated') {
    return null;
  }

  return (
    <PageWrapper>
      <Head>
        <title>New personal project - {APP_NAME}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="index, follow" />
        <meta name="description" content={APP_NAME} />
        <link rel="icon" href="/logo-testnet.png" />
      </Head>
      <main id="jobNew">
        <MenuLeft />
        <article>
          <nav className="actions">
            <h2>
              New personal project
            </h2>
            <Button variant='contained' size='large' onClick={() => onSaveAndEdit()}>
              Save & Continue Editing
            </Button>
          </nav>
          <p>
            You're initiating a new project for your personal requirements.<br />
            Personal projects are not viewable by freelancers, which implies they cannot submit applications for your job. Additionally, you cannot directly assign a freelancer.<br />
            Or, if you wish to publish a contract, please click on the link for creating a new hourly contract &nbsp;
            <Link href="/activity/newContract">
              New hourly contract
            </Link>
          </p>
          <br />
          <form>
            <TextField
              label="Title"
              variant="outlined"
              placeholder="Title"
              onChange={e => setTitle(e.target.value)}
            />
            <TextField
              label="Rate per hour in USD"
              variant="outlined"
              type='number'
              placeholder="$20"
              defaultValue={rateHour}
              onChange={e => setRateHour(Number(e.target.value))}
            />            
            <Editor
              apiKey={TINYMCE_KEY}
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue={text}
              init={{
                height: 200,
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
          </form>
        </article>
      </main>
    </PageWrapper >
  );
};

export default ActivityNew;