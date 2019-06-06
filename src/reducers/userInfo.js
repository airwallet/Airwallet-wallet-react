import { Map } from 'immutable';

import { user } from '../constants/action-types';

// Define initial state
const initialState = Map({
    userInfo: {},
});

// Handle actions
export default function (state = initialState, action) {

  switch (action.type) {
    case user.SET_USER_INFO:
    console.log('setUserInfo', action.payload)
      return state
        .set('userInfo', action.payload)
    
    default:
      return state;
  }
}
