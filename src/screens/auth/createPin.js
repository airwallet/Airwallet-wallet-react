import React, { Component } from 'react';
import { Text, View, StyleSheet, Platform, ToastAndroid, TouchableOpacity } from 'react-native';
import { deviceDimensions, colors, fonts } from '../../constants/variables';
import Background from '../../components/background';
import IosToast from '../../components/customToast';
import FontAwesomeIcon from 'react-native-vector-icons/dist/FontAwesome';
import PinNumber from '../../components/pinNumber';
import { setAsyncStorage } from '../../utils/asyncStorage';
import { PIN } from '../../constants/api';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import {Languages} from '../../components//Languages/All_languages'

let deviceWidth = deviceDimensions.width;
const fillColor = colors.orange;
const emptyColor = colors.lightGrey;

class CreatePin extends Component {
    constructor(){
        super();
        this.state = {
            password: [],
            verifyPin: false,
            oldPin: '',
            sensorType: false,
        }
        Languages.setLanguage("en-US");
    }

    showToast(message) {   
        if(Platform.OS === 'ios'){
            this.refs.iosToast.show(message);
        }else{
            ToastAndroid.show(message, ToastAndroid.SHORT);
        }
    }

    componentWillMount(){
        FingerprintScanner
            .isSensorAvailable()
            .then(biometryType => {
                if (biometryType === 'Face ID') {
                    this.setState({detectingTouchId: false, sensorType: 'faceId'})
                } else {
                    this.setState({detectingTouchId: false, sensorType: 'touchId'})
                    // alert('touchid')
                }
                })
                .catch(error => {
                    this.setState({detectingTouchId: false})
                });
    }

    onClickNum = (num) => {
        const { password } = this.state;
        if(!(password.length >= 4)){
            password.push(num);
            this.setState({password}, () => this.verifyPin())
        }
    }

    verifyPin = () => {
        const { password, verifyPin, sensorType } = this.state;
        const onCreate = this.props.navigation.getParam('onCreate', '')
        if(password.length === 4){
            if(verifyPin){
                const { password, oldPin } = this.state;
                let newPin = '';
                password.map(p => {newPin += p})
                if(oldPin === newPin){
                    this.setState({verifyPin: false, password: []})
                    setAsyncStorage(PIN, JSON.stringify(oldPin))
                    if(onCreate){
                        this.props.navigation.navigate(onCreate)
                    }else{
                        if(sensorType){
                            this.props.navigation.navigate('verifyFingerPrint', {sensorType})
                        }else{
                            this.props.navigation.navigate('verifyFingerPrint', {sensorType})
                        }
                    }
                    
                }else{
                    this.showToast(Languages.PIN_ARE_NOT_SAME)
                    this.setState({verifyPin: false, password: []})
                }
            }else{
                const { password } = this.state;
                let oldPin = '';
                password.map(p => {oldPin += p})
                setTimeout(() => {this.setState({verifyPin: true, password: [], oldPin})}, 300)
            }
        }
    }

  render() {
      const { password, verifyPin } = this.state;
    return (
        <Background smallTopMargin type="dark" style={styles.background}>
            <IosToast positionValue={160} ref="iosToast"/>
           
          <View style={styles.container}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <FontAwesomeIcon style={styles.backBtn} name="angle-left" size={35} color="black" />
            </TouchableOpacity>
            <View style={styles.passCont}>
                <PinNumber
                    password = {password}
                    onClickNum={this.onClickNum}
                    title={`${verifyPin ? Languages.VERIFY : Languages.CREATE} ${Languages.YOUR_FOUR_DIGIT_PIN}`}
                />
            </View>
          </View>
        </Background>
    );
  }
}


const styles = StyleSheet.create({
    background: {
        padding: 0,
    },

    logoCont: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

  container: {
    flex: 2,
  },

  passCont:{
    alignItems:'center',
  },

  numCont:{
    backgroundColor:'white',
    flex: 5,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },

  pinTitle:{
    alignItems:'center', 
    justifyContent:'center',
    fontSize: 25,
    color: colors.orange,
    fontFamily: fonts.nunitoLight,
  },

  password:{
    alignItems:'center',
    justifyContent:'center',
  },

  pinCodes: {
    // padding:12,
    borderWidth:0,
    borderColor:'white',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'white',
    borderRadius:100,
    marginHorizontal:7,
    height:40,
    width:40,
  },

  description: {
    color: colors.orange,
    fontSize:15,
    alignItems:'center', 
    justifyContent:'center',
    alignItems:'center', 
    justifyContent:'center',
    fontFamily: fonts.nunitoLight,
  },

  desView:{
    alignItems:'center', 
    justifyContent:'center',
  },

  pincode: {
      flexDirection:'row',
      paddingVertical:20,
  },

  keyboardNum: {
      color:'#444242', 
      fontSize:20, 
      fontWeight:'bold',
    },

    backBtn: {
        paddingLeft: 10,
        // paddingTop: 10,
    }
});

export default CreatePin;