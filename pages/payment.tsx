
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useAccount, usePrepareContractWrite, useContractWrite, erc20ABI } from 'wagmi'

import { DocumentPageWrapper } from 'src/lib/Wrappers';
import { APP_NAME } from 'src/config/consts';
import { ROUTER_ADDRESS, TOKEN_ADDRESS, COMMUNA_WALLET_ADDRESS } from 'src/config/consts';

import communaRouterAbi from 'CommunaRouter.json';
import HeaderDocs from 'src/lib/Layout/HeaderDocs';

const Payment = () => {
  const { address } = useAccount();
  const [addressTo, setAddressTo] = useState(COMMUNA_WALLET_ADDRESS);
  const [amount, setAmount] = useState('1');
  const amountEth = ethers.utils.parseEther(amount);

  const approve = usePrepareContractWrite({
    address: TOKEN_ADDRESS,
    abi: erc20ABI,
    functionName: 'approve',
    args: [
      ROUTER_ADDRESS,
      amountEth,
    ]
  });
  const transfer = usePrepareContractWrite({
    address: ROUTER_ADDRESS,
    abi: communaRouterAbi.abi,
    functionName: 'pay',
    args: [
      addressTo,
      TOKEN_ADDRESS,
      amountEth,
    ]
  });
  const writeApprove = useContractWrite(approve.config)
  const writeTransfer = useContractWrite(transfer.config)

  useEffect(() => {
    if (writeApprove.isSuccess) {
      writeTransfer.write?.();
    }
  }, [writeApprove.isSuccess]);

  const isAmountZero = Number(amount) === 0;
  const isProcessingApprove = writeApprove.isLoading;
  const isProcessingTransfer = writeTransfer.isLoading;

  console.log(writeApprove);
  console.log(writeTransfer);

  return (
    <DocumentPageWrapper>
      <Head>
        <title>Payment - {APP_NAME}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="index, follow" />
        <meta name="description" content={APP_NAME} />
        <link rel="icon" href="/logo.png" />
      </Head>
      <main>
        <HeaderDocs />
        <article>
          <h2>
            Make Payment (Goerli Testnet)
          </h2>
          <p>
            See <strong>CommunaToken</strong> contract on&nbsp;
            <a href={`https://goerli.etherscan.io/address/${TOKEN_ADDRESS}`} target="_blank" rel="noreferrer">
              Etherscan
            </a> | <a href="https://github.com/communa/contracts" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </p>
          <p>
            See <strong>CommunaRouter</strong> contract on&nbsp;
            <a href={`https://goerli.etherscan.io/address/${ROUTER_ADDRESS}`} target="_blank" rel="noreferrer">
              Etherscan
            </a> | <a href="https://github.com/communa/contracts" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </p>
          {writeTransfer.data && (
            <a href={`https://goerli.etherscan.io/tx/${writeTransfer.data.hash}`} target="_blank" rel="noreferrer">
              See tx#{writeTransfer.data.hash} on Etherscan
            </a>
          )}

          {writeApprove.error && (
            <div>An error occurred preparing the transaction: {writeApprove.error.message}</div>
          )}
          {writeTransfer.error && (
            <div>An error occurred preparing the transaction: {writeTransfer.error.message}</div>
          )}
          <form>
            <label>Address from (connected wallet)</label>
            <input
              className="field"
              type="text"
              disabled
              value={address}
            />
            <label>Address to</label>
            <input
              className="field"
              type="text"
              placeholder="0x0000000000000000000000000000000000000000"
              defaultValue={addressTo}
              onChange={e => setAddressTo(e.target.value)}
            />
            <label>Amount</label>
            <input
              className="field"
              type="number"
              placeholder="1"
              defaultValue={amount}
              onChange={e => setAmount(e.target.value || '0')}
            />
            <br />
            <button
              type='button'
              className='update'
              onClick={() => writeApprove.write?.()}
              disabled={isProcessingApprove || isProcessingTransfer || isAmountZero}
            >
              Send {amount} COMM
            </button>
          </form>
        </article>
      </main>
    </DocumentPageWrapper >
  );
};

export default Payment;
