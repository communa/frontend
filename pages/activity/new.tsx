import type { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';

import { ActivityPublishWrapper } from 'src/lib/Wrappers';
import { APP_NAME } from 'src/config/consts'
import { Editor } from '@tinymce/tinymce-react';
import Header from 'src/lib/Layout/Header';
import { useRef } from 'react';

export const getServerSideProps: GetServerSideProps<{}> = async (context: GetServerSidePropsContext) => {
  return {
    props: {},
  }
}

const ActivityNew = ({ }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const save = () => { };
  const editorRef = useRef(null);

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

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
        <h2>Post a Job</h2>
        <label>Job Title</label>
        <input className="title" type='text' placeholder='...' />
        <label>Job Description</label>
        <Editor
          // apiKey='your-api-key'
          onInit={(evt, editor) => editorRef.current = editor}
          initialValue="<p>This is the initial content of the editor.</p>"
          init={{
            height: 500,
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
        <button className='publish' onClick={() => save()}>
          Publish
        </button>
      </main>
    </ActivityPublishWrapper>
  );
};

export default ActivityNew;