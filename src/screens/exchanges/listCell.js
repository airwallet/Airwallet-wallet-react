import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { dimensions, colors, fonts } from '../../constants/variables'
import Collapsible from '../../components/collapsibleList';
import SignIn from './signin';
import {Languages} from '../../components//Languages/All_languages';
import { setAsyncStorage, getAsyncStorage } from '../../utils/asyncStorage';
import { BINANCE_ENDPOINTS, EXCHANGES } from '../../constants/api';
import ExchangeChart from './exchangeChart';

export default class ListCell extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
        Languages.setLanguage(global.code);
    }

    pressButton = () => {
        const { item: { createScreen, accountInfo, signin, loginData } } = this.props;
        if(signin)
            this.props.navigation.navigate('exchangesDetail', {config: loginData, accountInfo})
        else
            this.props.navigation.navigate(createScreen, {item: this.props.item});
    }

    getChartData = (data) => {
        let chartData = [];
        chartData = data.map(item => item.totalAmount)
        return chartData;
    }

    
    render(){
        const { item, item: {signin}, chartData } = this.props;
        const { loading, loginData } = this.state;

        if(loading){
            return null;
        }

        let cData = [];
        if(chartData && chartData.length)
            cData = this.getChartData(chartData);

        const toggleBtn = {
            backgroundColor: signin ? 'white' : colors.lightGrey,
            borderColor: signin ? colors.orange : colors.lightGrey,
        }
        const btnTxt = signin ? Languages.DETAIL : Languages.SIGN_IN;
        return(
            <TouchableOpacity 
                key={item.name}
                activeOpacity={1} 
                style={styles.cryptoList}
                onPress = {this.pressButton}
            >
            <View style={styles.listRow}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Image source={item && item.image} style={styles.image} />
                    <Text style={styles.titleTxt}>{item.name}</Text>
                </View>
                <View style={{justifyContent: 'flex-end', width: '30%', justifyContent: 'center'}}>
                    {signin ? <ExchangeChart data = {cData}/> : null}
                </View>
            </View>
        </TouchableOpacity>  
        )
    }
}


const styles = StyleSheet.create({

    image: {
        width: 35,
        height: 35,
      	marginRight: 10,
    },

    cryptoList: {
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderGrey,
        borderRadius: 5,
		paddingVertical: 10,
		marginHorizontal: 10,
    },

    listRow: {
        flexDirection: 'row',
        marginHorizontal: 10,
        justifyContent: 'space-between',
        padding: 8,
        alignItems: 'center',
	},

	titleTxt: {
		fontSize: 20, 
        color: colors.textHead,
        fontFamily: fonts.nunitoRegular
    },

    detailBtn: {
        paddingVertical: 5, 
        paddingHorizontal: 15, 
        borderColor: colors.lightGrey,
        borderWidth: 1,
        borderRadius: 5,
    },
})