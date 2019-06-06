import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, ToastAndroid, Platform, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation'
import Background from '../../components/background'
import Container from '../../components/Container'
import Svg,{ Path} from 'react-native-svg';
import { dimensions, colors } from '../../constants/variables'
import HeaderContainer from '../../components/headerContainer';
import RoundButton from '../../components/roundButton'
import FontAwesomeIcon from 'react-native-vector-icons/dist/FontAwesome';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import IosToast from '../../components/customToast';
import Home from './home';
import FacebookLogin from '../../components/FbLogin/index';
import TwitterLogin from '../../components/twitterLogin/index.android';
import LinkedinButton from '../../components/linkedin/index';
import InstagramLogin from '../../components/instagramLogin';
import { connect } from 'react-redux';
import { AndroidBackHandler } from '../../components/backHandler/index';
import {Languages} from '../../components/Languages/All_languages'

class MyAccount extends Component {
    constructor(props) {
        super(props)
        Languages.setLanguage(global.code);
    }
    showToast(message, duration) {   
        if(Platform.OS === 'ios'){
            this.refs.iosToast.show(message, duration);
        }else{
            ToastAndroid.show(message, ToastAndroid.SHORT);
        }
    }

    onBackPress = () => {
        return true;
    }
  
    render() {
        console.log('userinfo', this.props.userInfo)
        const { userInfo } = this.props;
        return (
            <Background type="dark" style={styles.background}>
                <AndroidBackHandler onBackPress={this.onBackPress} />
                <Container style={styles.container}>
                    <IosToast positionValue={180} ref="iosToast"/>
                    <HeaderContainer openOption={() => this.showToast("Open options")} style={{paddingVertical: 10}}>
                        <View style={styles.headerTxt}>
                            <Text style={{fontSize: 17}}>{Languages.MY_ACCOUNT}</Text>
                        </View>
                    </HeaderContainer>
                   
                    <ScrollView style={styles.scrollView}>
                        <View style={styles.detailTable}>
                            <View style={styles.detailRow}>
                                <Text style={styles.column1}>{Languages. FIRST_NAME_PLACEHOLDER}</Text>
                                <Text style={styles.column2}>{userInfo.firstName}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Text style={styles.column1}>{Languages.LAST_NAME_PLACEHOLDER}</Text>
                                <Text style={styles.column2}>{userInfo.lastName}</Text>
                            </View>
                            <View style={[styles.detailRow]}>
                                <Text style={styles.column1}>{Languages.PONE}</Text>
                                <View style={styles.iconColumn}>
                                    <Text style={[styles.column2, {width: '80%'}]}>{userInfo.phone}</Text>
                                    <View>
                                        {userInfo.phoneVerified ? <Svg viewBox="0 0 37 31" height="28" width="30">
                                            <Path strokeWidth="0" fill="#a1c300" d="M16.500,-0.000 C7.664,-0.000 0.500,7.164 0.500,16.000 C0.500,24.836 7.664,32.000 16.500,32.000 C25.336,32.000 32.500,24.836 32.500,16.000 C32.500,7.164 25.336,-0.000 16.500,-0.000 ZM14.020,23.383 L6.658,16.020 L9.486,13.192 L14.019,17.727 L23.637,8.110 L26.464,10.938 L14.020,23.383 Z" />
                                        </Svg> : null}
                                    </View>
                                </View>
                            </View>
                            <View style={[styles.detailRow, {borderBottomWidth: 0}]}>
                                <Text style={styles.column1}>Email</Text>
                                <View style={styles.iconColumn}>
                                    <Text style={[styles.column2, {width: '80%'}]}>{userInfo.email}</Text>
                                    <View>
                                        <Svg viewBox="0 0 37 31" height="28" width="30">
                                            <Path strokeWidth="0" fill="#a1c300" d="M16.500,-0.000 C7.664,-0.000 0.500,7.164 0.500,16.000 C0.500,24.836 7.664,32.000 16.500,32.000 C25.336,32.000 32.500,24.836 32.500,16.000 C32.500,7.164 25.336,-0.000 16.500,-0.000 ZM14.020,23.383 L6.658,16.020 L9.486,13.192 L14.019,17.727 L23.637,8.110 L26.464,10.938 L14.020,23.383 Z" />
                                        </Svg>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.socialBtn}>
                            <View>
                                <TwitterLogin
                                    onLogout={() => this.showToast(Languages.LOGOUT_SUCCESS)}
                                    onLogin={(name) => this.showToast(Languages.LOGIN_SUCCESS_WITH+" "+name, 1500)}
                                />
                            </View>
                            <View>
                                <FacebookLogin 
                                    onLogout={() => this.showToast(Languages.LOGOUT_SUCCESS)}
                                    onLogin={(name) => this.showToast(Languages.LOGIN_SUCCESS_WITH+" "+name, 1500)}
                                />
                            </View>
                            <View>
                                <InstagramLogin
                                    onLogout={() => this.showToast(Languages.LOGOUT_SUCCESS)}
                                    onLogin={(name) => this.showToast(Languages.LOGIN_SUCCESS_WITH+" "+name, 1500)}
                                />
                            </View>
                            <View>
                                <LinkedinButton/>
                            </View>
                            <RoundButton 
                                onPress={() => this.showToast("Link telegram account")}
                                style={{backgroundColor: '#41abdb'}}
                                title={Languages.LINK_YOUR_TELEGRAM}
                                icon={<MaterialCommunityIconsIcon style={styles.icon} name="telegram" size={17} color="white" />}
                            />
                        </View>
                    </ScrollView>
                  
                </Container>

            </Background>
        );
    }
}
                  
const mapStateToProps = (state) => ({
	userInfo: state.userInfo.get('userInfo')
  });
                                

export default connect(mapStateToProps, { })(MyAccount);

const styles = StyleSheet.create({

    container: {
        marginTop: 15,
        padding:0,
        marginBottom: (dimensions.bottomTabHeight - 10),
        flex: 1,
    },

    headerTxt: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 40,
    },

    userDetail: {
        backgroundColor: '#1453B6',
        paddingVertical: 20,
        width: '100%',
        paddingLeft: 10,
        paddingRight: 15,
        flexDirection: 'row',
    },

    user: {
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    dropInfo: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    userName: {
        fontSize: 18,
        color: 'white',
    },

    userPos: {
        color: 'white',
    },


    dropValue: {
        fontSize: 18,
        color: 'white',
        width: '100%',
        textAlign: 'right'
    },

    dropLock: {
        color: 'white',
        width: '100%',
        textAlign: 'right'
    }, 

    dropDays: {
        color: '#71a70b',
        width: '100%',
        textAlign: 'right'
    },

    detailTable: {
        borderRadius: 5,
        borderColor: colors.borderGrey,
        borderWidth: 1,
        margin: 15,
        marginBottom: 30,
    },

    detailRow: {
        borderBottomColor: colors.borderGrey,
        borderBottomWidth: 1,
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    column1: {
        color: '#a3a3a3',
        width: '30%',
        textAlign: 'right',
        paddingRight: 10,
    }, 

    column2: {
        width: '70%',
        paddingLeft: 10,
        color: '#4d4d4d',
        alignItems: 'center',
    },

    iconColumn: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        width: '70%'
    },
   
    socialBtn: {
        paddingHorizontal: 15,
        marginBottom: 30,
    }
})
