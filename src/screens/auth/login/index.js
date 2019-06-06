import React, { Component } from 'react';
import { Platform, ToastAndroid, View, TouchableOpacity, Text } from 'react-native';
import InputComponent from '../userDetail/InputComponent';
import { POST } from '../../../utils/api/Request';
import { ENDPOINTS, ACCESS_TOKEN, USER_DATA, USER_ID } from '../../../constants/api';
import { setAsyncStorage } from '../../../utils/asyncStorage';
import IosToast from '../../../components/customToast';
import { InputBox } from '../../../components/inputBox';
import {Languages} from '../../../components/Languages/All_languages'
//import VerifyEmailNotification from '../../../components/verifyEmailNotification'
import {showNotification} from '../../../utils/showNotification'
class Login extends Component {
    constructor(props) {
        super(props);
        this.state={
            email: '',
            password: '',
            error: '',
            loading: false,
        }
        Languages.setLanguage(global.code) 
    }
    
    handleChange = (name, value) => {
        this.setState({[name]: value, error: ''})
    }

    showToast(message) {   
        if(Platform.OS === 'ios'){
            this.refs.iosToast.show(message);
        }else{
            ToastAndroid.show(message, ToastAndroid.SHORT);
        }
    }

    onContinue = () => {
        let { email, password } = this.state;
        email = email.toLowerCase()
        const emailRegex = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
        if(!emailRegex.test(email)){
            this.setState({error: Languages.EMAIL_NOT_VALID})
            return 
        }else if(!password){
            this.setState({error: Languages.PLEASE_ENTER_PASSWORD})
            return 
        }
        this.setState({loading: true})
        const data = { email, password }
        POST(ENDPOINTS.LOGIN, {data})
        .then(res => {
            console.log('loginstatus', res)
            this.setState({loading: false})
            showNotification(res,'Login success');
            let userData = {}
            userData[ACCESS_TOKEN] = res.data.token
            setAsyncStorage(USER_DATA, JSON.stringify(userData))
            this.showToast('Login success')
            if(!res.data.confirmed) { this.props.navigation.navigate('emailVerifyMessage', {login: true, email, onSuccess: 'recoveryPhrase'}) 
            }
            else if(!res.data.phoneVerified){ this.props.navigation.navigate('phoneRegistration', {login: true, onSuccess: 'recoveryPhrase'}) 
            }
            else { this.props.navigation.navigate('phoneRegistration', {login: true, onSuccess: 'recoveryPhrase'}) }     
        })
        .catch((error) => {
            console.log('error-', error.response)
            this.setState({loading: false})
            // this.setState({error: Languages.EMAIL_OR_PASSWORD_WORNG})
            showNotification(error.response);
        })
    }

    render() {
        const { email, password, error, loading } = this.state;
       
        return (
            <InputComponent
                header= {Languages.WHAT_IS_LOGIN_DETAIL}       
                onContinue = {this.onContinue}
                error= {error}
                loading={loading}
            >
                <InputBox 
                    keyboardType="email-address"
                    placeholder = {Languages.EMAIL_SMALL}
                    onChange = {(text) => this.handleChange('email', text)}
                    value = {email}  />   
        
                <InputBox
                    placeholder = {Languages.PASSWORD}
                    value = {password}
                    onChange = {(text) => this.handleChange('password', text)}
                    isPassword={true}
                />
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('resetPassword')}
                    style={{width: '100%', alignItems: 'flex-end'}}
                >
                    <Text style={{color: 'blue', fontSize: 16}}>
                        {Languages.FORGET_PASSWORD}
                    </Text>
                </TouchableOpacity>    
                
                <IosToast positionValue={200} ref="iosToast"/>
            </InputComponent>
        );
    }  
}

export default Login;