export default {
  AUTH_USER: {
    START: 'auth.user:start',
    SUCCESS: 'auth.user:success',
    FAIL: 'auth.user:fail',
  },
  SIGN_UP_USER: {
    START: 'signUp.user:start',
    SUCCESS: 'signUp.user:success',
    FAIL: 'signUp.user:fail',
  },
  SEND_VERIFICATION_CODE: {
    START: 'send.code:start',
    SUCCESS: 'send.code:success',
    FAIL: 'send.code:fail',
  },
  VERIFY_CODE: {
    START: 'verify.code:start',
    SUCCESS: 'verify.code:success',
    FAIL: 'verify.code:fail',
  },
  VERIFICATION_CODE: {
    SET_PHONE_NUMBER: 'set.phone.number',
  },
  UNAUTH_USER: 'unauth.user'
};
