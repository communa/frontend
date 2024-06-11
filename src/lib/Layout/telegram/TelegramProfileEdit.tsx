import {Button} from '@telegram-apps/telegram-ui';

import {TelegramWrapper} from './Wrappers';
import {useNotifications} from 'src/contexts/Notifications';
import {request} from 'src/Utils';
import {FormEvent, useEffect, useState} from 'react';
import {API_HOST} from 'src/config/consts';
import {useAuth} from 'src/contexts/Auth';
import {IUser} from 'src/interface/IUser';
import {COUNTRIES} from 'src/config/countries';
import {FormControl, InputLabel, NativeSelect, TextField} from '@mui/material';
import {IUserUnsafe} from 'src/interface/IUserUnsafe';

export const TelegramProfileEdit = ({fnClose, fnLoad, user, userUnsafe}: {
  fnClose: Function, 
  fnLoad: Function, 
  user: IUser
  userUnsafe: IUserUnsafe | null
}) => {
  const {jwt} = useAuth();
  const {addNotification} = useNotifications();

  const [bio, setBio] = useState(user.bio);
  const [userName, setUserName] = useState(user.userName);
  const [company, setCompany] = useState(user.company);
  const [skills, setSkills] = useState(user.skills);
  const [price, setPrice] = useState(user.price);
  const [country, setCountry] = useState(user.country || 'ae');
  const [city, setCity] = useState(user.city);  

  useEffect(() => {
    document.body.classList.remove('miniApp');
    document.body.classList.add('miniAppEdit');
  }, []);

  const onSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
        country,
        city,
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
      <form onSubmit={(e: FormEvent<HTMLFormElement>) => onSave(e)} >
        <main>
            <div className="fields">
              <TextField
                label="Address"
                variant="standard"
                placeholder="Name"
                disabled
                size="small"
                value={user.address}
              />
              <TextField
                label="Username"
                variant="standard"
                placeholder={userUnsafe?.username}
                required
                size="small"
                defaultValue={user.userName}
                onChange={e => setUserName(e.target.value)}
              />
              <TextField
                label="Company"
                variant="standard"
                placeholder="Company"
                size="small"
                defaultValue={user.company}
                onChange={e => setCompany(e.target.value)}
              />
              {true && (
                <>
                  <FormControl fullWidth variant="outlined" className="country">
                    <InputLabel>Country</InputLabel>
                    <NativeSelect 
                      variant="standard" 
                      onChange={e => setCountry(e.target.value)}
                    >
                      {COUNTRIES.sort((a, b) => a.country.localeCompare(b.country)).map(c => {
                        return (
                          <option 
                          value={c.code} 
                          selected={country == c.code}
                          >{c.country}</option>
                        )
                      })}
                    </NativeSelect>
                  </FormControl>          
                  <TextField
                    label="City"
                    variant="standard"
                    placeholder="City"
                    size="small"
                    defaultValue={user.city}
                    onChange={e => setCity(e.target.value)}
                  /> 
                </>
              )}
  
              <TextField
                label="Skills"
                variant="standard"
                placeholder="Skill comma separated"
                size="small"
                required
                defaultValue={user.skills}
                onChange={e => setSkills(e.target.value)}
              />                             
              <TextField
                label="Price in $USD"
                variant="standard"
                placeholder="1.00"
                size="small"
                required
                defaultValue={user.price}
                onChange={e => setPrice(Number(e.target.value))}
              />                              
              <TextField
                size="small"
                variant="filled"
                label="Bio"
                required
                className="bio"
                multiline
                rows={6}
                defaultValue={user.bio} 
                onChange={e => setBio(e.target.value)} 
              />   
            </div>    
            <footer>
              <nav>
                <Button mode="bezeled" onClick={() => fnClose()}>
                  Close
                </Button>
                <Button mode="filled" type="submit" className="save">
                  Save
                </Button>
              </nav>      
            </footer>
        </main>
      </form>
    </TelegramWrapper>
  );
};
