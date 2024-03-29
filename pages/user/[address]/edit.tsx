import fs from 'fs';
import {join} from 'path';
import {useEffect, useRef, useState} from 'react';
import type {GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType} from 'next';
import {useRouter} from 'next/router';
import Head from 'next/head';
import {Editor} from '@tinymce/tinymce-react';
import {Button, TextField} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

import {request} from 'src/Utils';
import {PageWrapper} from 'src/lib/Wrappers';
import {API_HOST, APP_NAME, TINYMCE_KEY} from 'src/config/consts';
import {useAuth} from 'src/contexts/Auth';
import {useNotifications} from 'src/contexts/Notifications';
import {IUser} from 'src/interface/IUser';
import MenuLeft from 'src/lib/Layout/MenuLeft';

export const getServerSideProps: GetServerSideProps<{
  user: IUser,
  template: string
}> = async (context: GetServerSidePropsContext) => {
  const template = fs.readFileSync(join(__dirname, '../../../../../template-profile.html')).toString();

  const {address} = context.query;
  const response = await request({
    url: `${API_HOST}/api/user/${address}/address`,
    method: 'GET'
  });

  return {
    props: {
      user: response.data,
      template,
    },
  }
}

const UserProfileEdit = ({user, template}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const editorRef = useRef<any>(null);
  const router = useRouter();
  const {addNotification} = useNotifications();
  const {userAddress, jwt} = useAuth();

  const [bio, setBio] = useState(user.bio || template);
  const [userName, setUserName] = useState(user.userName);
  const [company, setCompany] = useState(user.company);
  const [linkedIn, setLinkedIn] = useState(user.linkedIn);
  const [twitter, setTwitter] = useState(user.twitter);
  const [telegram, setTelegram] = useState(user.telegram);

  useEffect(() => {
    if (userAddress !== user.address) {
      router.push(`/user/${user.address}`);
    }
  })

  const onEdit = async () => {
    const bio = editorRef.current.getContent();

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
        telegram,
        bio,
      }
    });

    setBio(bio);

    addNotification({
      title: 'Profile updated',
      subtitle: '',
    });

    router.push(`/user/${user.address}`);
  };

  return (
    <PageWrapper>
      <Head>
        <title>{userAddress} - Web3 Jobs - {APP_NAME}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/logo-testnet.png" />
      </Head>
      <main id="userEdit">
        <MenuLeft />
        <article>
          <nav className="actions">
            <h2>Edit profile</h2>
            <Button variant='contained' onClick={() => onEdit()} startIcon={<SaveIcon />}>
              Save and Continue
            </Button>
          </nav>
          <form>
            <TextField
              label="Address"
              variant="outlined"
              placeholder="Name"
              disabled
              value={userAddress}
            />
            <TextField
              label="Name"
              variant="outlined"
              placeholder="Name"
              defaultValue={userName}
              onChange={e => setUserName(e.target.value)}
            />
            <TextField
              label="Company"
              variant="outlined"
              placeholder="Company"
              defaultValue={company}
              onChange={e => setCompany(e.target.value)}
            />
            <TextField
              label="LinkedIn"
              variant="outlined"
              placeholder="LinkedIn"
              defaultValue={linkedIn}
              onChange={e => setLinkedIn(e.target.value)}
            />
            <TextField
              label="Twitter"
              variant="outlined"
              placeholder="Twitter"
              defaultValue={twitter}
              onChange={e => setTwitter(e.target.value)}
            />
            <TextField
              label="Telegram"
              variant="outlined"
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
          </form>
        </article>
      </main>
    </PageWrapper>
  );
};

export default UserProfileEdit;