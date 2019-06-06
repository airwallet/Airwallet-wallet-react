import React, { Component } from 'react';
import { View, Text, Image, TextInput, StyleSheet, Platform, TouchableOpacity, ToastAndroid, Dimensions } from 'react-native';
import InputComponent from './InputComponent';
import { colors, fonts, isIos } from '../../../constants/variables';
import { getAsyncStorage } from '../../../utils/asyncStorage';
import { USER_DATA, ENDPOINTS, ACCESS_TOKEN } from '../../../constants/api';
import { POST } from '../../../utils/api/Request';
import { InputBox } from '../../../components/inputBox';
import IosToast from '../../../components/customToast';
import ProgressBar from '../../../components/loader/progressbar';
import {Languages} from '../../../components/Languages/All_languages'
import {showNotification} from '../../../utils/showNotification'
const counterTime = 60;

class EmailVerification extends Component {
    constructor(props) {
        super(props);
        this.state={
            verificationCode: '',
            loading: false,
            error: '',
            timer: null,
            counter: 0,
        }
        Languages.setLanguage(global.code) 
    }
    
    handleChange = (name, value) => {
        this.setState({[name]: value, error: ''})
    }

    resendCode = () => {
        const resendData = this.props.navigation.getParam('data', {})
        if(resendData.data){
            POST(ENDPOINTS.EMAIL_CONFIRMATION, resendData)
            .then((res)=> {
                this.setState({resend: false})
                this.showToast(Languages.CODE_RESEND)
                this.startTimer()
            })
            .catch((error)=> {
                this.showToast(Languages.ERROR_OCCURED)
                console.log(error)
                showNotification(error.response);
            })
        }
    }
    
    componentWillMount(){
        this.startTimer()
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


    showToast(message) {   
        if(Platform.OS === 'ios'){
            this.refs.iosToast.show(message);
        }else{
            ToastAndroid.show(message, ToastAndroid.SHORT);
        }
    }

    onContinue = () => {
        const { verificationCode } = this.state;
        // if(verificationCode < 6){
        //     this.setState({error: 'code are sort'})
        //     return
        // }
        
        getAsyncStorage(USER_DATA).then(data => {
            let userData = JSON.parse(data)
            const onSuccess = this.props.navigation.getParam('onSuccess', 'phoneRegistration')
			this.setState({loading: true})
			if(userData){
				const config = {
					headers: {Authorization: 'bearer ' + userData[ACCESS_TOKEN]},
					data: {
						code: verificationCode
					}
				}
	
				POST(ENDPOINTS.EMAIL_CONFIRMATION, config)
				.then(res => {
                    this.setState({loading: false})
                    this.showToast(Languages.EMAIL_VERIFIED)
                    this.props.navigation.navigate(onSuccess)
				})
				.catch(error => {
                    this.setState({loading: false})
                    this.showToast(Languages.ERROR_OCCURED)
                    this.setState({error: Languages.CODE_ARE_NOT_VALID})
                    showNotification(error.response);
					console.log(error)
				})
			}else{
				this.setState({loading: false});
			}
		})
    }

    render() {
        const { loading, verificationCode, error, resend } = this.state;
        const resendData = this.props.navigation.getParam('data', {})
        const barWidth = Dimensions.get('screen').width;
       
        return (
                <InputComponent
                    header= {Languages.ENTER_VERIFICATION_CODE}
                    subHeader = {`${Languages.WE_SEND_CODE} "${resendData.email}"`}
                    onContinue = {this.onContinue}
                    loading={loading}
                    error={error}
                >
                 <Image resizeMode="contain" style={[styles.logo, this.props.style]} source={require('../../../images/logo.png')} />
                 <IosToast positionValue={160} ref="iosToast"/>
                    <InputBox
                        placeholder = {Languages.CODE}
                        value = {verificationCode}
                        onChange={(text)=> this.handleChange(Languages.VERIFICATION_CODE, text)}
                    />
                    <View style={{marginTop: 10}}>
                        <Text style={{fontFamily: fonts.nunitoLight}}>{Languages.TAKE_TO_MINUTES} </Text>
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

export default EmailVerification;

const styles = StyleSheet.create({
    logo: {
        height: 20,
    },
    resendBtn: {
        textAlign: 'right', 
        color: 'blue',
        fontFamily: fonts.nunitoLight,
    },
})