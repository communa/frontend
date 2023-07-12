import type { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';

import { IActivity } from 'src/interface/IActivity';
import { request } from 'src/Utils';
import { ActivityPublishWrapper } from 'src/lib/Wrappers';
import { API_HOST, APP_NAME } from 'src/config/consts';
import Header from 'src/lib/Layout/Header';
import { Editor } from '@tinymce/tinymce-react';
import { useRef, useState } from 'react';
import { getJwtLocalStorage } from 'src/contexts/Auth';
import { useNotifications } from 'src/contexts/Notifications';

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
  const [keywords, setKeywords] = useState(activity.keywords.join(', '));

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
    <ActivityPublishWrapper>
      <Head>
        <title>Publish - Software Engineering Jobs - {APP_NAME}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="index, follow" />
        <meta name="description" content={activity.title} />
        <link rel="icon" href="/logo.png" />
      </Head>
      <main>
        <Header />
        <h2>Job / {activity.id}</h2>
        <input
          className="title"
          type="text"
          placeholder="Job Title"
          defaultValue={title}
          onChange={e => setTitle(e.target.value)}
        />
        <label>Hourly Rate</label>
        <input
          className="rate"
          type="text"
          placeholder="$20 per hour"
          defaultValue={rate}
          onChange={e => setRate(e.target.value)}
        />
        <label>Annual Salary</label>
        <input
          className="salary"
          type="text"
          placeholder="$40000 a year"
          defaultValue={salary}
          onChange={e => setSalary(e.target.value)}
        />
        <label>Keywords</label>
        <input
          className="keywords"
          type="text"
          placeholder="typescript, react, aws"
          defaultValue={keywords}
          onChange={e => setKeywords(e.target.value)}
        />
        <label>State</label>
        <select onChange={e => setState(e.target.value)} defaultValue={state}>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
        <label>Job Description</label>
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
        <button className='publish' onClick={() => onEdit()}>
          Update
        </button>
      </main>
    </ActivityPublishWrapper>
  );
};

export default Activity;