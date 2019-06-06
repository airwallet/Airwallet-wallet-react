import React, { Component } from 'react';
import { Text, View, StyleSheet, Platform, ToastAndroid, TouchableOpacity } from 'react-native';
import { deviceDimensions, colors, fonts } from '../../../constants/variables';
import Background from '../../../components/background';
import IosToast from '../../../components/customToast';
import PinNumber from '../../../components/pinNumber';
import { setAsyncStorage, getAsyncStorage } from '../../../utils/asyncStorage';
import { LOGIN_STATUS, PIN } from '../../../constants/api';
import {Languages} from '../../../components/Languages/All_languages'
const counterTime = 30;
const incorrectAttempte = 5;

class VerifyPin extends Component {
    constructor(){
        super();
        this.state = {
            password: [],
            verifyPin: false,
            pin: '',
            attempt: incorrectAttempte,
            timer: null,
            counter: counterTime,
            loading: true
        }
        Languages.setLanguage(global.code) 
    }

    componentWillMount(){
        getAsyncStorage(PIN).then(data => {
            console.log('pinis', pin)
            const pin = JSON.parse(data)
            this.setState({pin, loading: false})
        })
    }

    showToast(message) {   
        if(Platform.OS === 'ios'){
            this.refs.iosToast.show(message);
        }else{
            ToastAndroid.show(message, ToastAndroid.SHORT);
        }
    }

    onClickNum = (num) => {
        const { password, attempt } = this.state;
        if(attempt){
            if(!(password.length >= 4)){
                password.push(num);
                this.setState({password}, () => this.verifyPin())
            }
        }else{
            
        }
    }

    tick = () => {
        if(this.state.counter == 0){
            this.setState({counter: counterTime, attempt: incorrectAttempte})
            clearInterval(this.state.timer);
           
        }else{
            this.setState({counter: this.state.counter - 1});
        }
      }

    verifyPin = () => {
        const { password } = this.state;
        const userId = this.props.navigation.getParam('userId', '');
        
        if(password.length === 4){
            const { password, pin } = this.state;
            let newPin = '';
            let originalPin = '';
            password.map(p => {newPin += p})
            if(pin == newPin){
                // this.props.navigation.navigate('Tab')
                // setAsyncStorage(PIN, JSON.stringify(newPin))
                setTimeout(() => this.props.navigation.navigate('Tab', {userId}), 300)
            }else{
                setTimeout(() => {
                    this.setState({password: [], attempt: (this.state.attempt -1)},
                    () => {
                        if(!this.state.attempt){
                            let timer = setInterval(this.tick, 1000);
                            this.setState({timer})
                        }
                        this.showToast(`${Languages.PIN_ARE_NOT_CORRECT}, ${this.state.attempt} ${Languages.ATTEMPT_REMAINING}`)
                    }
                )}, 300)
            }
        }
    }

  render() {
      const { password } = this.state;
    return (
        <Background type="dark" style={styles.background}>
            <IosToast positionValue={160} ref="iosToast"/>
           
          <View style={styles.container}>
            <View style={styles.header}>
                {/* <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <FontAwesomeIcon style={styles.backBtn} name="angle-left" size={35} color="black" />
                </TouchableOpacity> */}
                <View></View>
                {this.state.counter != 30 && <Text style={styles.timer}>wait {this.state.counter} second</Text>}
            </View>
            <View style={styles.passCont}>
                <PinNumber
                    password = {password}
                    onClickNum={this.onClickNum}
                    title="Verify Your 4 Digit Pin"
                    hideBack
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

    header: {
        justifyContent: 'space-between', 
        flexDirection: 'row', 
        alignItems: 'center',
    },

    timer: {
        fontSize: 18,
        fontFamily: fonts.nunitoLight,
        paddingRight: 10,
    },

    logoCont: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

  container: {
    flex: 1,
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

export default VerifyPin;