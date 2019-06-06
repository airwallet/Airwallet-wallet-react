import { createStackNavigator } from 'react-navigation';
import More from './home';
import Shop from './shopping';


export const MoreNavigation = createStackNavigator(
    { 
      shop: Shop,
      more: More,
    },
    {
      navigationOptions: {
      header: null
      },
    }
  );
