import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ToastAndroid, Platform, Clipboard } from 'react-native';
import { colors, dimensions, fonts } from '../../../constants/variables';
import { getAsyncStorage, getMultiAsyncStorage, setAsyncStorage } from '../../../utils/asyncStorage';
import { USER_DATA, ACCESS_TOKEN, USER_ID, ENDPOINTS, WITHDRAWS } from '../../../constants/api';
import Loader from '../../../components/loader';
import { GET } from '../../../utils/api/Request';
import {Languages} from '../../../components/Languages/All_languages'
const orangeColor = colors.orange;

class Withdrawal extends Component {
    constructor(){
        super();
        this.state = {
            withdraws : [],
            withdrawsFetching: false,
            userData: {},
            fetchingLocal: true,
        }
        Languages.setLanguage(global.code)
    }

    componentWillMount(){
        getMultiAsyncStorage([USER_DATA, WITHDRAWS], (err, data) => {
            this.setState({fetchingLocal: false, withdrawsFetching: true})
            let userData = data[0][1] ? JSON.parse(data[0][1]) : {};
            let withdraws = data[1][1] ? JSON.parse(data[1][1]) : [];
            //this.withdrawsSocketListener();
            this.setState({
                userData, 
                withdraws}, () => this.getWithdraws())
            })
    }

    withdrawsSocketListener = () => {
        global.socket && global.socket.on('', (withdraws) => {
            console.log('withdraws socket', withdraws)
            this.setState({withdraws});
            setAsyncStorage(WITHDRAWS, JSON.stringify(withdraws))
        })
    }

    getWithdraws = () => {
        const { userData } = this.state;
        const config = {
            headers: {Authorization: 'bearer ' + userData[ACCESS_TOKEN]}
        }
        
        GET(ENDPOINTS.GET_WITHDRAWS, config)
            .then(res => {
                console.log('withdraws RES', res)
                const withdraws = res.data;
                this.setState({withdrawsFetching: false, withdraws})
                setAsyncStorage(WITHDRAWS, JSON.stringify(withdraws))
            })
            .catch(error => {
                this.setState({withdrawsFetching: false})
                console.log(error)
            })
    }

    formateDate = (dt) => {
        const date = new Date(dt)
        const d = date.getDate();
        const m = date.getMonth()+1; 
        const y = date.getFullYear();

        var h = date.getHours();
        var mi = date.getMinutes();
        return `${y}.${m}.${d} | ${h}:${mi}`
    }

    render() {
        const { fetchingLocal, withdrawsFetching, withdraws } = this.state;
        if(fetchingLocal){
            return <Loader loadingTxt=" "/>
        }

        return (
            <View style={styles.container} type="dark">
                <ScrollView style={styles.scroll}>
                       {withdraws.length ? withdraws.map((item, index) => {
                           return <View style={styles.row}>
                           <View style={{width: '40%'}}>
                               <Text style={[styles.textStyle, {color: '#898989'}]}>{this.formateDate(item.createdAt)}</Text>
                               <Text style={styles.textStyle}>{Languages.TRANSER_TO}</Text>
                               <Text style={styles.textStyle}>{Languages.AMOUNT}</Text>
                           </View>
                           <View style={{width: '60%'}}>
                               <Text numberOfLines={1} style={[styles.textStyle, {textAlign: 'right', color: orangeColor}]}>{item._id}</Text>
                               <Text numberOfLines={1} style={[styles.textStyle, {textAlign: 'right'}]}>{item.some_id}</Text>
                               <Text style={[styles.textStyle, {textAlign: 'right'}]}>{`${item.sent_amount} ${item.currency}`}</Text>
                           </View>
                       </View>
                       }) : <View style={styles.noWithdraws}>
                                <Text>No Withdraws.</Text>
                            </View>}
                    <View style={{marginTop: 10}}>
                        {withdrawsFetching ? <Loader loadingTxt="Updating..."/> : null}
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

   noWithdraws: {
    alignItems: 'center', 
    justifyContent: 'center',
    paddingVertical: 10
   }
})

export default Withdrawal;
