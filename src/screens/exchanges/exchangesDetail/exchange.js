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
import { EXCHANGES } from '../../../constants/api';
import {TextBox} from '../../../components/TextBox';
import FeatherIcons from 'react-native-vector-icons/dist/Feather';
import Exchange from './exchange';
import IoniconsIcon from 'react-native-vector-icons/dist/MaterialIcons'


const coinData = [
    {
        market: "RVN",
        lastPrice: "0.003",
        volume: "137.3",
        percent: "-0.05%",
        value: "77.19",
        cointAmount: "45.43"
    },
    {
        market: "XRP",
        lastPrice: "0.93",
        volume: "37.03",
        percent: "-0.05%",
        value: "89.19",
        cointAmount: "45.43"
    },
    {
        market: "LTC",
        lastPrice: "0.7300",
        volume: "34.30",
        percent: "-0.05%",
        value: "77.19",
        cointAmount: "76.34"
    },
    {
        market: "EOS",
        lastPrice: "1.78",
        volume: "32.90",
        percent: "-0.05%",
        value: "23.19",
        cointAmount: "90.89"
    },
    {
        market: "BTT",
        lastPrice: "84",
        volume: "89.43",
        percent: "-0.05%",
        value: "60.19",
        cointAmount: "23.43"
    },
    {
        market: "FET",
        lastPrice: "0.904",
        volume: "23.3",
        percent: "-0.05%",
        value: "37.19",
        cointAmount: "65.43"
    },
    {
        market: "ENJ",
        lastPrice: "3.978",
        volume: "23.3",
        percent: "-0.05%",
        value: "37.19",
        cointAmount: "65.43"
    },
    {
        market: "XLM",
        lastPrice: "0.73",
        volume: "23.3",
        percent: "-0.05%",
        value: "37.19",
        cointAmount: "65.43"
    },
    {
        market: "ONT",
        lastPrice: "0.0008",
        volume: "23.3",
        percent: "-0.05%",
        value: "37.19",
        cointAmount: "65.43"
    },
    {
        market: "NEO",
        lastPrice: "0.73",
        volume: "23.3",
        percent: "-0.05%",
        value: "37.19",
        cointAmount: "65.43"
    },
]


class ExchangesDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'exchange',
        }
        Languages.setLanguage(global.code);
    }

    changeTab = (activeTab) => {
        this.setState({activeTab})
    }

    render() {
        const { activeTab } = this.state;

        const activeTabStyle = {
            borderBottomWidth: 2
        }

        const activeTabTxt = {
            color: colors.textDark
        }
     
        return (
            <View style={styles.dataTable}>
                <View style={[styles.tableRow, styles.tableHeadRow]}>
                    <TextBox style={[styles.tableHead, {width: 20}]}></TextBox>
                    <TextBox style={[styles.tableHead, {width: 60}]}>Markets</TextBox>
                    <TextBox style={[styles.tableHead, {width: 50}]}>Last Price</TextBox>
                    <TextBox style={[styles.tableHead, {width: 75}]}>Volume</TextBox>
                    <TextBox style={[styles.tableHead, {width: 80}]}>24H Change</TextBox>
                </View>
                {coinData.map(item => (
                    <View style={[styles.tableRow]}>
                    <TextBox style={[styles.tableData, {width: 20, flexDirection: 'row'}]}>
                        <IoniconsIcon color={colors.lightGrey} name="star" size={20} />
                    </TextBox>
                    <TextBox style={[styles.tableData, {width: 60, flexDirection: 'row'}]}>
                        {item.market}
                    </TextBox>
                    <TextBox style={[styles.tableData, {width: 50}]}>{item.lastPrice}</TextBox>
                    <View style={{width: 75, alignItems: 'center'}}>
                        <TextBox style={[styles.tableData]}>{item.volume}</TextBox>
                        <TextBox style={styles.pricePerc}>{item.percent}</TextBox>
                    </View>
                    <View style={{width: 80, alignItems: 'center'}}>
                        <TextBox style={[styles.tableData]}>{item.value}</TextBox>
                        <TextBox style={[styles.totalCoin]}>{item.cointAmount}</TextBox>
                    </View>
                    </View>
                ))}
            </View>
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
        borderBottomColor: '#78BEE4',
        width: "33.33%"
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
        fontWeight: 'bold'
    },

    tableData: {
        alignItems: 'center',
        justifyContent: 'center',
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
        fontSize: 10,
        color: colors.lightGrey
    }
})

export default ExchangesDetail;
