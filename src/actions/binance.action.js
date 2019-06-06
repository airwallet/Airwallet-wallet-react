import * as authenticationApi from '../utils/api/authentication';
import { binance } from '../constants/action-types';

export const setHomeActive = data => ({
    type: binance.GET_ACCOUNT_INFO,
    payload: data,
});