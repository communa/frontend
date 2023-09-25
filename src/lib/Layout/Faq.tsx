import { IconButton } from '@mui/material';
import { FAQ_TEXTS, FAQ_TOPICS } from 'src/config/consts';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { FaqWrapper } from './Wrappers';
import { useState } from 'react';

export const Faq = () => {
  const [display, setDisplay] = useState(new Set());

  const onToggleClick = (i: number) => {
    if (display.has(i)) {
      display.delete(i);
    } else {
      display.add(i);
    }

    setDisplay(new Set(display));
  }

  return (
    <FaqWrapper className="faq">
      {FAQ_TOPICS.map((t, i) => {
        return (
          <li key={i} className={display.has(i) ? `active` : ''}>
            <div className="title" onClick={() => onToggleClick(i)}>
              {t}{display.has(i)}
              <IconButton aria-label="delete" size="small">
                {display.has(i) ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </IconButton>
            </div>
            <p>
              {FAQ_TEXTS[i]}
            </p>
          </li>
        )
      })}
    </FaqWrapper >
  );
};