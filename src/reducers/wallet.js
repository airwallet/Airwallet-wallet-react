import { Map } from 'immutable';

import { wallet } from '../constants/action-types';

// Define initial state
const initialState = Map({
    homeStatus: {active: 'wallet', fromtab: false},
    walletData: [],
    balances: [],
    rates: [],
});

// Handle actions
export default function (state = initialState, action) {
  console.log('userbalances reducer', action)
  switch (action.type) {
    case wallet.SET_WALLET_ACTIVE:
      return state
        .set('homeStatus', action.payload)
    
    case wallet.SET_ALL_WALLET_DATA:
      return state
          .set('walletData', action.payload)

    case wallet.SET_BALANCES:
      return state
          .set('balances', action.payload)

    case wallet.SET_RATES:
      return state
          .set('rates', action.payload)
    default:
      return state;
  }
}
