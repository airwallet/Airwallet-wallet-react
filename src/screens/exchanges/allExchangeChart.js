import React from 'react';
import { PieChart } from 'react-native-svg-charts';
import { View, Text, StyleSheet } from 'react-native';
import {TextBox} from '../../components/TextBox';
import { randomColor, getPercent, moneyFormate,  } from '../../utils/functions';
import { colors } from '../../constants/variables';
import Loader from '../../components/loader';
 

class AllExchangeChart extends React.PureComponent {

    getChartData = (data) => {
        let chartData = [];
        if(!data.length) return [];
        let coinData = [...data]
   
        chartData = coinData.map((item, index) => ({
                value: item.totalAmount,
                svg: {
                    fill: randomColor(),
                    onPress: () => console.log('press', index),
                },
                key: item.name
            }))
       
        return chartData;
    }

    renderTotalValue = (totalValue) => (
        <View style={styles.totalValue}>
            <TextBox style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>{moneyFormate(Math.round(totalValue))}</TextBox>
            <TextBox style={{fontSize: 12, fontWeight: 'bold', color: colors.lightGrey}}>Total Balance</TextBox>
        </View>
    )
    
    render() {
        const { totalValue, data, isFetching } = this.props;
        
        let chartData = [];
        if(data.data){
            chartData = this.getChartData(data.data);
        }
        
        return (
            <View style={styles.container}>
                <View style={{width: '50%'}}>
                    <TextBox style={styles.totalBalanceTxt}>TOTAL BALANCE</TextBox>
                    <TextBox numberOfLines = {1} style={styles.totalBtc}>{data.totalBtc}</TextBox>
                    <TextBox style={styles.totalBalance}>≈ {(Math.round(data.totalBalance * 1000) / 1000)} USD</TextBox>
                </View>
                {!isFetching ? <View style={styles.chart}>
                    {chartData.length ? <PieChart
                        innerRadius = "65%"
                        labelRadius = "100%"
                        animate = {true}
                        style={ { height: 200 } }
                        data={ chartData }
                    /> : <TextBox style={{padding: 30}}>No Data Available</TextBox>}
                </View> : <Loader/>}
                {data.data && data.data.length ? this.renderTotalValue(data.totalBalance) : null}
            </View>
           
        )
    }
 
}
 
export default AllExchangeChart;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#343434',
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },

    chart: {
        width: '50%',
    },

    details: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    totalValue: {
        position: 'absolute',
        right: 70,
        alignItems: 'center'
    },

    totalBalanceTxt: {
        color: 'white', 
        fontSize: 16, 
        fontWeight: 'bold',
        marginBottom: 5,
   },

    totalBalance: {
        color: colors.lightGrey,
        fontSize: 15,
        fontWeight: 'bold'
    },
    
    totalBtc: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold'
    }
})