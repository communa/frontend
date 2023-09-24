
import { useAccount, usePrepareContractWrite, useContractWrite } from 'wagmi'
import { TOKEN_ADDRESS } from 'src/config/consts';

import communaTokenAbi from 'CommunaToken.json';
import { ContractAirdropWrapper } from '../Wrappers';

const ContractAirdrop = () => {
  const { address } = useAccount();

  const approve = usePrepareContractWrite({
    address: TOKEN_ADDRESS,
    abi: communaTokenAbi.abi,
    functionName: 'airdrop',
    args: []
  });

  const writeApprove = useContractWrite(approve.config);
  const isProcessingAirdrop = writeApprove.isLoading;

  console.log(writeApprove);

  const addToMetaMask = async () => {
    const tokenSymbol = 'COMM';
    const tokenDecimals = 18;

    // @ts-ignore
    const wasAdded = await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: TOKEN_ADDRESS, // The address of the token.
          symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 characters.
          decimals: tokenDecimals, // The number of decimals in the token.
          image: 'https://communa.network/logo.png',
        },
      },
    });

    console.log(wasAdded);
  };

  return (
    <ContractAirdropWrapper>
      <p>
        See <strong>CommunaToken</strong> contract on&nbsp;
        <a href={`https://goerli.etherscan.io/address/${TOKEN_ADDRESS}`} target="_blank" rel="noreferrer">
          Etherscan
        </a> | <a href="https://github.com/communa/contracts" target="_blank" rel="noreferrer">
          GitHub
        </a> | <a href="#" onClick={() => addToMetaMask()}>
          Add to MetaMask
        </a>
      </p>
      {writeApprove.data && (
        <a href={`https://goerli.etherscan.io/tx/${writeApprove.data.hash}`} target="_blank" rel="noreferrer">
          See tx#{writeApprove.data.hash} on etherscan
        </a>
      )}
      {writeApprove.error && (
        <div>An error occurred preparing the transaction: {writeApprove.error.message}</div>
      )}
      <br />
      <p>Connect wallet to the website, communa tokens to be send you wallet.</p>
      <p><strong>{address}</strong></p>
      <button
        type='button'
        className='update'
        onClick={() => writeApprove.write?.()}
        disabled={isProcessingAirdrop}
      >
        Receive
      </button>
    </ContractAirdropWrapper >
  );
};

export default ContractAirdrop;
