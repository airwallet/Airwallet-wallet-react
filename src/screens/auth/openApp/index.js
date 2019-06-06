import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import MatchFingerPrint from './matchFingerPrint';
import VerifyPin from './verifyPin';
import Loader from '../../../components/loader';


class SensorInfo extends Component {
    constructor(){
        super();
        this.state = {
            detectingTouchId: true
        }
    }
   
    componentWillMount(){
        FingerprintScanner
            .isSensorAvailable()
            .then(biometryType => {
                if (biometryType === 'Face ID') {
                    this.setState({detectingTouchId: false})
                    this.props.navigation.navigate('matchFingerPrint', {sensorType: 'faceId'})
                } else {
                    this.setState({detectingTouchId: false})
                    this.props.navigation.navigate('matchFingerPrint', {sensorType: 'touchId'})
                }
                })
                .catch(error => {
                    this.setState({detectingTouchId: false})
                    this.props.navigation.navigate('verifyPin')
                });
    }

    render(){
        if(this.state.detectingTouchId){
            return <Loader/>
        }
        return <View/>
    }
}

export const OpenApp = createStackNavigator(
    { 
      sensorInto: SensorInfo,
      matchFingerPrint: MatchFingerPrint,
      verifyPin: VerifyPin,
    },
    {
      initialRouteName: 'sensorInto',
      navigationOptions: {
      header: null
      },
    }
  );


