import fs from 'fs';
import {join} from 'path';
import type {GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType} from 'next';
import {useEffect, useRef, useState} from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';

import {TextField} from '@mui/material';
import {Editor} from '@tinymce/tinymce-react';

import {ActivitiyEditWrapper, PageWrapper} from 'src/lib/Wrappers';
import {API_HOST, APP_NAME, TINYMCE_KEY} from 'src/config/consts'
import {request} from 'src/Utils';
import {useAuth} from 'src/contexts/Auth';
import {useNotifications} from 'src/contexts/Notifications';
import MenuMain from 'src/lib/Layout/MenuMain';

export const getServerSideProps: GetServerSideProps<{
  template: string
}> = async (context: GetServerSidePropsContext) => {
  const template = fs.readFileSync(join(__dirname, '../../../../template-project.html')).toString();

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
  const [rateHour, setRateHour] = useState(0);
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

  const onSaveAndEdit = async (e: React.FormEvent) => {
    e.preventDefault();

    const text = editorRef.current?.getContent();
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
    router.push(`/time`);

    addNotification({
      title: 'You\'ve added a new project',
      subtitle: '',
    });
  };

  if (!userAddress) {
    return null;
  }

  return (
    <PageWrapper>
      <Head>
        <title>New project - {APP_NAME}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="index, follow" />
        <meta name="description" content={APP_NAME} />
        <link rel="icon" href="/logo.png" />
      </Head>
      <main id="jobNew">
        <MenuMain />
        <article>
          <form onSubmit={onSaveAndEdit}>
            <nav className="actions">
              <h2>
                Project new
              </h2>
              <button className="apply small">
                Save & Continue
              </button>
            </nav>
            <ActivitiyEditWrapper>
              <div className="fields">
                <p>
                You're initiating a new project for your personal requirements.<br />
                Personal projects are not viewable by freelancers, which implies they cannot submit applications for your job.
                Additionally, you cannot directly assign a freelancer.<br />          
                </p>
                <TextField
                  required
                  label="Title"
                  variant="outlined"
                  placeholder="Title"
                  onChange={e => setTitle(e.target.value)}
                />
                <TextField
                  required
                  label="Rate per hour in USD"
                  variant="outlined"
                  type='number'
                  placeholder="$20"
                  defaultValue={rateHour}
                  onChange={e => setRateHour(Number(e.target.value))}
                />  
              </div>
              <div className="description">
                <h3>
                  Description
                </h3>
                <Editor
                  apiKey={TINYMCE_KEY}
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue={text}
                  onChange={e => setText(e.target.value)}
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
              </div>
            </ActivitiyEditWrapper>
          </form>
        </article>
      </main>
    </PageWrapper>
  );
};

export default ActivityNew;