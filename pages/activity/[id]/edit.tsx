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
  const [text, setText] = useState(activity.text);
  const [title, setTitle] = useState(activity.title);
  const editorRef = useRef<any>(null);

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
        state: 'draft',
        title,
        text,
      }
    });

    setText(text);
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
        <label>Job Description</label>
        <Editor
          // apiKey='your-api-key'
          // onInit={(evt, editor) => (editorRef.current = editor)}
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