import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Switch, Platform, StatusBar, Alert } from 'react-native';
import { dimensions, colors, fonts } from '../../../constants/variables'
import Collapsible from '../../../components/collapsibleList';
import SignIn from '../signin'
import { Languages } from '../../../components/Languages/All_languages'
import Svg, { Path } from 'react-native-svg';
import { InputBox } from '../../../components/inputBox';
import QrScodeInput from '../../../components/qrCodeInput';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { TextBox } from '../../../components/TextBox';
import { getStatusBarHeight } from '../../../utils/isIphoneX';
import CryptoJS from "crypto-js";
import { POST } from '../../../utils/api/Request';
import { BINANCE_ENDPOINTS, EXCHANGES, ACCESS_TOKEN, USER_DATA } from '../../../constants/api';
import Binance from 'binance-api-react-native';
import BottomButton from '../../../components/bottomButton';
import FontAwesomeIcon from 'react-native-vector-icons/dist/FontAwesome';
import { setAsyncStorage, getAsyncStorage } from '../../../utils/asyncStorage';
import { StackActions, NavigationActions } from 'react-navigation';

const headerBg = colors.headerGrey;




export default class CreateOkexConnection extends Component {
    constructor(props) {
        super(props);
        const { item } = props.navigation.state.params;
        this.state = {
            portfolio: "Main Portfolio",
            name: item.name + ' Connect',
            apiKey: 'f0458f72-3405-440c-a18a-4e9a4c19566a',
            apiSecret: '71AEBE50CFA87B6D8318E028C55C40FB',
            passpharase: "airwallet",
            data: 'symbol=LTCBTC&side=BUY&type=LIMIT&timeInForce=GTC&quantity=1&price=0.1&recvWindow=5000&timestamp=1499827319559',
            additionalOptions: {
                import_withdrawals: true,
                import_past_transactions: true,
                remove_existing_transactions: false,
            },
            loading: false,
            userData: {},
        }
    }

    handleChange = (name, text) => {
        this.setState({ [name]: text })
    }

    onToggleSwitch = (name, value) => {
        const { additionalOptions } = this.state;
        additionalOptions[name] = value;
        this.setState({ additionalOptions });
    }

    componentWillMount() {
        getAsyncStorage(USER_DATA).then(data => {
            let userData = JSON.parse(data)
            this.setState({userData})
        })
    }

    addConnection = async () => {
        this.setState({ loading: true })
        const { apiKey, apiSecret, passpharase } = this.state;
        const config = {
            apiKey,
            apiSecret,
            passpharase
        }
        this.loginOkex(config);
    }

    loginOkex = (data) => {
        const config = {
            headers: {Authorization: 'bearer ' + this.state.userData[ACCESS_TOKEN]},
            data,
        }
        POST(EXCHANGES.LOGIN_OKEX, config)
            .then((res) => {
                console.log('okex login res', res);
                setAsyncStorage(EXCHANGES.OKEX_INFO, JSON.stringify(data))
                this.props.navigation.navigate('wallets', {name: 'okex'});
            })
            .catch((error) => {
                console.log(error)
                this.setState({loading: false})
                this.showAlert('Incorrect data', 'The data you specified is incorrect. Please review what you entered and try again.')
            })
    }

    showAlert = (title, msg) => {
        Alert.alert(
            title,
            msg,
            [
                { text: 'OK', onPress: () => { } },
            ],
            { cancelable: false }
        )
    }

    render() {
        const { portfolio, name, apiKey, apiSecret, additionalOptions, loading, passpharase } = this.state;

        const { item } = this.props.navigation.state.params;

        const { import_withdrawals, import_past_transactions, remove_existing_transactions } = additionalOptions;

        return (
            <SafeAreaView style={styles.container}>
                <StatusBar
                    backgroundColor="transparent"
                    barStyle="dark-content"
                />
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.backButton}>
                        <Svg viewBox="0 0 37 51" height="30" width="50">
                            <Path strokeWidth="0" fill="rgb(255, 255, 255)" d="M8.357,21.622 L24.196,5.756 C24.633,5.320 24.872,4.737 24.872,4.116 C24.872,3.494 24.633,2.912 24.196,2.475 L22.808,1.085 C22.373,0.648 21.791,0.408 21.171,0.408 C20.550,0.408 19.969,0.648 19.533,1.085 L0.674,19.976 C0.237,20.414 -0.003,20.999 -0.001,21.621 C-0.003,22.246 0.236,22.830 0.674,23.268 L19.516,42.140 C19.951,42.577 20.533,42.818 21.153,42.818 C21.774,42.818 22.355,42.577 22.791,42.140 L24.179,40.751 C25.082,39.846 25.082,38.374 24.179,37.470 L8.357,21.622 Z" />
                        </Svg>
                    </TouchableOpacity>
                    <View style={styles.headerRight}>
                        {/* <Image style={styles.headerImg} source={image}/> */}
                        <TextBox style={styles.headerTxt}>{item.name} Exchange Connection</TextBox>
                    </View>
                </View>
                <ScrollView contentContainerStyle={styles.contentContainerStyle}>
                    <View style={styles.content}>
                        <View style={styles.inputs}>
                            <TextBox style={styles.label}>{Languages.NAME}:</TextBox>
                            <InputBox
                                keyboardType="email-address"
                                placeholder={Languages.NAME}
                                onChange={(text) => this.handleChange('name', text)}
                                value={name} />
                            <TextBox style={[styles.label, { marginTop: 10 }]}>{Languages.PORTFOLIO_IMPORT}:</TextBox>
                            <InputBox
                                placeholder={Languages.PORTFOLIO_IMPORT}
                                value={portfolio}
                                onChange={(text) => this.handleChange('portfolio', text)}
                            />
                        </View>
                        <View style={styles.instructions}>
                            <TextBox style={styles.instructionTxt}>
                                Important! Make sure to only select the 'view' permission - we don't accept API keys that exceed this  permission. Instructions</TextBox>
                        </View>
                        <View style={styles.keys}>
                            <QrScodeInput
                                value={apiKey}
                                onChangeText={(text) => this.handleChange('apiKey', text)}
                                placeholder={Languages.API_KEY}
                                qrIcon={<FeatherIcon name="camera" size={25} color="grey" />}
                            />
                            <QrScodeInput
                                value={apiSecret}
                                onChangeText={(text) => this.handleChange('apiSecret', text)}
                                placeholder={Languages.API_SECRET}
                                qrIcon={<FeatherIcon name="camera" size={25} color="grey" />}
                            />
                            <InputBox
                                placeholder={Languages.PASSPHARASE}
                                value={passpharase}
                                onChange={(text) => this.handleChange('passpharase', text)}
                            />
                        </View>
                        <View style={styles.additionalOptions}>
                            <TextBox style={styles.optionsHead}>{Languages.ADDITIONAL_OPTIONS}</TextBox>
                            <View style={styles.options}>
                                <View style={styles.option}>
                                    <TextBox style={styles.optionTxt}>{Languages.IMPORT_WITHDRAWALS}</TextBox>
                                    <Switch
                                        onValueChange={(value) => this.onToggleSwitch('import_withdrawals', value)}
                                        value={import_withdrawals}
                                        style={styles.switch}
                                    />
                                </View>
                                <View style={styles.option}>
                                    <TextBox style={styles.optionTxt}>{Languages.IMPORT_PAST_TRANSACTIONS}</TextBox>
                                    <Switch
                                        onValueChange={(value) => this.onToggleSwitch('import_past_transactions', value)}
                                        value={import_past_transactions}
                                        style={styles.switch}
                                    />
                                </View>
                                <View style={styles.option}>
                                    <TextBox style={styles.optionTxt}>{Languages.REMOVE_EXISTING_TRANSACTIONS}</TextBox>
                                    <Switch
                                        onValueChange={(value) => this.onToggleSwitch('remove_existing_transactions', value)}
                                        value={remove_existing_transactions}
                                        style={styles.switch}
                                    />
                                </View>
                                <View style={styles.warningMsg}>
                                    <TextBox style={styles.instructionTxt}>If you import past transations, we'll not only import transactions that happen from now on, but also import your transaction history.</TextBox>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <BottomButton loading={loading} disabled={loading} >
                    <TouchableOpacity onPress={this.addConnection} activeOpacity={0.6} style={styles.bottomButton}>
                        <TextBox style={styles.addConnectionTxt}>{Languages.ADD_CONNECTION}</TextBox>
                    </TouchableOpacity>
                </BottomButton>
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({

    container: {
        // marginTop: 15,
        padding: 0,
        flex: 1,
        backgroundColor: 'white',
        ...Platform.select({
            android: {
                marginTop: getStatusBarHeight(),
            }
        })
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: headerBg,
        paddingVertical: 15,
        paddingHorizontal: 5,
        borderRadius: 5,
        marginBottom: 10,
        marginHorizontal: 6,
        marginTop: 6,
    },

    contentContainerStyle: {
        paddingBottom: (dimensions.bottomButtonHeight),
    },

    backButton: {
        // marginRight: 10,
    },


    headerTxt: {
        color: 'white',
        fontSize: 20,
        fontFamily: fonts.nunitoBold,
        // fontWeight: 'bold'
    },


    content: {
        flex: 1,
    },

    inputs: {
        padding: 10,
        paddingBottom: 0,
    },

    instructions: {
        padding: 20,
        backgroundColor: colors.borderGrey
    },

    instructionTxt: {
        textAlign: 'center',
        color: 'grey'
    },

    label: {
        padding: 5,
        fontSize: 14,
        color: 'grey'
    },

    keys: {
        padding: 10,
    },

    additionalOptions: {
        // padding: 10,
    },

    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        alignItems: 'center',
        padding: 10
    },

    optionsHead: {
        color: 'grey',
        backgroundColor: colors.borderGrey,
        padding: 10,
        paddingVertical: 20
    },

    optionTxt: {
        fontSize: 18,
    },

    switch: {
        transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }]
    },

    warningMsg: {
        backgroundColor: colors.borderGrey,
        padding: 20
    },

    addConnectionTxt: {
        color: 'white',
        fontSize: 20
    },
})