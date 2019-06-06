import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Platform, TouchableOpacity, Dimensions, ToastAndroid, PermissionsAndroid } from 'react-native';
import InputComponent from './InputComponent';
import { colors, fonts } from '../../../constants/variables';
import { getAsyncStorage, setAsyncStorage } from '../../../utils/asyncStorage';
import { USER_DATA, ENDPOINTS, ACCESS_TOKEN, USER_ID } from '../../../constants/api';
import { POST } from '../../../utils/api/Request';
import { InputBox } from '../../../components/inputBox';
import IosToast from '../../../components/customToast';
import ProgressBar from '../../../components/loader/progressbar';
import SmsListener from 'react-native-android-sms-listener'
import {Languages} from '../../../components/Languages/All_languages'; 
const counterTime = 60;

async function requestReadSmsPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_SMS,
        {
          title: "Auto Verification OTP",
          message: "need access to read sms, to verify OTP"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("sms read permissions granted", granted);
      } else {
        console.log("sms read permissions denied", denied);
      }
    } catch (err) {
      console.warn(err);
    }
  }

class PhoneRegistration extends Component {
    constructor(props) {
        super(props);
        this.state={
            verificationCode: '',
            loading: false,
            error: '',
            timer: null,
            counter: 0,
        }
        this.SMSReadSubscription = {};
        Languages.setLanguage(global.code);
    }
    
    handleChange = (name, value) => {
        this.setState({[name]: value})
    }

    showToast(message) {   
        if(Platform.OS === 'ios'){
            this.refs.iosToast.show(message);
        }else{
            ToastAndroid.show(message, ToastAndroid.SHORT);
        }
    }

    resendCode = () => {
        const resendData = this.props.navigation.getParam('data', {})
        if(resendData.data){
            POST(ENDPOINTS.PHONE_VERIFICATION_REQUEST, resendData)
            .then((res)=> {
                this.setState({resend: false})
                this.startTimer()
            })
            .catch((error)=> {
                console.log(error)
            })
        }
    }

    componentWillMount(){
        this.startTimer()
    }

    componentDidMount(){
        requestReadSmsPermission();
        requestReadSmsPermission();
    SmsListener.addListener(message => alert(message));
    }

    componentWillUnmount(){
        // this.SMSReadSubscription.remove();
    }

    startTimer = () => {
        let timer = setInterval(this.tick, 1000);
        this.setState({timer})
    }

    tick = () => {
        if(this.state.counter >= 100){
            this.setState({counter: 0, resend: true})
            clearInterval(this.state.timer);

        }else{
            this.setState({counter: this.state.counter + 100/counterTime});
        }
    }

    onContinue = () => {
        let config = this.props.navigation.getParam('data', {})
        const { verificationCode } = this.state;
        delete config.data.phone;
        config.data.code = verificationCode;
        this.setState({loading: true})

        POST(ENDPOINTS.PHONE_VERIFICATION, config)
        .then(res => {
            this.setState({loading: false})
            this.showToast(Languages.PHONE_VERIFIED)
            console.log('phone verification res', res)
            let userData = {};
            userData[ACCESS_TOKEN] = res.data.token
            userData[USER_ID] = res.data.id
            setAsyncStorage(USER_DATA, JSON.stringify(userData))
            this.props.navigation.navigate('createPin')
        })
        .catch(error => {
            this.setState({loading: false, error: Languages.CODE_ARE_NOT_VALID})
            this.showToast('Error Occured')
            
            console.log(error)
        })
		
    }

    render() {
        const { loading, verificationCode, error, resend } = this.state;
        const resendData = this.props.navigation.getParam('data', {})
        const barWidth = Dimensions.get('screen').width;
        return (
                <InputComponent
                    header= {Languages.ENTER_VERIFICATION_CODE}
                    subHeader = {`${Languages.WE_SEND_CODE}${resendData.data.phone}${Languages.ENTER_CODE_PLZ}`}
                    onContinue = {this.onContinue}
                    loading={loading}
                    error={error}
                >
                <IosToast positionValue={200} ref="iosToast"/>
                 <InputBox
                        placeholder = "6-Digit Code"
                        value = {verificationCode}
                        // type="numeric"
                        onChange={(text)=> this.handleChange('verificationCode', text)}
                    />
                    <View style={{marginTop: 10}}>
                        <Text style={{fontFamily: fonts.nunitoLight}}>{Languages.TAKE_TO_MINUTES}</Text>
                        {resend !== undefined && <TouchableOpacity disabled={!resend} onPress = {this.resendCode} style={{justifyContent: 'flex-end'}}>
                            <Text style={styles.resendBtn}>{Languages.RESEND_CODE}</Text>
                        </TouchableOpacity>}
                    </View>
                    <View style={{position: 'absolute', bottom: -1}}>
                        <ProgressBar
                            width={barWidth}
                            maxValue={100}
                            barAnimationDuration={60}
                            value={this.state.counter}
                            borderRadius={2}
                            borderColor="transparent"
                            backgroundColor={colors.orange}
                            onComplete={() => this.setState({resend: true})}
                        />
                    </View>
                </InputComponent>
                
        );
    }
}

export default PhoneRegistration;

const styles = StyleSheet.create({
    resendBtn: {
        textAlign: 'right', 
        color: 'blue',
        fontFamily: fonts.nunitoLight,
    },
})