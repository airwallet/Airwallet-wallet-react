import { createStackNavigator } from 'react-navigation'
import Home from './home';
import CyptoTransationDetail from './transactionDetail';
import MyAccount from './myAccount';
import SendCrypto from './sendCrypto'
import search from './search'
import searchDetail from './searchDetail';
import Tokens from './tokens';


export const WalletNavigation = createStackNavigator(
    { 
     
      home: Home,
      // search: search,
      searchDetail: searchDetail,
      // cyptoTransationDetail: CyptoTransationDetail,
      myAccount: MyAccount,      
      sendCrypto: SendCrypto,
    },
    {
      navigationOptions: {
      header: null
      },
    }
  );
