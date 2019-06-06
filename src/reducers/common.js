import { Map } from 'immutable';

import { common } from '../constants/action-types';

// Define initial state
const initialState = Map({
    isConnected: true,
});

// Handle actions
export default function (state = initialState, action) {

  switch (action.type) {
    case common.SET_NET_STATUS:
      return state
        .set('isConnected', action.payload)
    
    default:
      return state;
  }
}
