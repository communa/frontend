let api = 'http://0.0.0.0:4000'

if (process.env.NODE_ENV === 'production') {
    api = 'https://communa.network';
}

export const API_HOST = api;
export const APP_NAME = 'Web3 Freelance Jobs';
export const APP_TITLE = 'communa.network';
export const TINYMCE_KEY = 'teqsytcw012x616ha2tnna7m814gzz1pwhrp1hj5rxtov90k';
export const WALLET_CONNECT_PROJECT_ID = 'f72f23676636bdae1b917bd2da168a95';

export const ROUTER_ADDRESS = '0x51F7e80D725309b519E5538F993C5B3a6694C647';
export const TOKEN_ADDRESS = '0x86C948f06AAF9dF1199dF9539Ec3E56FbeE23CA9';
export const COMMUNA_WALLET_ADDRESS = '0x86C948f06AAF9dF1199dF9539Ec3E56FbeE23CA9';

export const FAQ_TOPICS = [
    'Tell me more what are the fees?',
    'How can I publish a job and is it free?',
    'I want to join communa as a freelancer and apply on a job?',
    'Explain me, what Communa Token is about?',
    'What is Communa TimeTracker and why do I need it?',
    'How do I get paid for my work as a freelancer?',
];

export const FAQ_TEXTS = [
    '...',
    '...',
    '...',
    '...',
    '...',
    '...',
];