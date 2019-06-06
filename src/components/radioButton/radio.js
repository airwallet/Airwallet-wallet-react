import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from './index';
 import React from 'react';
 import { View, Text } from 'react-native'
import { colors, fonts } from '../../constants/variables';
 

 
class RadioButtonProject extends React.Component{
    render(){
      const {male,female,other} =this.props;
      var radio_props = [
        {label:male , value: 0 },
        {label:female, value: 1 },
        {label:other, value: 2 }
      ];
        return (
            <View>
              <RadioForm
                radio_props={radio_props}
                buttonSize={10}
                labelHorizontal={true}
                buttonColor={colors.orange}
                selectedButtonColor={colors.orange}
                buttonStyle={{backgroundColor: 'red',}}
                labelStyle={{marginRight: 10, padding: 18}}
                labelStyle={{fontFamily: fonts.nunitoLight, color: colors.lightGrey, marginRight: 20,}}
                formHorizontal={true}
                // initial={0}
                onPress={this.props.onPress}
              />
            </View>
          );
    }
}

export default RadioButtonProject
   
  
