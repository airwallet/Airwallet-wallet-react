import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Dimensions } from 'react-native';
import Logo from '../../components/logo';
import Background from '../../components/background';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/login';
import { fonts, colors } from '../../constants/variables';
import { POST } from '../../utils/api/Request';
import { setAsyncStorage, getAsyncStorage, removeMultiAsyncStorage } from '../../utils/asyncStorage';
import { ACCESS_TOKEN, ENDPOINTS, LOGIN_STATUS, USER_ID, USER_DATA, BACKUP_PHRASE, PIN, ALL_WALLETS } from '../../constants/api';
import TouchID from 'react-native-touch-id';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import Loader from '../../components/loader';
import {Languages} from '../../components/Languages/All_languages'
// import { logout } from '../../utils/logout';
 
let data = {
    "email": "montypaliwal.biz@gmail.com",
    "password": "1234"
}

class CreateAirWallet extends Component {
    constructor(props) {
        super(props)
        this.getDeviceSensorStatus();
        this.state = {
        loading: true,
        detectingTouchId: true,
        login: false,
        touchId: false,
        faceId: false
      }; 
     
       global.code="en-US";
      Languages.setLanguage(global.code);
    };

    getDeviceSensorStatus = () => {
        FingerprintScanner
        .isSensorAvailable()
        .then(biometryType => {
            if (biometryType === 'FaceID') {
                this.setState({detectingTouchId: false, faceId: true})
            } else {
                this.setState({detectingTouchId: false, touchId: true})
            }
            })
            .catch(error => {
                this.setState({detectingTouchId: false})
            });
    }

    componentDidMount(){
        // const Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzA3ODZhYTk1M2M3NDEwZDEzNmQ2OTEiLCJmaXJzdE5hbWUiOiJQYWwiLCJsYXN0TmFtZSI6IlBhbCIsImVtYWlsIjoiamF5YW50cGFsaXdhbEBtYWlsaW5hdG9yLmNvbSIsImFkZHJlc3MiOiIweDI0NWU1MjJkNmRlNmQwYmQyNzk2NDA3NTA5ZTMyZjFmY2I0NzViOTMiLCJjb25maXJtZWQiOmZhbHNlLCJleHAiOjIxNzQ3MjE4MDgsImlhdCI6MTU0NDAwMTgwOH0.eQOY4AuI9Ytn3r0w_6KFNeaWeJ-OjiX7BokPSFJtHi4"
        // // global.socket.on('get_user_info', function (data) {
        // //     alert('call')
        // //     console.log(data);
        // //   });
          
        //   global.socket.emit('get_user_info', Token)

        //     global.socket.on('user_info', function (data) {
        //         // alert('call user_info test')
        //         global.socket.emit('get_user_info', Token)
        //         console.log('user_info', data);
        //     });
        }

    onButtonPress = (to) => {
        // logout(() => this.props.navigation.navigate(to))
        
        removeMultiAsyncStorage([USER_DATA, BACKUP_PHRASE, PIN, ALL_WALLETS], () => this.props.navigation.navigate(to));
    }

    render() {
        const { detectingTouchId, loading, login, touchId } = this.state;
       
        return (
            <Background type="light">
                <View style={{flexDirection: 'column', flex: 1}}>
                    <View style={styles.logoCont}>
                        <Logo styleTxt={styles.logoTxt} style={styles.logoStyle}/>
                    </View>
                  
                    <View style={styles.createButtons}>
                        <TouchableOpacity onPress={() => this.onButtonPress('getName')} activeOpacity={0.5} style={styles.createWallet}>
                            <Text style={styles.createTxt}>{Languages.REGISTER}</Text>
                        </TouchableOpacity>
                      
                        <TouchableOpacity 
                            onPress={() => this.onButtonPress('login')} 
                            activeOpacity={0.5} style={styles.importWallet}
                        >
                            <Text style={[styles.createTxt, styles.importTxt]}>{Languages.IMPORT_WALLET}</Text>
                        </TouchableOpacity>
                    </View>
                 {/* <AwesomeAlert
                    show={true}
                    showProgress={false}
                    title="AwesomeAlert"
                    message="I have a message for you!"
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    showConfirmButton={true}
                    cancelText="No, cancel"
                    confirmText="Yes, delete it"
                    confirmButtonColor="#DD6B55"
                    onCancelPressed={() => {
                        this.hideAlert();
                    }}
                    onConfirmPressed={() => {
                        this.hideAlert();
                    }}
                  /> */}
                </View>
            </Background>
        );
    }
}

const styles = StyleSheet.create({
    logoCont: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },

    createButtons: {
        flex: 2,
        paddingTop: 30,
        paddingHorizontal: 30,
    },

    logoStyle: {
        marginTop: 250,
        height: 200,
    },

    logoTxt: {
        marginTop: 30,
        marginBottom: 200,
        // color: 'white',
        fontSize: 35,
    },

    createWallet: {
        marginTop: 30,
        backgroundColor: colors.tabBarColor,
        borderRadius: 50,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',

        shadowColor: 'white',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 1,
        elevation: 5,
        marginBottom: 10,
    },

    importWallet: {
        borderWidth: 1,
        backgroundColor: colors.mainColor,
        borderColor: colors.mainColor,
        padding: 16,
        width: '100%',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',  
    },

    createTxt: {
        color:'white', 
        fontSize: 17, 
        fontFamily: fonts.exoSemiBold
    },

    importTxt: {
        color: 'black',
        fontFamily: fonts.exoSemiBold
    },

    loader: {
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: 'white',
        height: '100%'
    }

})



const mapStateToProps = (state) => ({
    authenticationIsInProgress: state.login.get('authenticationIsInProgress'),
  });
  
  export default connect(mapStateToProps, {loginUser})(CreateAirWallet);