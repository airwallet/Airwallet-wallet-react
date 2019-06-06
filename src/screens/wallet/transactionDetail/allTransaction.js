import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ToastAndroid, Platform, Clipboard } from 'react-native';
import { colors, dimensions, fonts } from '../../../constants/variables';
import {Languages} from '../../../components/Languages/All_languages'
const orangeColor = colors.orange;

class AllTransaction extends Component {
    constructor(props) {
        super(props)
         Languages.setLanguage(global.code) 
    }
    render() {
        return (
            <View style={styles.container} type="dark">
                <ScrollView style={styles.scroll}>
                    <View style={styles.row}>
                        <View>
                            <Text style={[styles.textStyle, {color: '#898989'}]}>2018.08.04 | 12:47</Text>
                            <Text style={styles.textStyle}>{Languages.TRANSER_TO}</Text>
                            <Text style={styles.textStyle}>{Languages.AMOUNT}</Text>
                        </View>
                        <View>
                            <Text style={[styles.textStyle, {textAlign: 'right', color: orangeColor}]}>TXID</Text>
                            <Text style={[styles.textStyle, {textAlign: 'right'}]}>e5f4xxAssx1sDfga57x</Text>
                            <Text style={[styles.textStyle, {textAlign: 'right'}]}>0.1221 BTC</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View>
                            <Text style={[styles.textStyle, {color: '#898989'}]}>2018.08.04 | 12:47</Text>
                            <Text style={styles.textStyle}>Transer To:</Text>
                            <Text style={styles.textStyle}>Amount:</Text>
                        </View>
                        <View>
                            <Text style={[styles.textStyle, {textAlign: 'right', color: orangeColor}]}>TXID</Text>
                            <Text style={[styles.textStyle, {textAlign: 'right'}]}>e5f4xxAssx1sDfga57x</Text>
                            <Text style={[styles.textStyle, {textAlign: 'right'}]}>0.1221 BTC</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View>
                            <Text style={[styles.textStyle, {color: '#898989'}]}>2018.08.04 | 12:47</Text>
                            <Text style={styles.textStyle}>Transer To:</Text>
                            <Text style={styles.textStyle}>Amount:</Text>
                        </View>
                        <View>
                            <Text style={[styles.textStyle, {textAlign: 'right', color: orangeColor}]}>TXID</Text>
                            <Text style={[styles.textStyle, {textAlign: 'right'}]}>e5f4xxAssx1sDfga57x</Text>
                            <Text style={[styles.textStyle, {textAlign: 'right'}]}>0.1221 BTC</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View>
                            <Text style={[styles.textStyle, {color: '#898989'}]}>2018.08.04 | 12:47</Text>
                            <Text style={styles.textStyle}>Transer To:</Text>
                            <Text style={styles.textStyle}>Amount:</Text>
                        </View>
                        <View>
                            <Text style={[styles.textStyle, {textAlign: 'right', color: orangeColor}]}>TXID</Text>
                            <Text style={[styles.textStyle, {textAlign: 'right'}]}>e5f4xxAssx1sDfga57x</Text>
                            <Text style={[styles.textStyle, {textAlign: 'right'}]}>0.1221 BTC</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View>
                            <Text style={[styles.textStyle, {color: '#898989'}]}>2018.08.04 | 12:47</Text>
                            <Text style={styles.textStyle}>Transer To:</Text>
                            <Text style={styles.textStyle}>Amount:</Text>
                        </View>
                        <View>
                            <Text style={[styles.textStyle, {textAlign: 'right', color: orangeColor}]}>TXID</Text>
                            <Text style={[styles.textStyle, {textAlign: 'right'}]}>e5f4xxAssx1sDfga57x</Text>
                            <Text style={[styles.textStyle, {textAlign: 'right'}]}>0.1221 BTC</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View>
                            <Text style={[styles.textStyle, {color: '#898989'}]}>2018.08.04 | 12:47</Text>
                            <Text style={styles.textStyle}>Transer To:</Text>
                            <Text style={styles.textStyle}>Amount:</Text>
                        </View>
                        <View>
                            <Text style={[styles.textStyle, {textAlign: 'right', color: orangeColor}]}>TXID</Text>
                            <Text style={[styles.textStyle, {textAlign: 'right'}]}>e5f4xxAssx1sDfga57x</Text>
                            <Text style={[styles.textStyle, {textAlign: 'right'}]}>0.1221 BTC</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View>
                            <Text style={[styles.textStyle, {color: '#898989'}]}>2018.08.04 | 12:47</Text>
                            <Text style={styles.textStyle}>Transer To:</Text>
                            <Text style={styles.textStyle}>Amount:</Text>
                        </View>
                        <View>
                            <Text style={[styles.textStyle, {textAlign: 'right', color: orangeColor}]}>TXID</Text>
                            <Text style={[styles.textStyle, {textAlign: 'right'}]}>e5f4xxAssx1sDfga57x</Text>
                            <Text style={[styles.textStyle, {textAlign: 'right'}]}>0.1221 BTC</Text>
                        </View>
                    </View>
                    <View style={[styles.row, {borderBottomWidth: 0}]}>
                        <View>
                            <Text style={[styles.textStyle, {color: '#898989'}]}>2018.08.04 | 12:47</Text>
                            <Text style={styles.textStyle}>Transer To:</Text>
                            <Text style={styles.textStyle}>Amount:</Text>
                        </View>
                        <View>
                            <Text style={[styles.textStyle, {textAlign: 'right', color: orangeColor}]}>TXID</Text>
                            <Text style={[styles.textStyle, {textAlign: 'right'}]}>e5f4xxAssx1sDfga57x</Text>
                            <Text style={[styles.textStyle, {textAlign: 'right'}]}>0.1221 BTC</Text>
                        </View>
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

})

export default AllTransaction;
