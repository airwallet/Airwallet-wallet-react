import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, ToastAndroid, Platform, Image } from 'react-native';
import Background from '../../../components/background';
import Container from '../../../components/Container';
import Svg,{ Path } from 'react-native-svg';
import { colors, dimensions, fonts } from '../../../constants/variables';
import IosToast from '../../../components/customToast';
import { currencies } from '../../../constants/currenciesList';
import {Languages} from '../../../components/Languages/All_languages';
import Loader from '../../../components/loader';
import { POST } from '../../../utils/api/Request';
import { EXCHANGES, USER_DATA, ACCESS_TOKEN } from '../../../constants/api';
import {TextBox} from '../../../components/TextBox';
import Table from 'react-native-simple-table';
import FeatherIcons from 'react-native-vector-icons/dist/Feather';
import CoinChart from './coinChart';
import { getMultiAsyncStorage, getAsyncStorage } from '../../../utils/asyncStorage';


class ExchangesDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exchangeData: {

            },
            loading: true,
        }
        Languages.setLanguage(global.code);
    }

    componentWillMount(){
        getAsyncStorage(USER_DATA).then(data => {
            let userData = JSON.parse(data)
            const config = {
                headers: {Authorization: 'bearer ' + userData[ACCESS_TOKEN]}
            }
            this.getExchangeDetail(config);
        })
    }
    
    sortDecending = (data) => {
        var list = data.sort(function(a, b) {
            return b.amount - a.amount;
        });
        return list;
    }

    getExchangeDetail = (configs) => {
        const { config, accountInfo } = this.props.navigation.state.params;
        const apiKey = config ? config.apiKey : '';
        console.log('getExchangeDetail', apiKey, config)
        if(!apiKey)
            return;
        
        configs.data = {apiKey}

        POST(EXCHANGES[accountInfo], configs)
        .then((res) => {
            console.log('binance accountInfo res', res);
            let data = [];
            if(res.data && res.data.data.length){
                data = this.sortDecending(res.data.data);
            }
            this.setState({loading: false, exchangeData: data})
        })
        .catch((error) => {
            this.setState({loading: false})
            console.log(error)
        })
    }

    getTotalValue = (data) => {
        let totalValue = 0;
        if(data.length){
            data.map(value => {
                totalValue += value.amount
            })
        }
        return totalValue;
    }

    render() {
        const { loading, exchangeData } = this.state;
        if(loading)
            return <Loader/>;

        let totalValue = this.getTotalValue(exchangeData);

        return (
            <Background style={styles.background} type="dark">
                <IosToast positionValue={160} ref="iosToast"/>
                <Container style={styles.container}>
                    <View style={styles.content}>
                        <View style={styles.header}>
                            <View></View>
                            <View style={styles.headerCenter}>
                                <TextBox style={styles.headerTitle}>Balance</TextBox>
                                <TextBox style={styles.headerDes}>
                                    <TextBox style={{color: '#78BEE4'}}>•</TextBox> Update Successful
                                </TextBox>
                            </View>
                            <View style={styles.settings}>
                                <TouchableOpacity>
                                    <FeatherIcons color={colors.lightGrey} size={18} name="settings" style={{marginRight: 10}}/>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <FeatherIcons color={colors.lightGrey} size={18} name="plus" style={{marginRight: 10}}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        <View style={styles.tabBar}>
                            <View style={[styles.tab, {borderBottomWidth: 2}]}>
                                <TextBox style={[styles.tabTxt, {color: colors.textDark}]}>Coin</TextBox>
                            </View>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('exchangeWallet')} style={styles.tab}>
                                <TextBox style={styles.tabTxt}>Exchange/Wallet</TextBox>
                            </TouchableOpacity>
                        </View>
                        <ScrollView style={styles.scroll}>
                            <View>
                                <CoinChart totalValue={totalValue} data={exchangeData}/>
                            </View>
                           
                            <View style={styles.dataTable}>
                                <View style={[styles.tableRow, styles.tableHeadRow]}>
                                    <TextBox style={[styles.tableHead, {width: 60}]}>Coin</TextBox>
                                    <TextBox style={[styles.tableHead, {width: 50}]}>P/L</TextBox>
                                    <TextBox style={[styles.tableHead, {width: 75}]}>Price(USD)</TextBox>
                                    <TextBox style={[styles.tableHead, {width: 80}]}>Value(USD)Amount</TextBox>
                                </View>
                                {exchangeData.length ? exchangeData.map(item => (
                                    <View style={[styles.tableRow]}>
                                    <TextBox style={[styles.tableData, {width: 60, flexDirection: 'row'}]}>
                                        {/* <Image source={require('../../../images/arrow_pyramid.png')} style={styles.coinIcon}/> */}
                                        {item.symbol}
                                    </TextBox>
                                    <TextBox style={[styles.tableData, {width: 50}]}>{'N/A'}</TextBox>
                                    <View style={{width: 75, alignItems: 'center'}}>
                                        <TextBox style={[styles.tableData]}>{Math.round(item.price * 100) / 100}</TextBox>
                                        <TextBox style={[styles.pricePerc, {color: item.percent_change_24h > 0 ? 'green' : "#78BEE4"}]}>{item.percent_change_24h > 0 ? "+" : ""}{Math.round(item.percent_change_24h * 100000) / 100000 + '%'}</TextBox>
                                    </View>
                                    <View style={{width: 80, alignItems: 'center'}}>
                                        <TextBox style={[styles.tableData]}>{Math.round(item.amount * 1000) / 1000}</TextBox>
                                        <TextBox style={[styles.totalCoin]}>{Math.round(item.balance * 100000) / 100000}</TextBox>
                                    </View>
                                    </View>
                                )) : <View style={styles.noData}>
                                        <TextBox>No Exchange Data Availabe</TextBox>
                                    </View>}
                            </View>
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
        // padding: 0
    }, 

    container : {
        // marginTop: 15,
        padding: 0,
        marginBottom: (dimensions.bottomTabHeight),
    },

    content: {
        width: '100%',
        height: '100%'
    },

    scroll: {
        // padding: 10,
        paddingTop: 0,
    },

    header: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
        marginBottom: 10
    },

    headerCenter: {
        alignItems: 'center'
    },

    settings: {
        flexDirection: 'row'
    },

    headerTitle: {
        fontSize: 20,
        flexDirection: 'column'
    },

    headerDes: {
        fontSize: 10,
    },

    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    tab: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        width: '50%',
        borderBottomColor: '#78BEE4',
    },

    tabTxt: {
        fontSize: 18,
        color: colors.lightGrey,
        fontWeight: 'bold',
    },

    dataTable: {

    },

    tableRow: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },

    tableHeadRow:{
        backgroundColor: 'rgba(120, 190, 228, 0.1)'
    },

    tableHead: {
        fontWeight: 'bold',
        textAlign: 'center'
    },

    tableData: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },

    coinIcon: {
        height: 18, 
        width: 20, 
        resizeMode: 'contain', 
        marginRight: 8
    },

    pricePerc: {
        fontSize: 10,
        color: '#78BEE4'
    },

    totalCoin: {
        fontSize: 11,
        color: colors.lightGrey
    },

    noData: {
        alignItems: 'center',
        marginTop: 20,
    }
})

export default ExchangesDetail;
