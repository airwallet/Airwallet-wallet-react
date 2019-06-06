export const ACCESS_TOKEN = 'accessToken';
export const FBTOKEN = 'fbtoken';
export const INSTA_TOKEN = 'instaTokne';
export const LOGIN_STATUS = 'loginStatus';
export const USER_ID = 'userId';
export const USER_DATA = 'userData';
export const USER_INFO = 'userInfo';
export const PIN = 'pin';
export const ALL_WALLETS = 'allWallets';
export const BALANCES = 'balances';
export const RATES = 'rates';
export const PRICES = 'prices';
export const CURRENCIES = 'currencies'
export const BACKUP_PHRASE = 'backupPhrase';
export const DEPOSITS = 'deposits';
export const WITHDRAWS = 'withdraws';



export const BINANCE_BASE_URL = "https://api.binance.com";

export const BINANCE_ENDPOINTS = {
    NEW_ORDER: '/api/v3/order',
}

export const ENDPOINTS = {
    GET_INITIAL_INFO: '/api/wallet',
    GET_ADDRESS: '/api/wallet/addresses',
    CREATE_WALLET_ACCOUNT: '/api/wallet/create',
    GET_CURRENCIES: '/api/wallet/currencies',
    GET_WITHDRAWS: '/api/wallet/withdraws',
    GET_DEPOSITS: '/api/wallet/deposits',
    GET_BALANCES: '/api/wallet/balances',
    SEND: '/api/exchange/transfer',
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    PHONE_VERIFICATION_REQUEST: '/api/auth/phone_verification_request',
    PHONE_VERIFICATION: '/api/auth/phone_verification',
    GENERATE_BACKUP_PHRASE: '/api/auth/generate_backup_phrase',
    CONFIRM_BACKUP_PHRASE: '/api/auth/confirm_backup_phrase',
    EMAIL_CONFIRMATION: '/api/auth/confirmation_request',
    RESET_PASSWORD_REQUEST: '/api/auth/reset_password_request',
    RESET_PASSWORD: '/api/auth/reset_password',
    USER: '/api/auth/user',
    GET_PRICES: '/api/exchange/prices',
    GET_EXCHANGES: '/api/exchange',

    VERSION_ALERT: '/api/settings/version',
}

export const EXCHANGES = {
    BINANCE_INFO: 'binanceInfo',
    LOGIN_BINANCE: '/api/exchange/binance/login',
    ACCOUNT_INFO_BINANCE: '/api/exchange/binance/account_info',

    OKEX_INFO: 'okexInfo',
    LOGIN_OKEX: '/api/exchange/okex/login',
    ACCOUNT_INFO_OKEX: '/api/exchange/okex/account_info',

    COINBASE_INFO: 'coinbaseInfo',
    LOGIN_COINBASE: '/api/exchange/coinbase/login',
    ACCOUNT_INFO_COINBASE: '/api/exchange/coinbase/account_info',

    KUCOIN_INFO: 'kucoinInfo',
    LOGIN_KUCOIN: '/api/exchange/kucoin/login',
    ACCOUNT_INFO_KUCOIN: '/api/exchange/kucoin/account_info',
}