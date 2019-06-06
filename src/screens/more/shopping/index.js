import { createStackNavigator } from 'react-navigation';
import Home from './home';
import ProductDetail from './detail';


const ShoppingNavigation = createStackNavigator(
    { 
      home: Home,
      detail: ProductDetail
    },
    {
      navigationOptions: {
      header: null
      },
    }
  );

export default ShoppingNavigation;