import {Button} from '@telegram-apps/telegram-ui';
import {TelegramWrapper} from './Wrappers';
import {useState} from 'react';
import {IUser} from 'src/interface/IUser';
import {TextField} from '@mui/material';

export const TelegramWizard = ({user}: {
  user: IUser
}) => {
  const [page, setPage] = useState(0);
  const [userName, setUserName] = useState(user.userName);
  const [company, setCompany] = useState(user.company);
  const [country, setCountry] = useState(user.country);
  const [city, setCity] = useState(user.city);  

  const [bio, setBio] = useState(user.bio);
  const [skills, setSkills] = useState(user.skills);
  const [price, setPrice] = useState(user.price);

  if (page === 3) {
    return (
      <TelegramWrapper id="wizard">
        <main>
          <h2>Ready</h2>
          <footer>
            <Button mode='plain' onClick={() => setPage(2)}>
              Back
            </Button>     
          </footer>
        </main>
      </TelegramWrapper>
    );
  }
  
  if (page === 2) {
    return (
      <TelegramWrapper id="wizard">
        <main>
          <h2>Page #2</h2>
          <TextField
            label="Skills"
            variant="outlined"
            placeholder="Skill comma separated"
            size="small"
            defaultValue={user.skills}
            onChange={e => setSkills(e.target.value)}
          />                             
          <TextField
            label="Price in USD"
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
          <footer>
            <Button mode='plain' onClick={() => setPage(1)}>
              Back
            </Button>
            <Button mode='bezeled' onClick={() => setPage(3)}>
              Continue
            </Button>          
          </footer>
        </main>
      </TelegramWrapper>
    );
  }  
  
  if (page === 1) {
    return (
      <TelegramWrapper id="wizard">
        <main>
          <h2>Page #1</h2>
          <div className="fields">
            <TextField
              label="Country"
              variant="outlined"
              placeholder="Country"
              size="small"
              defaultValue={user.country}
              onChange={e => setCountry(e.target.value)}
            />
            <TextField
              label="City"
              variant="outlined"
              placeholder="City"
              size="small"
              defaultValue={user.city}
              onChange={e => setCity(e.target.value)}
            />   
          </div>              
          <footer>
            <Button mode='plain' onClick={() => setPage(0)}>
              Back
            </Button>
            <Button mode='bezeled' onClick={() => setPage(2)}>
              Continue
            </Button>          
          </footer>
        </main>
      </TelegramWrapper>
    );
  }
  
  return (
    <TelegramWrapper id="wizard">
      <main>
        <h2>Hello</h2>
        <div className="fields">
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
        </div>        
        <footer>
          <Button mode='bezeled' onClick={() => setPage(1)}>
            Continue
          </Button>          
        </footer>
      </main>
    </TelegramWrapper>
  );
};
