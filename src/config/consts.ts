let api = 'http://0.0.0.0:4000'

if (process.env.NODE_ENV === 'production') {
    api = 'https://communa.network';
}

export const API_HOST = api;
export const APP_NAME = 'communa.network';
export const TINYMCE_KEY = 'teqsytcw012x616ha2tnna7m814gzz1pwhrp1hj5rxtov90k';
export const WALLET_CONNECT_PROJECT_ID = 'f72f23676636bdae1b917bd2da168a95';