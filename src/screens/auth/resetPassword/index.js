import React, { Component } from 'react';
import { Platform, ToastAndroid, View, TouchableOpacity, Text } from 'react-native';
import InputComponent from '../userDetail/InputComponent';
import { POST } from '../../../utils/api/Request';
import { ENDPOINTS, ACCESS_TOKEN, USER_DATA, USER_ID } from '../../../constants/api';
import { setAsyncStorage } from '../../../utils/asyncStorage';
import IosToast from '../../../components/customToast';
import { InputBox } from '../../../components/inputBox';
import { Codes } from '../../../components/staticContent/conutryCode';
import {Languages} from '../../../components//Languages/All_languages'
import {showNotification} from '../../../utils/showNotification'
const emailRegex = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;


class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state={
            email: '',
            code: '',
            error: '',
            loading: false
        }
        Languages.setLanguage(global.code) 
          
    }
    
    handleChange = (name, value) => {
       
          this.setState({[name]: value, error: Languages.EMAIL_NOT_VALID})
    }

    showToast(message) {   
        if(Platform.OS === 'ios'){
            this.refs.iosToast.show(message);
        }else{
            ToastAndroid.show(message, ToastAndroid.SHORT);
        }
    }

    onContinue = () => {
        this.setState({loading: true})
        let { email } = this.state;
        email = email.toLowerCase()
        const data = { email }
        if(!emailRegex.test(email.toLowerCase())){
            this.setState({error: Languages.EMAIL_NOT_VALID})
            return 
        }
        POST(ENDPOINTS.RESET_PASSWORD_REQUEST, {data})
        .then(res => {
            this.setState({loading: false})
            this.props.navigation.navigate(Languages.EMAILVREIFYMESSGAE, {login: true, email, onSuccess: 'login'})
        })
        .catch((error) => {
            this.setState({loading: false})
            showNotification(error.response);
        })
    }


    emailInput = () => {
       return <InputBox 
            keyboardType="email-address"
            placeholder = {Languages.EMAIL_SMALL}
            value = {this.state.email}
            onChange = {(text) => this.handleChange('email', text)}
        />
    }

    render() {
        const { error, loading } = this.state;
       
        return (
            <InputComponent
                header={Languages.ENTER_EMAIL}
                onContinue = {this.onContinue}
                error= {error}
                loading={loading}
            >
                {this.emailInput()}
                <IosToast positionValue={200} ref="iosToast"/>
            </InputComponent>
        );
    }
}

export default ResetPassword;