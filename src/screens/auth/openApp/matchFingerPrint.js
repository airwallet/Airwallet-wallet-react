
import React, { Component, PropTypes } from 'react';
import {
    Alert, View, StyleSheet, TouchableOpacity, Text
} from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import FingurPrintScaner from '../../../components/fingerPrintScaner/index';
import BottomButton from '../../../components/bottomButton';
import { dimensions, fonts } from '../../../constants/variables';
import FontAwesomeIcon from 'react-native-vector-icons/dist/FontAwesome';
import {Languages} from '../../../components/Languages/All_languages';
 
class MatchFingerPrint extends Component {
 
  constructor(props) {
    super(props);
    this.state = { errorMessage: undefined };
    Languages.setLanguage(global.code) 
  }
 
//   componentWillMount() {
//     FingerprintScanner
//       .authenticate({ onAttempt: this.handleAuthenticationAttempted })
//       .then(() => {
//         this.props.navigation.navigate('Tab')
//       })
//       .catch((error) => {
//         this.setState({ errorMessage: error.message });
//       });
//   }
 
//   componentWillUnmount() {
//     FingerprintScanner.release();
//   }
 
//   handleAuthenticationAttempted = (error) => {
//     this.setState({ errorMessage: error.message });
//   };
 
  render() {
    const { errorMessage } = this.state;
 
    return (
      <View>
        <FingurPrintScaner 
            hideBack 
            title={Languages.VERIFY_FINGERPRINT}
            navigation={this.props.navigation} 
            skippable={true} 
            onSkip={() => this.props.navigation.navigate('verifyPin')}
            onVerify = {() => this.props.navigation.navigate('Tab')}
            type="verify"
        />
      </View>
    );
  }
}
 
export default MatchFingerPrint;


const styles = StyleSheet.create({
  bottomButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: dimensions.bottomButtonHeight
},

continueTxt: {
  color:'white', 
  fontSize: 20, 
  marginRight: 20,
  fontFamily: fonts.nunitoLight
},
})