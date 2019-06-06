import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ToastAndroid, Platform, Clipboard } from 'react-native';
import { colors, dimensions, fonts } from '../../../constants/variables';
import { getMultiAsyncStorage, setAsyncStorage } from '../../../utils/asyncStorage';
import { USER_DATA, ENDPOINTS, DEPOSITS, ACCESS_TOKEN } from '../../../constants/api';
import { GET } from '../../../utils/api/Request';
import Loader from '../../../components/loader';
import {Languages} from '../../../components/Languages/All_languages'
const orangeColor = colors.orange;

class Deposit extends Component {
    constructor(){
        super();
        this.state = {
            deposits : [],
            depositsFetching: false,
            userData: {},
            fetchingLocal: true,
        }
        Languages.setLanguage(global.code) 
    }

    componentWillMount(){
        getMultiAsyncStorage([USER_DATA, DEPOSITS], (err, data) => {
            this.setState({fetchingLocal: false, depositsFetching: true})
            let userData = data[0][1] ? JSON.parse(data[0][1]) : {};
            let deposits = data[1][1] ? JSON.parse(data[1][1]) : [];
            //this.depositsSocketListener();
            this.setState({
                userData, 
                deposits}, () => this.getDeposits())
            })
    }

    depositsSocketListener = () => {
        global.socket && global.socket.on('', (deposits) => {
            console.log('withdraws socket', deposits)
            this.setState({deposits});
            setAsyncStorage(DEPOSITS, JSON.stringify(deposits))
        })
    }

    getDeposits = () => {
        const { userData } = this.state;
        const config = {
            headers: {Authorization: 'bearer ' + userData[ACCESS_TOKEN]}
        }
        
        GET(ENDPOINTS.GET_DEPOSITS, config)
            .then(res => {
                console.log('deposits RES', res)
                const deposits = res.data;
                this.setState({depositsFetching: false, deposits})
                setAsyncStorage(DEPOSITS, JSON.stringify(deposits))
            })
            .catch(error => {
                this.setState({depositsFetching: false})
                console.log(error)
            })
    }

    formateDate = (dt) => {
        const date = new Date(dt)
        const d = date.getDate();
        const m = date.getMonth()+1; 
        const y = date.getFullYear();
        
        console.log('formateDate', d,m,y, date)
        var h = date.getHours();
        var mi = date.getMinutes();
        return `${y}.${m}.${d} | ${h}:${mi}`
    }


    render() {
        const { fetchingLocal, depositsFetching, deposits } = this.state;
        if(fetchingLocal){
            return <Loader loadingTxt=" "/>
        }
        return (
            <View style={styles.container} type="dark">
                <ScrollView style={styles.scroll}>
                {deposits.length ? deposits.map((item, index) => {
                           return  <View style={styles.row}>
                           <View style={{width: '40%'}}>
                               <Text style={[styles.textStyle, {color: '#898989'}]}>{this.formateDate(item.createdAt)}</Text>
                               <Text style={styles.textStyle}>{Languages.TRANSFROM_FROM} </Text>
                               <Text style={styles.textStyle}>{Languages.AMOUNT}</Text>
                           </View>
                           <View style={{width: '60%'}}>
                               <Text numberOfLines={1} style={[styles.textStyle, {textAlign: 'right', color: orangeColor}]}>{item.txnId}</Text>
                               <Text numberOfLines={1} style={[styles.textStyle, {textAlign: 'right'}]}>{item.merchantId}</Text>
                               <Text style={[styles.textStyle, {textAlign: 'right'}]}>{`${item.amount} ${item.currency}`}</Text>
                           </View>
                       </View>
                       }) : <View style={styles.noDeposits}>
                                <Text>No Deposits.</Text>
                            </View>}
                    <View style={{marginTop: 10}}>
                        {depositsFetching ? <Loader loadingTxt="Updating..."/> : null}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
   container: {
       marginTop: 20,
       marginBottom: 10,
   },

   scroll: {
    padding: 18,
    paddingTop: 0,
   },

   row: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGrey,
    paddingVertical: 15,
   },

   textStyle: {
       color: colors.textHead,
       paddingVertical: 2,
       fontFamily: fonts.nunitoRegular
   },

   noDeposits: {
       alignItems: 'center', 
       justifyContent: 'center',
       paddingVertical: 10
    }
})

export default Deposit;
