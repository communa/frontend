
import Head from 'next/head';
import { APP_NAME } from 'src/config/consts';
import { DocumentPageWrapper } from 'src/lib/Wrappers';
import HeaderDocs from 'src/lib/Layout/HeaderDocs';
import ContractAirdrop from 'src/lib/Contract/Airdrop';

const Payment = () => {
  return (
    <DocumentPageWrapper>
      <Head>
        <title>Token airdrop - {APP_NAME}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="index, follow" />
        <meta name="description" content={APP_NAME} />
        <link rel="icon" href="/logo.png" />
      </Head>
      <main>
        <aside>
          <HeaderDocs />
        </aside>
        <article>
          <h2>
            Make Payment (Goerli Testnet)
          </h2>
          <ContractAirdrop />
        </article>
      </main>
    </DocumentPageWrapper >
  );
};

export default Payment;
