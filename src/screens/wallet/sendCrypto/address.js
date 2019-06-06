import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Platform } from 'react-native';
import { dimensions, colors, fonts } from '../../../constants/variables';
import Svg,{ Path } from 'react-native-svg';
import {Languages} from '../../../components/Languages/All_languages'
const isIos = Platform.OS === 'ios';
//{Languages.setLanguage(global.code)} not use 
const Address = (props) => (
   
    <View style={styles.address} >
     
        <View style={styles.receiverAddress}>
            <TextInput 
                value={props.receiverAddress} 
                style={styles.addressInput} 
                onChangeText={(text) => props.onChangeHandle(text, 'receiverAddress')}  
                placeholder="Enter the Receiver's Address"
            />
            <TouchableOpacity onPress={props.onOpenQrscanner} style={styles.qrCode}>
                <Svg viewBox="0 0 37 31" height="28" width="30">
                    <Path strokeWidth="0" fill={colors.orange} d="M39.375,45.000 L39.375,42.187 L45.000,42.187 L45.000,45.000 L39.375,45.000 ZM42.187,30.937 L45.000,30.937 L45.000,33.750 L42.187,33.750 L42.187,30.937 ZM39.375,25.312 L45.000,25.312 L45.000,28.125 L39.375,28.125 L39.375,25.312 ZM42.187,22.500 L30.937,22.500 L30.937,19.687 L33.750,19.687 L33.750,16.875 L36.562,16.875 L36.562,19.687 L39.375,19.687 L39.375,16.875 L45.000,16.875 L45.000,19.687 L42.187,19.687 L42.187,22.500 ZM30.937,-0.000 L45.000,-0.000 L45.000,14.062 L30.937,14.062 L30.937,-0.000 ZM33.750,11.250 L42.187,11.250 L42.187,2.812 L33.750,2.812 L33.750,11.250 ZM36.562,5.625 L39.375,5.625 L39.375,8.437 L36.562,8.437 L36.562,5.625 ZM30.937,36.562 L28.125,36.562 L28.125,30.937 L30.937,30.937 L30.937,36.562 ZM25.312,22.500 L28.125,22.500 L28.125,28.125 L25.312,28.125 L25.312,22.500 ZM16.875,16.875 L25.312,16.875 L25.312,14.062 L28.125,14.062 L28.125,19.687 L16.875,19.687 L16.875,16.875 ZM25.312,11.250 L22.500,11.250 L22.500,8.437 L16.875,8.437 L16.875,7.031 L16.875,5.625 L16.875,2.812 L19.687,2.812 L19.687,5.625 L28.125,5.625 L28.125,8.437 L25.312,8.437 L25.312,11.250 ZM22.500,-0.000 L28.125,-0.000 L28.125,2.812 L22.500,2.812 L22.500,-0.000 ZM19.687,14.062 L16.875,14.062 L16.875,11.250 L19.687,11.250 L19.687,14.062 ZM19.687,25.312 L22.500,25.312 L22.500,28.125 L16.875,28.125 L16.875,25.312 L14.062,25.312 L12.656,25.312 L11.250,25.312 L11.250,28.125 L8.437,28.125 L8.437,22.500 L11.250,22.500 L11.250,16.875 L14.062,16.875 L14.062,22.500 L19.687,22.500 L19.687,25.312 ZM-0.000,-0.000 L14.062,-0.000 L14.062,14.062 L-0.000,14.062 L-0.000,-0.000 ZM2.812,11.250 L11.250,11.250 L11.250,2.812 L2.812,2.812 L2.812,11.250 ZM5.625,5.625 L8.437,5.625 L8.437,8.437 L5.625,8.437 L5.625,5.625 ZM5.625,16.875 L8.437,16.875 L8.437,19.687 L5.625,19.687 L5.625,16.875 ZM2.812,22.500 L5.625,22.500 L5.625,25.312 L2.812,25.312 L2.812,28.125 L-0.000,28.125 L-0.000,16.875 L2.812,16.875 L2.812,22.500 ZM14.062,45.000 L-0.000,45.000 L-0.000,30.937 L14.062,30.937 L14.062,45.000 ZM11.250,33.750 L2.812,33.750 L2.812,42.187 L11.250,42.187 L11.250,33.750 ZM8.437,39.375 L5.625,39.375 L5.625,36.562 L8.437,36.562 L8.437,39.375 ZM25.312,39.375 L30.937,39.375 L30.937,42.187 L25.312,42.187 L25.312,45.000 L16.875,45.000 L16.875,42.187 L22.500,42.187 L22.500,33.750 L16.875,33.750 L16.875,30.937 L25.312,30.937 L25.312,39.375 ZM19.687,39.375 L16.875,39.375 L16.875,36.562 L19.687,36.562 L19.687,39.375 ZM30.937,25.312 L36.562,25.312 L36.562,33.750 L33.750,33.750 L33.750,28.125 L30.937,28.125 L30.937,25.312 ZM42.187,39.375 L36.562,39.375 L36.562,45.000 L33.750,45.000 L33.750,36.562 L42.187,36.562 L42.187,39.375 Z" />
                </Svg>
            </TouchableOpacity>
        </View>
        <TextInput 
            value={props.amount} 
            style={styles.amountInput} 
            onChangeText={(text) => props.onChangeHandle(text, 'amount')}  
            keyboardType="numeric"
            placeholder="Enter Amount"
        />
        <Text style={styles.error}>{props.error}</Text>
        <TouchableOpacity onPress={props.onSend} activeOpacity={0.6} style={styles.sendBtn}>
            <Text style={styles.sendBtnTxt}>NEXT</Text>
        </TouchableOpacity>
    </View>
)

const styles = StyleSheet.create({
    address: {
        flex: 1,
        height: 400,
        alignItems: 'center',
        justifyContent: 'center',
    },

    receiverAddress: {
        borderWidth: 1,
        borderColor: colors.borderGrey,
        padding: 10,
        borderRadius: 5,
        width: '80%',
        padding: isIos ? 10 : 0,
        paddingRight: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },

    addressInput: {
        width: '80%',
        fontFamily: fonts.nunitoLight
    },

    qrCode: {
        paddingRight: 10,
    },

    sendBtn: {
        padding: 11,
        backgroundColor: colors.lightGrey,
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        marginTop: 20,
        borderRadius: 5,
    },

    sendBtnTxt: {
        color: 'white',
        fontSize: 20,
        fontFamily: fonts.nunitoLight
    },

    amountInput: {
        borderWidth: 1,
        borderColor: colors.borderGrey,
        padding: 10,
        borderRadius: 5,
        width: '80%',
        padding: 14 ,
        marginBottom: 10
    },

    error: {
        color: 'red',
    }
})

export default Address;