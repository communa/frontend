import {TelegramWrapper} from './Wrappers';
import LogoTelegram from '../LogoTelegram';
import {ConnectButtonTonTelegram} from '../ConnectButtonTonTelegram';

export const TelegramWelcome = () => {
  return (
    <TelegramWrapper id="welcome">
      <main>
        <LogoTelegram />
        <section>
          <h2>Welcome to Communa</h2>
          <p>
            Communa is an open-source web3 freelancing platform to connect
            businesses with talented professionals worldwide on blockchain.
          </p>
          
        </section>
        <nav>
          <ConnectButtonTonTelegram />
        </nav>
      </main>
    </TelegramWrapper>
  );
};
