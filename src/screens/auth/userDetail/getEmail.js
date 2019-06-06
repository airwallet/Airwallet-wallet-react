import React, { Component } from 'react';
import { Platform, ToastAndroid, View } from 'react-native';
import InputComponent from './InputComponent';
import { POST } from '../../../utils/api/Request';
import { ENDPOINTS, ACCESS_TOKEN, USER_DATA, USER_ID } from '../../../constants/api';
import { setAsyncStorage } from '../../../utils/asyncStorage';
import IosToast from '../../../components/customToast';
import { InputBox } from '../../../components/inputBox';
import {Languages} from '../../../components/Languages/All_languages';
import {showNotification} from '../../../utils/showNotification'
class GetEmail extends Component {
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
        const preData = this.props.navigation.getParam('data', {})
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
        const data = {...preData, email, password }
        POST(ENDPOINTS.REGISTER, {data})
        .then(res => {
            console.log('onSignup res', res)
            this.setState({loading: false})
            let userData = {}
            userData[ACCESS_TOKEN] = res.data.token
            userData[USER_ID] = ''
            setAsyncStorage(USER_DATA, JSON.stringify(userData))
            //this.showToast(Languages.SIGINUPSUCCESS)
            showNotification(res,Languages.SIGINUPSUCCESS) 
            this.props.navigation.navigate('emailVerifyMessage', {email, onSuccess: 'phoneRegistration'})
        })
        .catch((error) => {
            console.log('error', error)
            this.setState({loading: false})
           // this.showToast('error occurred')
           showNotification(error.response);
  
        })
    }

    render() {
        const { email, password, error, loading } = this.state;
       
        return (
            <InputComponent
                header= {Languages.WHAT_IS_YOUR_EMAIL}
                onContinue = {this.onContinue}
                error= {error}
                loading={loading}
            >
                <InputBox 
                    keyboardType="email-address"
                    placeholder = {Languages.EMAIL_SMALL}
                    value = {email}
                    onChange = {(text) => this.handleChange('email', text)}
                />
                <InputBox 
                    placeholder = {Languages.PASSWORD}
                    value = {password}
                    onChange = {(text) => this.handleChange('password', text)}
                    isPassword={true}
                />
                <IosToast positionValue={200} ref="iosToast"/>
            </InputComponent>
        );
    }
}

export default GetEmail;