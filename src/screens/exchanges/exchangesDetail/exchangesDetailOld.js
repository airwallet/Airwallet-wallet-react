import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ToastAndroid, Platform } from 'react-native';
import Background from '../../../components/background';
import Container from '../../../components/Container';
import Svg,{ Path } from 'react-native-svg';
import { colors, dimensions, fonts } from '../../../constants/variables';
import IosToast from '../../../components/customToast';
import { currencies } from '../../../constants/currenciesList';
import {Languages} from '../../../components/Languages/All_languages';
import Loader from '../../../components/loader';
import { POST } from '../../../utils/api/Request';
import { EXCHANGES } from '../../../constants/api';


class ExchangesDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            exchangeData: {
                balances: []
            },
            data : [
                {}
            ]
        }
        Languages.setLanguage(global.code);
    }

    componentWillMount(){
        this.getExchangeDetail();
    }

    getExchangeDetail = () => {
        const { config, accountInfo } = this.props.navigation.state.params;
        const apiKey = config ? config.apiKey : '';

        if(!apiKey)
            return;

        POST(EXCHANGES[accountInfo], { data: {apiKey} })
        .then((res) => {
            console.log('binance accountInfo res', res);
            this.setState({loading: false, exchangeData: res.data.accountInfo})
        })
        .catch((error) => {
            this.setState({loading: false})
            console.log(error)
        })
    }
  
    showToast(message) {   
        if(Platform.OS === 'ios'){
            this.refs.iosToast.show(message);
        }else{
            ToastAndroid.show(message, ToastAndroid.SHORT);
        }
    }

    okexAccountInfo = (exchangeData) => {
        let balances = [];
        if(exchangeData.length){
            exchangeData.map((bal, index)=> {
                currencies.map(cu =>{
                    let data = {};
                    if(cu.sortName === bal.currency){
                        data.image = cu.image;
                        data.free = bal.balance
                        data.asset = bal.currency
                        balances.push(data)
                    }
                   
                })
            });
        }
        return balances;
    }

    binanceAccountInfo = (exchangeData) => {
        let balances = [];
        if(exchangeData.balances && exchangeData.balances.length){
            balances = exchangeData.balances.filter(bal => bal.free > 0);

            balances.map((bal, index)=> {
                currencies.map(cu =>{
                    if(cu.sortName === bal.asset){
                        bal.image = cu.image;
                    }
                })
            });
        }
        return balances;
    }

    kucoinAccountInfo = (exchangeData) => {

        let balances = [];
        if(exchangeData.length){
            exchangeData.map((bal, index) => {
                const data = {
                    asset: bal.currency,
                    free: bal.balance,
                }
                currencies.map(cu =>{
                    if(cu.sortName === bal.currency){
                        data.image = cu.image;
                    }
                })
                balances.push(data)
            })
        }
        return balances;
    }

    getBalances = () => {
        const { exchangeData } = this.state;
        const { accountInfo } = this.props.navigation.state.params;
        let balances = [];

        if(accountInfo === 'ACCOUNT_INFO_OKEX'){
            balances = this.okexAccountInfo(exchangeData)
        }else if (accountInfo === 'ACCOUNT_INFO_BINANCE'){
           balances = this.binanceAccountInfo(exchangeData)
        }else if(accountInfo === 'ACCOUNT_INFO_KUCOIN'){
            balances = this.kucoinAccountInfo(exchangeData);
        }
        return balances;
    }

    render() {
        const { loading, exchangeData } = this.state;
        if(loading)
            return <Loader/>;

        let balances = this.getBalances();
        console.log('balances', balances)

        return (
            <Background style={styles.background} type="dark">
                <IosToast positionValue={160} ref="iosToast"/>
                <Container style={styles.container}>
                    <View style={styles.content}>
                        <View style={styles.header}>
                            <View style={{flexDirection: 'row'}}>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('wallets')} 
                                    style={styles.backButton}
                                >
                                    <Svg viewBox="0 0 37 51" height="30" width="50">
                                        <Path strokeWidth="0" fill="white" d="M8.357,21.622 L24.196,5.756 C24.633,5.320 24.872,4.737 24.872,4.116 C24.872,3.494 24.633,2.912 24.196,2.475 L22.808,1.085 C22.373,0.648 21.791,0.408 21.171,0.408 C20.550,0.408 19.969,0.648 19.533,1.085 L0.674,19.976 C0.237,20.414 -0.003,20.999 -0.001,21.621 C-0.003,22.246 0.236,22.830 0.674,23.268 L19.516,42.140 C19.951,42.577 20.533,42.818 21.153,42.818 C21.774,42.818 22.355,42.577 22.791,42.140 L24.179,40.751 C25.082,39.846 25.082,38.374 24.179,37.470 L8.357,21.622 Z" />
                                    </Svg>
                                </TouchableOpacity>
                                <View style={styles.headerRight}>
                                    {/* <Text style={styles.headerTxt}>{name}</Text> */}
                                </View>
                            </View>
                        </View>
                        <ScrollView style={styles.scroll}>
                            <View style={styles.totalCont}>
                                <Text style={styles.totalTxt}>{Languages.TOTAL}</Text>
                                {/* <Text style={styles.totalTxt}>{amount} USD</Text> */}
                            </View>
                           {balances.map(item => (
                            <TouchableOpacity
                                key={item.asset}
                                onPress={() => this.props.navigation.navigate('')} 
                                activeOpacity={1} style={styles.cryptoList}
                            >
                                <View style={styles.listRow}>
                                    <View style={styles.title}>
                                        <View style={styles.image2}>
                                            <Image  style={{width: 30, height: 30, marginRight: 10}} source={item.image}/>
                                        </View>
                                            <Text numberOfLines={1} style={styles.titleTxt}>{item.asset}</Text>
                                    </View>
                                    <View style={styles.amountDtail}>
                                        <Text numberOfLines={1} style={styles.free}>
                                            {item.free} {item.asset}
                                        </Text>
                                        <View style={styles.amountTxtCont}>
                                            {/* <Text numberOfLines={1} style={styles.amountUsdTxt}>
                                                ={item.amountUsd} USD
                                            </Text> */}
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>  
                           ))}
                        </ScrollView>
                    </View>
                </Container>
            </Background>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        // paddingBottom: 40,
    }, 

    container : {
        marginTop: 15,
        padding: 0,
        marginBottom: (dimensions.bottomTabHeight),
    },

    content: {
        // paddingBottom: dimensions.bottomButtonHeight,
        height: '100%'
    },

    scroll: {
        padding: 10,
        paddingTop: 0,
    },

    header: {
        alignItems: 'center',
        // backgroundColor: '#1453B6',
        paddingVertical: 15,
        paddingHorizontal: 5,
        borderRadius: 5,
        
        // borderColor: colors.gold,
        // borderWidth: 1,
        margin: 10,
        backgroundColor: colors.headerGrey
    },

    backButton: {
        marginRight: 10,
    },

    headerRight: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginRight: 35,
    },

    totalCont: {
        justifyContent: 'space-between', 
        flexDirection: 'row', 
        paddingHorizontal: 10,
        borderColor: colors.gold,
        borderWidth: 1,
        borderRadius: 5,
        padding: 15,
    },

    totalTxt: {
        fontSize: 20,
        color: colors.orange,
        fontFamily: fonts.nunitoLight
    },

    headerImg: { 
        height: 50, 
        width: 50,
        marginRight: 10,
        borderRadius: 5,
    },

    headerTxt: {
        color: "white",
        fontSize: 22,
        fontFamily: fonts.nunitoRegular
    },

    cryptoList: {
		backgroundColor: '#fff',
		// height:80,
		borderBottomWidth: 1,
		borderBottomColor: colors.borderGrey,
    },
    
    listRow: {
		flexDirection: 'row',
		marginHorizontal: 10,
		alignItems: 'center',
		justifyContent: 'space-between',
        elevation: 50,
        paddingVertical: 5
    },
    
    title: {
		paddingLeft: 10,
		// height: 80,
		// width: 80,
		flex: 1,
		flexDirection: 'row',        
		alignItems: 'center',       
	},

	cyptoTitle: {
		flex: 2,
		padding: 10,
		marginLeft: 10,
		justifyContent: 'center',
    },
    
	image2: {
		justifyContent: 'flex-start',
		height: 45,
		width: 45,
		borderRadius: 5,
		paddingRight: 10,
		paddingBottom: 10,
		paddingTop: 10,
	},
    
	titleTxt:{
		color:'#868686',       
		fontSize:20,
		textAlign:'right',
        padding:10,
        fontFamily: fonts.nunitoLight
		
    },
    
    middle_txt_s:{
		color:'#034AA6',
		fontWeight:'bold',
		textAlign:'center',
		fontSize:20
    },
    
    amountTxt:{
		color:'#868686',       
		fontSize: 11,
        textAlign:'right',
        fontFamily: fonts.nunitoLight
    },
    
    amountTxtCont: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
    },
    
    
	amountUsdTxt:{
		color: colors.orange,        
		fontSize: 11,
        textAlign:'right',
        fontFamily: fonts.nunitoLight
        
    },
    
    amountDtail: {
        flex: 1,
       paddingRight: 10,
        justifyContent: 'center',
        alignItems: 'flex-end',
   
    }
})

export default ExchangesDetail;
