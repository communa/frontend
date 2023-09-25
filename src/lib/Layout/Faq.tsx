import { IconButton } from '@mui/material';
import { FAQ_TOPICS } from 'src/config/consts';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export const Faq = () => {
  return (
    <ul className="faq">
      {FAQ_TOPICS.map(t => {
        return (
          <li key={t}>
            <div className="title">
              {t}
              <IconButton aria-label="delete" size="small">
                <KeyboardArrowDownIcon />
              </IconButton>
            </div>
            <div className="body">
              ....
            </div>
          </li>
        )
      })}
    </ul>
  );
};