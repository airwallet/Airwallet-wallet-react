import React from 'react';
import { PieChart, LineChart } from 'react-native-svg-charts';
import { View, Text, StyleSheet } from 'react-native';
import {TextBox} from '../../components/TextBox';
import { randomColor, getPercent, moneyFormate,  } from '../../utils/functions';
import { colors } from '../../constants/variables';
import Loader from '../../components/loader';
 

class ExchangeChart extends React.PureComponent {
    getPercent = (data) => {
        let percent = 0;
        const ya = data[data.length - 2];
        const ta = data[data.length - 1];
        
        percent = (ta - ya) * 2/(ta + ya) * 100;
        
        if(percent > 0){
            percent = '+'+percent
        }else if(percent < 0){
            percent = percent
        }else {
            percent = '0.00'
        }
        return percent;
    }
    render() {
        const { data } = this.props;
        let totalBalance = 0.00;
        let changePercent = 0.00;
        if(data && data.length){
            totalBalance = (Math.round(data[data.length - 1] * 1000) / 1000);
            changePercent = (Math.round(this.getPercent(data) * 1000) / 1000);
        }
        const percentColor = changePercent == 0 ? 'blue' : changePercent > 0 ? 'green' : 'red';
        return (
            <View>
                <LineChart
                    style={{ height: 20, width: "100%" }}
                    data={ data }
                    svg={{ stroke: randomColor(), strokeWidth: 4 }}
                >
                </LineChart>
                <View style={styles.balance}>
                    <TextBox style={styles.balanceTxt}>${totalBalance}</TextBox>
                    <TextBox style={[styles.balancePercent, { color: percentColor}]}>{changePercent}%</TextBox>
                </View>
            </View>
        )
    }
}
 
export default ExchangeChart;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#343434',
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },

    balance: {
        flexDirection: 'row', 
        marginTop: 10,
        justifyContent: 'space-between'
    },

    balanceTxt: {
        fontSize: 10,
        marginRight: 15,
        fontWeight: 'bold',
    },

    balancePercent: {
        fontSize: 10
    }
})