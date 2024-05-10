import {useTonConnectUI} from "@tonconnect/ui-react";
import TelegramIcon from '@mui/icons-material/Telegram';
import {ConnectButtonWrapper} from "./Wrappers";

export const ConnectButtonTon = () => {
  const [tonConnectUi] = useTonConnectUI();

  return (
    <ConnectButtonWrapper>
      <button onClick={() => tonConnectUi.openModal()} className="ton">
        <TelegramIcon />Log In with TON | Telegram
      </button>
    </ConnectButtonWrapper>
  );
};