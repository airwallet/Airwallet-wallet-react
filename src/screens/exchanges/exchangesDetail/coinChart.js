import React from 'react';
import { PieChart } from 'react-native-svg-charts';
import { View, Text, StyleSheet } from 'react-native';
import {TextBox} from '../../../components/TextBox';
import { randomColor, getPercent,  } from '../../../utils/functions';
 
class CoinChart extends React.PureComponent {

    getOtherData = (otherData) => {
        let other = {key: 'OTHER'};
        let value = 0;
        if(otherData.length){
            otherData.map(oth => {
                value += oth.amount;
            })
        }
        other.value = value;
        other.percent = getPercent(this.props.totalValue, value)
        other.svg = {
            fill: randomColor(),
            onPress: () => {}
        }
        return other;
    }

    getChartData = (data) => {
        let chartData = [];
        if(!data.length) return [];
        let coinData = [...data]
        let topFive = [];
        let other = false;
        if(coinData.length > 5){
            topFive = coinData.splice(0, 5);
            other = true;
        }else{
            topFive = coinData;
        }
        chartData = topFive.map((item, index) => ({
                value: item.amount,
                svg: {
                    fill: randomColor(),
                    onPress: () => console.log('press', index),
                },
                key: item.symbol,
                percent: getPercent(this.props.totalValue, item.amount)
            }))
        if(other){
            chartData.push(this.getOtherData(coinData));
        }
        return chartData;
    }

    renderTotalValue = (totalValue) => (
        <View style={styles.totalValue}>
                    <TextBox style={{fontSize: 16, fontWeight: 'bold',}}>Total Value(USD)</TextBox>
                    <TextBox style={{fontSize: 18, fontWeight: 'bold'}}>{Math.round(totalValue * 100) / 100}</TextBox>
                </View>
    )
    
    render() {
        const { totalValue, data } = this.props;
        
        const chartData = this.getChartData(data);
        
        return (
            <View style={styles.container}>
                <View style={styles.chart}>
                    {chartData.length ? <PieChart
                        innerRadius = "85%"
                        labelRadius = "100%"
                        animate = {true}
                        style={ { height: 200 } }
                        data={ chartData }
                    /> : <TextBox style={{padding: 30}}>No Data Available</TextBox>}
                </View>
                {chartData.length ? this.renderTotalValue(totalValue) : null}
                <View style={styles.chartDetail}>
                    {chartData.map(item => (
                        <View style={styles.details}>
                            <TextBox style={[styles.coinColor, {backgroundColor: item.svg.fill}]}/>
                            <TextBox style={styles.symbolText}>{item.key} : {item.percent}%</TextBox>
                        </View>
                    ))}
                </View>
            </View>
           
        )
    }
 
}
 
export default CoinChart;

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'red',
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },

    chart: {
        width: '70%',
    },

    chartDetail: {
        width: '30%',
    },

    details: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    coinColor: {
        padding: 5,
        width: 4,
        height: 4,
        marginRight: 5,
    },

    symbolText: {

    },

    totalValue: {
        position: 'absolute',
        left: 90,
        alignItems: 'center'
    }
})