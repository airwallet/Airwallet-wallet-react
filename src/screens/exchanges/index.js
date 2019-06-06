import { createStackNavigator } from 'react-navigation';
import ExchangesDetail from './exchangesDetail';
import Wallets from './wallets';
// import CreateConnection from './createBinanceConnection';
import ExchangeWallet from './exchangesDetail/exchangeWallet'


export const ExchangesNavigation = createStackNavigator(
    { 
      wallets: Wallets,
      exchangesDetail: ExchangesDetail,
      exchangeWallet: ExchangeWallet
    },
    {
      initialRouteName: 'wallets',
      navigationOptions: {
      header: null
      },
    }
  );
