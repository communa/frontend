import type { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useContext, useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { Editor } from '@tinymce/tinymce-react';
import { useRouter } from 'next/router';

import { ActivityPublishWrapper } from 'src/lib/Wrappers';
import { API_HOST, APP_NAME } from 'src/config/consts'
import Header from 'src/lib/Layout/Header';
import { request } from 'src/Utils';
import { AuthContext, getJwtLocalStorage } from 'src/contexts/Auth';
import { useNotifications } from 'src/contexts/Notifications';

export const getServerSideProps: GetServerSideProps<{}> = async (context: GetServerSidePropsContext) => {
  return {
    props: {},
  }
}

const ActivityNew = ({ }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { authStatus } = useContext(AuthContext);
  const { addNotification } = useNotifications();
  const editorRef = useRef<any>(null);

  const [text, setText] = useState('<p>This is the initial content of the editor.</p>');
  const [title, setTitle] = useState('');
  const [keywords, setKeywords] = useState('');
  const [rate, setRate] = useState('');
  const [salary, setSalary] = useState('');
  const [state, setState] = useState('Draft');

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
    <ActivityPublishWrapper>
      <Head>
        <title>Publish - Software Engineering Jobs - {APP_NAME}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="index, follow" />
        <meta name="description" content={APP_NAME} />
        <link rel="icon" href="/logo.png" />
      </Head>
      <main>
        <Header />
        <h2>Add new</h2>
        <label>Title</label>
        <input
          className="title"
          type="text"
          placeholder="Job Title"
          onChange={e => setTitle(e.target.value)}
        />
        <label>Hourly Rate</label>
        <input
          className="rate"
          type="text"
          placeholder="$20 per hour"
          onChange={e => setRate(e.target.value)}
        />
        <label>Annual Salary</label>
        <input
          className="salary"
          type="text"
          placeholder="$40000 a year"
          onChange={e => setSalary(e.target.value)}
        />
        <label>Keywords</label>
        <input
          className="keywords"
          type="text"
          placeholder="typescript, react, aws"
          onChange={e => setKeywords(e.target.value)}
        />
        <label>State</label>
        <select onChange={e => setState(e.target.value)} defaultValue={state}>
          <option value="Published">Published</option>
          <option value="Draft">Draft</option>
        </select>
        <label>Full Details</label>
        <Editor
          // apiKey='your-api-key'
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
        <button className='publish' onClick={() => onPublish()}>
          Publish
        </button>
      </main>
    </ActivityPublishWrapper >
  );
};

export default ActivityNew;