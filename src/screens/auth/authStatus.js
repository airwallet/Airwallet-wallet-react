import React, { Component } from 'react';
import { View, Linking, Platform, ToastAndroid ,Text,Alert,BackHandler } from 'react-native';
import { POST } from '../../utils/api/Request';
import { setAsyncStorage, getAsyncStorage, getMultiAsyncStorage } from '../../utils/asyncStorage';
import { ACCESS_TOKEN, ENDPOINTS, LOGIN_STATUS, USER_ID, USER_DATA, BACKUP_PHRASE, PIN, USER_INFO, VERSION_ALERT } from '../../constants/api';
import Loader from '../../components/loader';
import { getAllUrlParams } from '../../utils/getAllUrlParams';
import IosToast from '../../components/customToast';
import { connect } from 'react-redux';
import { setUserInfo } from '../../actions/userInfo';
import {showNotification} from '../../utils/showNotification';
import RNExitApp from 'react-native-exit-app';
import Background from '../../components/background';
const emailLoginKey = 'verify_login_email';
const emailRegistrationKey = 'verify_register_email';
const resetPassword = 'reset_password'; 
const NewVersion ='https://play.google.com/store/apps/details?id=com.facebook.katana';
import { walletsList } from '../../constants/walletsList';

const coinbaseUrl = 'airwallet://oauth/coinbase';

class AuthStatus extends Component {
    constructor(props) {
      super(props)
      //Socket.createSocket();
        this.checkAppVersion();
      this.state = {
        loading: true,
        login: false,
        loadingTxt: 'Loading...',
        showAlert: true,
        forceUpdate : false
    };
  //   global.code="en-US";
  //   Languages.setLanguage(global.code);
  };


     checkAppVersion(){
        //const config = { data :{"version" :getMyAppVersion()} }           
        const config = { data :{"version" :4} }           
        POST(ENDPOINTS.VERSION_ALERT, config)
            .then(res=>{
                console.log('version',res)  
            const { version, force, update } = res.data;
            if(!force) {
                console.log('force update status', force)
                this.setVerificationListener()
            } 
            if(update) {
                this.setState({loading: false}) 
                    Alert.alert(
                        `Update New Version`,
                        'please update Latest version',
                        [
                            (!force) ? {text: 'Later', onPress: () => {}}:{},
                            {text: 'Update', onPress: () =>this.openUrl(force)},
                        ],
                        { cancelable: !force }
                        ) 
                }
        }).catch((error) => {
            console.log('error-',error)
            showNotification(error.response);
        })
    }

    openUrl(force){  
       Linking.openURL(NewVersion).catch(err => console.error('An error occurred', err));
        if(force) 
          RNExitApp.exitApp();
    }                     
             
    componentDidMount(){
        getAsyncStorage(USER_DATA).then(data => {
            let userData = JSON.parse(data)
            console.log('userData', userData)
            const  accessToken = userData && userData[ACCESS_TOKEN]
            // global.socket && global.socket.emit('get_user_info', accessToken)
            // global.socket && global.socket.on('user_info', (data) => this.userSocketListener(data))
        })
    }

    userSocketListener = (data) => {
        console.log('userSocketlistener', data)
        setAsyncStorage(USER_INFO, JSON.stringify(data))
        this.props.setUserInfo(data)
    }

    setVerificationListener(){
        Linking.getInitialURL()
            .then((url) => {
              if (url) {
                this.resetStackToProperRoute(url)
              }else{
                this.loginStatus();
              }
            })
            .catch((e) => { this.setState({loading: false})})
        Linking.addEventListener('url', this.appWokeUp);
    }


    appWokeUp = (event) => {
        this.resetStackToProperRoute(event.url)
    }

    resetStackToProperRoute = (url) => {
        console.log('coinbase resetStackToProperRoute out', url)
        if(url.indexOf(coinbaseUrl) !== -1){
            const coinbaseKey = 'COINBASE_INFO';
            let coinbaseItem = {};
            walletsList.map(w => {
                if(w.key === coinbaseKey) coinbaseItem = w;
            })
            const code = url.split('code=')[1];
            this.setState({loading: false})
            console.log('coinbase resetStackToProperRoute', url, code)
            this.props.navigation.navigate('createCoinbaseConnection', {code, item: coinbaseItem})
            return;
        }


        const queries = getAllUrlParams(url)
        const token = queries.token;
        console.log('resetStackToProperRoute', url)
        console.log('Token ',token)
        this.setState({loadingTxt: 'Verifyng Email'})
        
        if(token){
            const config = {
                headers: {Authorization: 'bearer ' + token},
            }
            POST(ENDPOINTS.USER, config)
                .then(res => {
                    let userData = {}
                    this.setState({loading: false})
                    // this.showToast('Email Verified')
                    const data = res.data.user;
                    console.log('emailverified response', res)
                    // userData[ACCESS_TOKEN] = res.data.user.token
                    // userData[USER_ID] = res.data.user.id
                    // console.log('userDatais', userData)
                    // setAsyncStorage(USER_DATA, JSON.stringify(userData))
                    showNotification(res,'Email Verified');  
                    this.props.setUserInfo(data)
                    this.selectScreen(url, data)
                
                })
                .catch((error) => {
                    console.log('error', error)
                    this.setState({loading: false})
                    //this.showToast('Email not verified')
                    showNotification(error.response);
                    setTimeout(() => this.props.navigation.navigate('Auth'), 2000);
                })
        }else {
            this.setState({loading: false})
        }
      }

    loginStatus = (props) => {
        this.setState({loadingTxt: 'Getting Login Status'})
        getMultiAsyncStorage([USER_DATA, BACKUP_PHRASE, PIN], (err, data) => {
            let userData = data[0][1] ? JSON.parse(data[0][1]) : {};
            let backupPhrase = data[1][1] ? true : false;
            let pin = data[2][1] ? true : false;
            this.setState({userData, backupPhrase, pin})
            console.log('local login data', data)
            let accessToken = userData && userData[ACCESS_TOKEN]
            if(accessToken){
                console.log('loginStatus', true)
                this.registrationStatus(accessToken);
            }else{
                console.log('loginStatus', false)
                this.setState({loading: false, login: false})
                this.props.navigation.navigate('Auth')
            }
            return null;
            })
    }

    registrationStatus = (token) => {
        this.setState({loadingTxt: 'Getting Registration Status'})
        const config = {
            headers: {Authorization: 'bearer '+ token},
        }
        POST(ENDPOINTS.USER, config)
        .then(res => {
            const { user } = res.data;
            console.log('registration status', res)
            this.props.setUserInfo(user)
            this.props.navigation.navigate(this.getScreen(user), {email: user.email})
        })
        .catch((error) => {
            this.setState({loading: false})
            this.props.navigation.navigate('Auth')
            console.log('error_', error)
            showNotification(error.responce);
             
        })
    }

    selectScreen = (url, data) => {
        let redirectTo = 'Auth';
        let userData = {}
        userData[ACCESS_TOKEN] = data.token
        userData[USER_ID] = data.id
        
        if((url.indexOf(emailLoginKey) !== -1)){
                redirectTo = 'recoveryPhrase';
            if(!data.phraseVerified)
                redirectTo = 'backupPharse';
        } else if((url.indexOf(emailRegistrationKey) !== -1)){
           redirectTo = this.getScreen(data)
        } else if((url.indexOf(resetPassword) !== -1)){
            redirectTo = 'resetPasswordInput';
        }
        this.props.navigation.navigate(redirectTo, {userData});
    }

    getScreen = (data) => {
        let redirectTo = 'Auth';
        const { phone, phoneVerified, confirmed, phraseVerified } = data;
        const { backupPhrase, pin } = this.state;
        console.log('auth_data ',this.state)
        if(phoneVerified){
            redirectTo = 'createPin'
            if(pin){
                redirectTo = phraseVerified ? 'openApp' : 'backupPharse' 
            }
        }
        else if(!confirmed) {
            redirectTo = 'emailVerification'
        }
        else{
            redirectTo = 'phoneRegistration'
        }
        return redirectTo;
    }

    showToast(message) {   
        if(Platform.OS === 'ios'){
            this.refs.iosToast.show(message);
        }else{
            ToastAndroid.show(message, ToastAndroid.SHORT);
        }
    }

    componentWillUnmount(){
    //    Linking.removeEventListener('url', this.appWokeUp);
    }
   
    render() {
        const { loading, loadingTxt,showAlert } = this.state;
        if(loading){
            return <Loader loadingTxt={loadingTxt}/>
        }

        return (
          <Background type="light" >  
             <IosToast positionValue={160} ref="iosToast"/>
        </Background>
        );
    }
}
             
           


const mapStateToProps = (state) => ({
	walletStatus: state.wallet.get('homeStatus'),
  });
  
export default connect(mapStateToProps, { setUserInfo })(AuthStatus);