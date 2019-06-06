import React, { Component } from 'react';
import { View, Text, Image, Linking, StyleSheet, Platform, TouchableOpacity, ToastAndroid, Dimensions } from 'react-native';
import InputComponent from './InputComponent';
import { colors, fonts, isIos } from '../../../constants/variables';
import { getAsyncStorage } from '../../../utils/asyncStorage';
import { USER_DATA, ENDPOINTS, ACCESS_TOKEN } from '../../../constants/api';
import { POST } from '../../../utils/api/Request';
import { InputBox } from '../../../components/inputBox';
import IosToast from '../../../components/customToast';
import ProgressBar from '../../../components/loader/progressbar';
import Background from '../../../components/background';
import { openInbox } from 'react-native-email-link';
import Loader from '../../../components/loader';
import {Languages} from '../../../components/Languages/All_languages';
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
    
    showToast(message) {   
        if(Platform.OS === 'ios'){
            this.refs.iosToast.show(message);
        }else{
            ToastAndroid.show(message, ToastAndroid.SHORT);
        }
    }

    openEmailApp = () => {
        openInbox()
    }

    onSkip = () => {
        this.props.navigation.navigate('phoneRegistration')
        // this.setState({loading: true})
        // getAsyncStorage(USER_DATA).then(status => {
        //     let userData = JSON.parse(status)
        //     let token = userData[ACCESS_TOKEN]
        //     const config = {
        //         headers: {Authorization: 'bearer ' + token},
        //     }
        //     if(token){
        //         POST(ENDPOINTS.USER, config)
        //             .then(res => {
        //                 const { user } = res.data;
        //                 this.redirectTo(user)
        //             })
        //             .catch((error) => {
        //                 this.setState({loading: false})
        //                 console.log('error', error)
        //                 this.props.navigation.navigate('phoneRegistration')
        //             })
        //     }else{
        //         this.setState({loading: false, login: false})
        //     }
        // })
    }

    redirectTo = (data) => {
        let redirectTo = 'Tab';
        let { phone, phoneVerified, confirmed } = data;
        if(!(phone || phoneVerified)){
            redirectTo = 'phoneRegistration';
        }
        this.props.navigation.navigate(redirectTo)
    }

    render() {
        const { loading, verificationCode, error, resend } = this.state;
        const email = this.props.navigation.getParam('email', '')
        const isLogin = this.props.navigation.getParam('login', false)
        const barWidth = Dimensions.get('screen').width;
       
        return (
                <Background type="light" >
                    <View style={styles.container}>
                        <View style={styles.content}>
                            <View style={styles.img}>
                                <Image resizeMode="contain" style={[styles.logo, this.props.style]} source={require('../../../images/send.png')} />
                            </View>
                            <View style={styles.header}>
                                <Text style={styles.headerTxt}>{Languages.PLEASE_VERIFY_EMAIL}</Text>
                                <Text style={styles.desciption}>
                                    {Languages.formatString(Languages.SEND_EMAIL_TEXT, email)} {isLogin ? '' : Languages.ELSE_NOT_ACCESS}
                                </Text>
                            </View>
                            
                            <View style={styles.actions}>
                                {loading ? <Loader style={{flex: 0}} loadingTxt = " " /> : null}
                                {!isLogin && !loading ? <TouchableOpacity onPress={this.onSkip} style={styles.skipBtn}>
                                    <Text style={styles.skipTxt}>{Languages.SKIP}</Text>
                                </TouchableOpacity> : null}
                                <TouchableOpacity onPress={this.openEmailApp} style={styles.emailBtn}>
                                    <Text style={styles.emailTxt}>{Languages.OPEN_EMAIL_APP}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Background>
        );
    }
}

export default EmailVerification;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
    },

    content: {
        // justifyContent: 'center',
        // alignItems: 'center',
    },

    logo: {
        height: "100%",
    },

    img: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 2.5,
        marginBottom: 0,
        marginTop: "20%",
    },  

    header: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 2,
        marginBottom: "20%",
    },  

    headerTxt: {
        textAlign: 'center',
        fontSize: 25,
        fontFamily: fonts.exoSemiBold,
        marginBottom: 20,
    },

    desciption: {
        fontSize: 16,
        paddingHorizontal: 30,
        fontFamily: fonts.Ex,
        textAlign: 'center'
    },

    actions: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 100,
        // marginVertical: 0
        flex: 1
    },

    skipBtn: {
        height: '70%',
        borderRadius: 50,
        backgroundColor: colors.buttonGrey,
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        padding: 10,
        marginBottom: 20
    },

    skipTxt: {
        color: "#FFF",
        fontSize: 18,
        fontFamily: fonts.exoSemiBold
    },

    emailBtn: {
        height: '70%',
        borderRadius: 50,
        backgroundColor: colors.mainColor,
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        padding: 10,
        marginBottom: 20
    },

    emailTxt: {
        color: colors.textDark,
        fontSize: 18,
        fontFamily: fonts.exoSemiBold
    }
})