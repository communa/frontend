import {CircularProgress} from '@mui/material';

import {TelegramWrapper} from './Wrappers';

export const TelegramLoading = () => {
  return (
    <TelegramWrapper id="loading">
      <main>
        <CircularProgress/>
      </main>
    </TelegramWrapper>
  );
};
