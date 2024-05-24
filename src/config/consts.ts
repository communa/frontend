let api = 'http://0.0.0.0:4000';

// if (process.env.NODE_ENV === 'production') {
api = 'https://app.communa.network';
// }

export const DOWNLOAD = {
  version: '0.6.1',
  windows:
    'https://assets.communa.network/Communa_TimeTracker_0.6.1-x86_64.exe',
  linux:
    'https://assets.communa.network/Communa_TimeTracker_0.6.1-x86_64.AppImage',
  mac: 'https://assets.communa.network/Communa_TimeTracker_0.6.1-universal.dmg',
};

export const API_HOST = api;
export const APP_NAME =
  'Time tracking and Decentralized Freelance Identity - Communa Network';
export const APP_DESCRIPTION =
  'Communa is an open-source web3 freelancing platform to connect businesses with talented professionals worldwide on blockchain.';
export const APP_TITLE = 'communa.network';
export const TINYMCE_KEY = 'teqsytcw012x616ha2tnna7m814gzz1pwhrp1hj5rxtov90k';
export const WALLET_CONNECT_PROJECT_ID = 'f72f23676636bdae1b917bd2da168a95';

export const ROUTER_ADDRESS = '0x51F7e80D725309b519E5538F993C5B3a6694C647';
export const TOKEN_ADDRESS = '0x86C948f06AAF9dF1199dF9539Ec3E56FbeE23CA9';
export const COMMUNA_WALLET_ADDRESS =
  '0x86C948f06AAF9dF1199dF9539Ec3E56FbeE23CA9';

export const JOB_KEYWORDS = ['Web3', 'Ethereum', 'Solidity', 'Rust'];

export const TELEGRAM_BOT_ID = 'https://t.me/communa_network_bot/user';
