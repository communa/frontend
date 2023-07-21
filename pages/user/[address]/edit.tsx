import type { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';

import { request } from 'src/Utils';
import { UserPageWrapper } from 'src/lib/Wrappers';
import { API_HOST, APP_NAME, TINYMCE_KEY } from 'src/config/consts';
import Header from 'src/lib/Layout/Header';
import { useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { getJwtLocalStorage } from 'src/contexts/Auth';
import { useNotifications } from 'src/contexts/Notifications';
import { useAccount } from 'wagmi';
import { IUser } from 'src/interface/IUser';
import { useRouter } from 'next/router';

export const getServerSideProps: GetServerSideProps<{ user: IUser }> = async (context: GetServerSidePropsContext) => {
  const { address } = context.query;
  const response = await request({
    url: `${API_HOST}/api/user/${address}/address`,
    method: 'GET'
  });

  return {
    props: {
      user: response.data,
    },
  }
}

const UserProfileEdit = ({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const editorRef = useRef<any>(null);
  const router = useRouter();
  const { addNotification } = useNotifications();
  const { address } = useAccount();

  const [bio, setBio] = useState(user.bio);
  const [userName, setUserName] = useState(user.userName);
  const [company, setCompany] = useState(user.company);
  const [linkedIn, setLinkedIn] = useState(user.linkedIn);
  const [twitter, setTwitter] = useState(user.twitter);
  const [telegram, setTelegram] = useState(user.telegram);

  useEffect(() => {
    if (address !== user.address) {
      router.push(`/user/${user.address}`);
    }
  })

  const onUpdate = async () => {
    const bio = editorRef.current.getContent();
    const jwt = getJwtLocalStorage();

    await request({
      url: `${API_HOST}/api/user`,
      method: 'PUT',
      headers: {
        Authorization: jwt?.access
      },
      data: {
        userName,
        company,
        twitter,
        linkedIn,
        bio,
      }
    });

    setBio(bio);

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
      <main>
        <h2>User / {user.id}</h2>
        <label>Name</label>
        <input
          className="field"
          type="text"
          placeholder="Name"
          defaultValue={userName}
          onChange={e => setUserName(e.target.value)}
        />
        <label>Company</label>
        <input
          className="field"
          type="text"
          placeholder="Company"
          defaultValue={company}
          onChange={e => setCompany(e.target.value)}
        />
        <label>LinkedIn</label>
        <input
          className="field"
          type="text"
          placeholder="linkedIn"
          defaultValue={linkedIn}
          onChange={e => setLinkedIn(e.target.value)}
        />
        <label>Twitter</label>
        <input
          className="field"
          type="text"
          placeholder="Twitter"
          defaultValue={twitter}
          onChange={e => setTwitter(e.target.value)}
        />
        <label>Telegram</label>
        <input
          className="field"
          type="text"
          placeholder="Telegram"
          defaultValue={telegram}
          onChange={e => setTelegram(e.target.value)}
        />
        <label>Bio</label>
        <Editor
          apiKey={TINYMCE_KEY}
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
        <button className='update' onClick={() => onUpdate()}>
          Update
        </button>
      </main>
    </UserPageWrapper>
  );
};

export default UserProfileEdit;