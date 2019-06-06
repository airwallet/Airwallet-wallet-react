import { common } from '../constants/action-types';

export const setNetStatus = data => ({
    type: common.SET_NET_STATUS,
    payload: data,
  });