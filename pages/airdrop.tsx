
import Head from 'next/head';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { PaymentPageWrapper } from 'src/lib/Wrappers';
import { APP_NAME } from 'src/config/consts';
import Header from 'src/lib/Layout/Logo';
import ContractAirdrop from 'src/lib/Contract/airdrop';

const Payment = () => {
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
        <ContractAirdrop />
      </main>
    </PaymentPageWrapper >
  );
};

export default Payment;
