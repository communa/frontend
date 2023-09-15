
import Head from 'next/head';
import { useAccount, usePrepareContractWrite, useContractWrite } from 'wagmi'

import { PaymentPageWrapper } from 'src/lib/Wrappers';
import { APP_NAME } from 'src/config/consts';
import Header from 'src/lib/Layout/Header';
import { TOKEN_ADDRESS } from 'src/config/consts';
import { Breadcrumbs, Link, Typography } from '@mui/material';

import communaTokenAbi from 'CommunaToken.json';

const Payment = () => {
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
    <PaymentPageWrapper>
      <Head>
        <title>Smart Contracts - AirDrop - {APP_NAME}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="index, follow" />
        <meta name="description" content={APP_NAME} />
        <link rel="icon" href="/logo.png" />
      </Head>
      <main>
        <Header />
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Smart contracts
          </Link>
          <Typography color="text.primary">Airdrop</Typography>
        </Breadcrumbs>
        <h2>
          Airdrop 10 tokens (Goerli Testnet)
        </h2>
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
        <form>
          <label>Address to (connected wallet)</label>
          <input
            className="field"
            type="text"
            disabled
            value={address}
          />
          <br />
          <button
            type='button'
            className='update'
            onClick={() => writeApprove.write?.()}
            disabled={isProcessingAirdrop}
          >
            Receive
          </button>
        </form>
      </main>
    </PaymentPageWrapper >
  );
};

export default Payment;
