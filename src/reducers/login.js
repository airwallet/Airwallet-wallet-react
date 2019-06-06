import { Map } from 'immutable';

import loginActions from '../constants/action-types/login';

// Define initial state
const initialState = Map({
  authenticationIsInProgress: false,
  signUpIsInProgress: false,
  verifyCodeInProgress: false,
  signingIn: false,
  errors: Map({}),
  currentUserInfo: Map({}),
  currentUserToken: Map({}),
  phoneVerification: Map({}),
  verificationPhoneNumber: null,
});

// Handle actions
export default function (state = initialState, action) {
  switch (action.type) {
    case loginActions.AUTH_USER.START:
      return state
        .set('authenticationIsInProgress', true)
        .set('signingIn', false)
        .set('currentUserInfo', Map({}))
        .set('currentUserToken', Map({}))
        .set('errors', Map({}));
    case loginActions.AUTH_USER.SUCCESS:
      return state
        .set('authenticationIsInProgress', false)
        .set('signingIn', true)
        .set('currentUserInfo', Map({
          ...state.get('currentUserInfo').toJS(),
        //   ...action.payload.user,
        }))
        .set('currentUserToken', Map({
          ...state.get('currentUserToken').toJS(),
        //   ...action.payload.token,
        }))
        .set('errors', Map({}));
    case loginActions.AUTH_USER.FAIL:
      return state
        .set('authenticationIsInProgress', false)
        .set('signingIn', false)
        .set('currentUserInfo', Map({}))
        .set('currentUserToken', Map({}))
        .set('errors', Map({ ...action.errors }));

    case loginActions.SIGN_UP_USER.START:
      return state
        .set('signUpIsInProgress', true)
        .set('currentUserInfo', Map({}))
        .set('errors', Map({}));
    case loginActions.SIGN_UP_USER.SUCCESS:
      return state
        .set('signUpIsInProgress', false)
        .set('currentUserInfo', Map({
          ...state.get('currentUserInfo').toJS(),
          ...action.payload,
        }))
        .set('errors', Map({}));
    case loginActions.SIGN_UP_USER.FAIL:
      return state
        .set('signUpIsInProgress', false)
        .set('currentUserInfo', Map({}))
        .set('errors', Map({ ...action.errors }));

    case loginActions.VERIFY_CODE.START:
      return state
        .set('verifyCodeInProgress', true)
        .set('phoneVerification', Map({}))
        .set('errors', Map({}));
    case loginActions.VERIFY_CODE.SUCCESS:
      return state
        .set('verifyCodeInProgress', false)
        .set('phoneVerification', Map({ ...action.payload }))
        .set('errors', Map({}));
    case loginActions.VERIFY_CODE.FAIL:
      return state
        .set('verifyCodeInProgress', false)
        .set('phoneVerification', Map({}))
        .set('errors', Map({ ...action.errors }));

    case loginActions.VERIFICATION_CODE.SET_PHONE_NUMBER:
      return state
        .set('verificationPhoneNumber', action.payload)

    case loginActions.UNAUTH_USER:
      return state
        .set('authenticationIsInProgress', false)
        .set('signingIn', false)
        .set('currentUserInfo', Map({}))
        .set('currentUserToken', Map({}))
        .set('errors', Map({}));


    default:
      return state;
  }
}
