import {Button} from '@telegram-apps/telegram-ui';
import {TelegramWrapper} from './Wrappers';
import LogoTelegram from '../LogoTelegram';

export const TelegramAbout = ({ fnBack}: {fnBack: Function}) => {
  return (
    <TelegramWrapper id="about">
      <main>
        <LogoTelegram />
        <h2>P2P Freelance Marketplace</h2>
        <article>
          <p>
            Our mini-app offers essential features for freelancers and service providers. Users can log in with a web3 wallet, complete their profiles, and share a link for instant payment for personal services.
          </p>
          <br/>
          <p>
            You can find the Telegram Wallet in the main menu or use other web3 wallets like Toncoin. Telegram is one of the most popular messengers with a user base of around 1 billion, making our mini-app accessible to a vast audience.
          </p>
          <br/>
          <p>
          Many web3 wallets support the TON blockchain and can be used alongside the built-in Telegram wallet. The built-in wallet is easy to find in the main menu, ready to use, and highly user-friendly.
          </p>
          <br/>
          <p>
            The TON blockchain supports smart contracts, leveraging the full benefits of decentralized finance, including secure payments through smart contracts, ensuring safe transactions.
          </p>
          <br/>
          <p>
            Telegram is continuously evolving, regularly releasing updates, offering more possibilities and a growing audience. This development opens up vast opportunities and motivation for developers to launch and expand mini-apps and dapps
          </p>
        </article>  
      </main>  
      <footer>
        <Button mode='bezeled' onClick={() => fnBack()}>
          Close
        </Button>        
      </footer>            
    </TelegramWrapper>
  );
};
