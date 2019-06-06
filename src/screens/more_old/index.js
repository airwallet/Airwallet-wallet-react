import { createStackNavigator } from 'react-navigation';
import More from './home';


export const MoreNavigation = createStackNavigator(
    { 
      more: More,
    },
    {
      navigationOptions: {
      header: null
      },
    }
  );
