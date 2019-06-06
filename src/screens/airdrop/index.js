import { createStackNavigator } from 'react-navigation';
import ProjectPageIntro from './projectPageIntro'
import AirDrop from './home';


export const AirDropNavigation = createStackNavigator(
    { 
        airDrop: AirDrop,
        // projectIntro: ProjectPageIntro,
    },
    {
      navigationOptions: {
        header: null
      },
    }
  );
