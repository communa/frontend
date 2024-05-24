import {Button, Input, Textarea} from '@telegram-apps/telegram-ui';

import {TelegramWrapper} from './Wrappers';
import {useNotifications} from 'src/contexts/Notifications';
import {request} from 'src/Utils';
import {useState} from 'react';
import {API_HOST} from 'src/config/consts';
import {useAuth} from 'src/contexts/Auth';
import {IUser} from 'src/interface/IUser';
import {TextField} from '@mui/material';

export const TelegramProfileEdit = ({fnClose, fnLoad, user}: {
  fnClose: Function, 
  fnLoad: Function, 
  user: IUser
}) => {
  const {jwt} = useAuth();
  const {addNotification} = useNotifications();

  const [bio, setBio] = useState(user.bio);
  const [userName, setUserName] = useState(user.userName);
  const [company, setCompany] = useState(user.company);
  const [skills, setSkills] = useState(user.skills);
  const [price, setPrice] = useState(user.price);

  const onSave = async () => {
    await request({
      url: `${API_HOST}/api/user`,
      method: 'PUT',
      headers: {
        Authorization: jwt?.access,
      },
      data: {
        userName,
        company,
        bio,
        price,
        skills
      },
    });

    addNotification({
      title: 'Profile updated',
      subtitle: '',
    });

    fnLoad();
    fnClose();
  };

  return (
    <TelegramWrapper id="edit">
      <main>
        <div className="fields">
        <TextField
            label="Address"
            variant="outlined"
            placeholder="Name"
            disabled
            size="small"
            value={user.address}
          />
          <TextField
            label="Username"
            variant="outlined"
            placeholder="Username"
            size="small"
            defaultValue={user.userName}
            onChange={e => setUserName(e.target.value)}
          />
          <TextField
            label="Company"
            variant="outlined"
            placeholder="Company"
            size="small"
            defaultValue={user.company}
            onChange={e => setCompany(e.target.value)}
          />         
          <TextField
            label="Skills"
            variant="outlined"
            placeholder="Skill comma separated"
            size="small"
            defaultValue={user.skills}
            onChange={e => setSkills(e.target.value)}
          />                             
          <TextField
            label="Price in TON"
            variant="outlined"
            placeholder="1"
            size="small"
            defaultValue={user.price}
            onChange={e => setPrice(Number(e.target.value))}
          />                              
          <TextField
            size="small"
            label="Bio"
            className="bio"
            multiline
            rows={6}
            defaultValue={user.bio} 
            onChange={e => setBio(e.target.value)} 
          />   
        </div>    
        <nav className="bottom">
          <Button mode="bezeled" onClick={() => fnClose()}>
            Close
          </Button>
          <Button mode="filled" onClick={() => onSave()}>
            Save
          </Button>
        </nav>
      </main>
    </TelegramWrapper>
  );
};
