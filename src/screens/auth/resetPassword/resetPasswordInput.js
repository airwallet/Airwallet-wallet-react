import React, { Component } from 'react';
import { Platform, ToastAndroid, View, TouchableOpacity, Text } from 'react-native';
import InputComponent from '../userDetail/InputComponent';
import { POST } from '../../../utils/api/Request';
import { ENDPOINTS, ACCESS_TOKEN, USER_DATA, USER_ID } from '../../../constants/api';
import { setAsyncStorage, getAsyncStorage, removeAsyncStorage } from '../../../utils/asyncStorage';
import IosToast from '../../../components/customToast';
import { InputBox } from '../../../components/inputBox';
import { Codes } from '../../../components/staticContent/conutryCode';
import Loader from '../../../components/loader';
import {Languages} from '../../../components/Languages/All_languages'
const emailRegex = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;


class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state={
            // email: 'jph@mailinator.com',
            password: '',
            confirmPassword: '',
            error: '',
            loading: false,
            passwordMatch: false,
            // accessToken: '',
        }
        Languages.setLanguage(global.code) 
    }
    
    handleChange = (name, value) => {
        this.setState({[name]: value, error: ''})
    }

    // componentWillMount(){
    //     getAsyncStorage(USER_DATA).then(status => {
    //         let userData = JSON.parse(status)
    //         let accessToken = userData && userData[ACCESS_TOKEN];
    //         this.setState({tokenLoading: false, accessToken})
    //         removeAsyncStorage(USER_DATA, () => {})
    //     })
    // }

    showToast(message) {   
        if(Platform.OS === 'ios'){
            this.refs.iosToast.show(message);
        }else{
            ToastAndroid.show(message, ToastAndroid.SHORT);
        }
    }

    validatePassword = () => {
        const { password, confirmPassword } = this.state;
        console.log('validtepassword', password, confirmPassword, password.length)
        let validate = false;
        if(password.length < 5){
            this.setState({error: Languages. PASSWORD_ARE_SORT})
        }else{
            if(!confirmPassword){
                this.setState({error: Languages.PLEASE_CONFORM_PASSWORD})
            }else{
                if(password !== confirmPassword){
                    this.setState({error: Languages.PASSWORD_NOT_SAME })
                }else{
                    validate = true
                }
            }
        }
        return validate;
    }

    onContinue = () => {
        const { password } = this.state;
        this.setState({loading: true})
        const matchPass = this.validatePassword();
        if(!matchPass){
            this.setState({loading: false})
            return
        }

        const userData = this.props.navigation.getParam('userData', {})
        const accessToken = userData[ACCESS_TOKEN]

        const data = { password}
        if(accessToken){
            const config = {
                headers: {Authorization: 'bearer ' + accessToken},
                data
            }
            POST(ENDPOINTS.RESET_PASSWORD, config)
                .then(res => {
                    this.setState({loading: false })
                    this.showToast(Languages.RESET_PASSWORD_SUCCESS)
                    this.props.navigation.navigate('login')
                })
                .catch((error) => {
                    this.setState({loading: false})
                    console.log(error)
                    this.showToast(Languages.ERROR_OCCURED)
                })
        }else{
            this.setState({loading: false})
            this.showToast(Languages.ERROR_OCCURED)
        }
    }

    componentWillUnmount(){
        removeAsyncStorage(USER_DATA, () => {
            this.props.navigation.navigate('login')
        })
    }

    render() {
        const { email, password, error, loading, confirmPassword } = this.state;
       
       
        return (
            <InputComponent
                header = {Languages.RESET_PASSWORD}
                onContinue = {this.onContinue}
                error= {error}
                loading={loading}
                disableContinue = {!this.state.password.length}
            >
                <InputBox 
                    placeholder = {Languages.PASSWORD}
                    value = {password}
                    onChange = {(text) => this.handleChange('password', text)}
                    isPassword={true}
                />
                <InputBox 
                    placeholder = {Languages.CONFORM_PASSWORD}
                    value = {confirmPassword}
                    onChange = {(text) => this.handleChange('confirmPassword', text)}
                    isPassword={true}
                />
                <IosToast positionValue={200} ref="iosToast"/>
            </InputComponent>
        );
    }
}

export default ResetPassword;