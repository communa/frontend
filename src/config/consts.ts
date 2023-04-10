let api = 'http://0.0.0.0:4000'

if (process.env.NODE_ENV === 'production') {
    api = 'https://communa.network';
}

export const API_HOST = api;
export const APP_NAME = 'communa.network';