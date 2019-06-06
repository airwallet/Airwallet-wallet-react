import * as authenticationApi from '../utils/api/authentication';
import {wallet} from '../constants/action-types';

export const setHomeActive = data => ({
    type: wallet.SET_WALLET_ACTIVE,
    payload: data,
  });

export const setWalletData = data => ({
    type: wallet.SET_ALL_WALLET_DATA,
    payload: data,
  });

export const setBalances = data => ({
    type: wallet.SET_BALANCES,
    payload: data,
  });

export const setRates = data => ({
    type: wallet.SET_BALANCES,
    payload: data,
  });