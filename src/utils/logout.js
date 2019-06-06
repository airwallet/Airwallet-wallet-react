import { ACCESS_TOKEN, ENDPOINTS, LOGIN_STATUS, USER_ID, USER_DATA, BACKUP_PHRASE, PIN, ALL_WALLETS } from '../constants/api';
import { removeMultiAsyncStorage } from './asyncStorage';

export const logout = (callback) => {
    removeMultiAsyncStorage([USER_DATA, BACKUP_PHRASE, PIN, ALL_WALLETS], () => callback());
}