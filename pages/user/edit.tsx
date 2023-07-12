import type { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';

import { request } from 'src/Utils';
import { UserPageWrapper } from 'src/lib/Wrappers';
import { API_HOST, APP_NAME } from 'src/config/consts';
import Header from 'src/lib/Layout/Header';
import { IUser } from 'src/interface/IUser';
import { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { getJwtLocalStorage } from 'src/contexts/Auth';
import { useNotifications } from 'src/contexts/Notifications';
import { useAccount } from 'wagmi';

export const getServerSideProps: GetServerSideProps<{}> = async () => {
  return {
    props: {
    },
  }
}

const Activity = ({ }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [bio, setBio] = useState('<p>This is the initial content of the editor.</p>');
  const editorRef = useRef<any>(null);
  const { addNotification } = useNotifications();
  const { address } = useAccount();

  const onPublish = async () => {
    const bio = editorRef.current.getContent();
    const jwt = getJwtLocalStorage();

    await request({
      url: `${API_HOST}/api/user`,
      method: 'PUT',
      headers: {
        Authorization: jwt?.access
      },
      data: {
        bio,
      }
    });

    addNotification({
      title: 'Profile updated',
      subtitle: '',
    });
  };
  return (
    <UserPageWrapper>
      <Head>
        <title>{address} - Software Engineering Jobs - {APP_NAME}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header />
      <h2>Bio</h2>
      <Editor
        // apiKey='your-api-key'
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={bio}
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
        Update
      </button>
    </UserPageWrapper>
  );
};

export default Activity;