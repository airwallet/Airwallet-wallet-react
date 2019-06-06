import * as authenticationApi from '../utils/api/authentication';
import loginActions from '../constants/action-types/login';
import commonActions from '../constants/action-types/common';


export const loginUser = params => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: loginActions.AUTH_USER,
  promise: () => authenticationApi.loginUser(params),
});

export const signUp = params => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: loginActions.SIGN_UP_USER,
  promise: () => authenticationApi.signUp(params),
});

export const sendVerificationCode = params => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: loginActions.SEND_VERIFICATION_CODE,
  promise: () => authenticationApi.sendVerificationCode(params),
});

export const verifyCode = params => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: loginActions.VERIFY_CODE,
  promise: () => authenticationApi.verifyCode(params),
});

export const setPhoneNumber = number => ({
  type: loginActions.VERIFICATION_CODE.SET_PHONE_NUMBER,
  payload: number,
});

export const logoutUser = (params, onSuccessCallback) => ({
  type: loginActions.UNAUTH_USER,
});
