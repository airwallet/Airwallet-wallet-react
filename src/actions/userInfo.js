import { user } from '../constants/action-types';

export const setUserInfo = data => ({
    type: user.SET_USER_INFO,
    payload: data,
  });