import React, { Component } from 'react';
import { View, Text, StyleSheet, ToastAndroid, Platform, StatusBar, BackHandler, ScrollView, TouchableOpacity, Modal } from 'react-native';
import Background from '../../../components/background';
import Container from '../../../components/Container';
import { dimensions, colors, fonts } from '../../../constants/variables';
import IosToast from '../../../components/customToast';
import FingurPrintScaner from '../../../components/fingerPrintScaner';
import HeaderContainer from '../../../components/headerContainer';
import Address from './address';
import AmountDetail from './amountDetail';
import PopView from '../../../components/popView';
import QrCodeScanner from '../../../components/qrscanner';
import { getAsyncStorage } from '../../../utils/asyncStorage';
import { USER_DATA, ACCESS_TOKEN, USER_ID, ENDPOINTS } from '../../../constants/api';
import { POST } from '../../../utils/api/Request';
import {Languages} from '../../../components/Languages/All_languages'
import { lang } from 'moment';
import { showNotification} from '../../../utils/showNotification'
const isIos = Platform.OS === 'ios';
const headerColor = '#575757';

class SendCrypto extends Component {

    constructor(props) {
        super(props);
        this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
        BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid));
        this.state = {
            verified: true,
            loading: false,
            receiverAddress: '',
            amount: 0,
            sendAddress: false,
            openQrscanner: false,
            error: '',
            fees: 0,
            maximumAmount: 0,
        }
        Languages.setLanguage(global.code);
    }

    onBackButtonPressAndroid = () => {
        const { sendAddress } = this.state;
        if(sendAddress){
            this.setState({sendAddress: false})
            return true;
        }else{
            return false
        }
    };

    showToast(message) {   
        if(isIos){
            this.refs.iosToast.show(message);
        }else{
            ToastAndroid.show(message, ToastAndroid.SHORT);
        }
    }

    handleChange = (text, name) => {
        this.setState({
            [name] : text, error: ''
        })
    }

    getMaximumSendAmount = (balance) => {
        const fees = balance / 100;
        return balance - fees;
    }

    onContinue = () => {
        const { receiverAddress, amount } = this.state;
        const data = this.props.navigation.getParam('data', {})
        const { balance, symbol } = data;
        const maximumAmount = this.getMaximumSendAmount(balance);
        this.setState({fees: amount / 100, maximumAmount })
        if(receiverAddress.length < 5){
            this.setState({error: Languages.ENTER_VALID_ADDRESS})
            return
        }
        else if((maximumAmount < amount) && (amount !== 0)){
            this.setState({error: Languages.YOU_SEND_MINIMUM + maximumAmount +' '+ symbol})
            return
        }
        else if(balance === 0){
            this.setState({error: Languages.HAVE_NOT_BALANCE})
            return
        }
        this.setState({sendAddress: true})
    }

    onSendCurrency = () => {
        const { maximumAmount, receiverAddress, amount } = this.state;
        const data = this.props.navigation.getParam('data', {})
        const currency = data.symbol;
        this.setState({loading: true})
        getAsyncStorage(USER_DATA).then(data => {
            const userData = JSON.parse(data)
            const accessToken = userData[ACCESS_TOKEN]
            const userId = userData[USER_ID]

            const config = {
                headers: {Authorization: 'bearer ' + accessToken},
                data: {
                    currency,
                    user: userId,
                    address: receiverAddress,
                    amount
                }
			}

            POST(ENDPOINTS.SEND, config)
				.then(res => {
                    console.log('send RES', res)
                    this.setState({success: true, loading: false})
                    this.props.navigation.navigate('home')
				})
				.catch(error => {
                    const message = error.response.data ? error.response.data.message : Languages.ERROR_OCCURED_TRY_AGAIN;
					this.setState({loading: false, error: message})
                    console.log('error msg', message)
                    showNotification(error.response);
				})
        })
    }

    onOpenQrscanner = (value) => {
        this.setState({openQrscanner: value})
    }

    onScanSucess = (e) => {
        this.onOpenQrscanner(false)
        this.setState({receiverAddress: e.data})
    }

    componentDidMount() {
        this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
          BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
        );
    }
    
  
    render() {
        const { loading, error, maximumAmount, fees, amount, receiverAddress, success } = this.state;
        const data = this.props.navigation.getParam('data', {})

        console.log('selectedWallet', data)

        return (
            <Background type="dark" style={styles.background}>
                <IosToast positionValue={160} ref="iosToast"/>
                <PopView 
                    visible={!this.state.verified} 
                    onRequestClose={() => this.props.navigation.goBack()}
                    style={styles.popUp}
                >
                    <FingurPrintScaner skippable={false} title={Languages.SCAN_YOUR_FINGERPRINT} onSkip={() => {}}/>
                    <Text onPress={() => this.setState({verified: true})} style={styles.skipBtn}>{Languages.SKIP}</Text>
                </PopView>
                <QrCodeScanner 
                    onScanSucess={this.onScanSucess} 
                    visible={this.state.openQrscanner}
                    onRequestClose={() => this.onOpenQrscanner(false)}
                />
               <Container style={styles.container}>
                    <HeaderContainer 
                        openOption={() => this.showToast("Open options")} 
                        style={styles.header}
                        iconContStyle={{paddingRight: 15}}
                        iconStyle={{color: 'white'}}
                        iconContStyle={{backgroundColor: headerColor}}
                    >
                        <View style={styles.headerTxt}>
                            <Text style={styles.titleTxt}>{Languages.SEND_ADDRESS}</Text>
                        </View>
                    </HeaderContainer>
                   {success ? <View style={styles.successMsg}>
                        <Text style={{color: 'white'}}>{Languages.SEND_SCCESSFULLY}</Text>
                    </View> : null}
                    <View style={styles.totalCurrancy} >
                        <View style={[styles.totcyptoCur]}>
                            <Text style={styles.totalTXT}>{`${Math.round(data.balance * 100000) / 100000} ${data.symbol}`}</Text>
                        </View>
                        <View style={styles.totalUsd}>
                            <Text style={styles.totalTXT}>{Languages.TOTAL}</Text>
                            <Text style={styles.totalTXT}>{data.price_usd * data.balance} USD</Text>
                        </View>
                    </View>
                    <ScrollView style={styles.scrollView}>
                        {this.state.sendAddress ? 
                            <AmountDetail
                                maximumAmount = {maximumAmount}
                                fees = {fees}
                                receiverAddress = {receiverAddress}
                                amount = {amount}
                                onSend = {this.onSendCurrency}
                                loading = {loading}
                                error={error}
                            /> 
                            : 
                            <Address
                                onChangeHandle = {this.handleChange} 
                                onSend = {this.onContinue}
                                onOpenQrscanner = {() => this.onOpenQrscanner(true)}
                                receiverAddress = {this.state.receiverAddress}
                                error={error}
                            />
                        }
                    </ScrollView>
                </Container> 
            </Background>
        );
    }
}

export default SendCrypto;

const styles = StyleSheet.create({

    container: {
        marginTop: 15,
        padding:0,
        marginBottom: (dimensions.bottomTabHeight - 10),
        flex: 1,
    },

    content: {
        flex: 1,
        height: 400,
        alignItems: 'center',
        justifyContent: 'center',
    },

    header: {
        paddingVertical: 10,
        margin: 0,
        borderRadius: 0,
        backgroundColor: headerColor,
        marginHorizontal: 0
    },

    titleTxt: {
        fontSize: 20, 
        fontFamily: fonts.nunitoRegular,
        color: 'white',
    },  
    
	totalCurrancy: {
		height: 100,
		alignItems: 'center',
		flexDirection: 'column',
		// backgroundColor: '#1453B6',
		justifyContent: 'space-between',
        padding: 15, 
        margin: 10,
        borderColor: colors.gold,
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 15
    },
    
    totcyptoCur:{
		alignItems: 'flex-end',
		width:'100%'
    },
    
	totalTXT:{
		fontSize: 22,
        color: colors.orange,
        fontFamily: fonts.nunitoLight
    },
    
    totalUsd: {
        flexDirection:'row', 
        width:'100%', 
        justifyContent:'space-between',
    },

    headerTxt: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 40,
    },

    skipBtn: {
        color: 'red', 
        paddingHorizontal: 15,
        paddingBottom: 3, 
        // paddingVertical: 2,
        position: 'absolute',
        top: isIos ? 30 : 5,
        right: 0,
        fontSize: 20,
        borderRadius: 5,
        // fontWeight: 'bold',
        // backgroundColor: 'rgba(233, 236, 240, 0.3)',
        fontFamily: fonts.nunitoLight
    },

    popUp: {
        flex: 1,
        width: '100%',
    },

    successMsg: {
        backgroundColor: 'green',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }

})
