import {TelegramWrapper} from './Wrappers';
import LogoTelegram from '../LogoTelegram';

export const TelegramLoading = () => {
  return (
    <TelegramWrapper id="loading">
      <main>
        <LogoTelegram />
      </main>
    </TelegramWrapper>
  );
};
