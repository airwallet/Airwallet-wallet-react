import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, fonts } from '../../../constants/variables';
import Slider from 'react-native-slider';
import {Languages} from '../../../components/Languages/All_languages'
class AmountDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            speed: 7,
        }
        Languages.setLanguage(global.code);
    }
    
    onChangeSpeed = (value) => {
        this.setState({speed: value})
    }
    render() {
        const { maximumAmount, fees, amount, receiverAddress, loading, error } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.amountDetail}>
                    <View style={styles.maximumAmount}>
                        <Text style={styles.txtLeft}>{Languages.MAXIMUM_AMMOUNT} </Text>
                        <Text numberOfLines={1} style={styles.txtRight}>{maximumAmount} </Text>
                    </View>
                </View>
               
                <View style={styles.amountDetail}>
                    <View style={styles.maximumAmount}>
                        <Text style={styles.txtLeft}>{Languages.RECECIVER} </Text>
                        <Text style={styles.txtRight}>{receiverAddress}</Text>
                    </View>
                </View>
                <View style={styles.amountDetail}>
                    <View style={styles.maximumAmount}>
                        <Text style={styles.txtLeft}>{Languages.AMOUNT} </Text>
                        <Text numberOfLines={1} style={styles.txtRight}>{amount}</Text>
                    </View>
                </View>
                <View style={[styles.amountDetail]}>
                    <View style={[styles.maximumAmount, , {borderBottomWidth: 0}]}>
                        <Text>Fees</Text>
                        <Text numberOfLines={1} style={styles.txtRight}>{`Your amout's 1%`}</Text>
                    </View>
                </View>
               {/*  <View styles={styles.sliderCont}>
                     <Slider
                        value={this.state.speed}
                        minimumValue={1}
                        maximumValue={10}
                        onValueChange={this.onChangeSpeed}
                        minimumTrackTintColor={colors.orange}
                        style={styles.slider}
                        thumbTintColor={colors.orange}
                    />
                    <View style={styles.speed}>
                        <Text style={{fontFamily: fonts.nunitoLight}}>{Languages.SLOW}</Text>
                        <Text style={{fontFamily: fonts.nunitoLight}}>{Languages.FAST}</Text>
                    </View>
                </View> */}

                <Text style={styles.error}>{error}</Text>

                <View style={styles.btnCont}>
                    <TouchableOpacity onPress={this.props.onSend} activeOpacity={0.6} style={styles.sendBtn}>
                        <Text style={styles.sendBtnTxt}>{loading ? Languages.SENDING : Languages.SEND}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default AmountDetail;

const styles = StyleSheet.create({
    container: {
        // marginBottom: 20,
    },

    amountDetail: {

    },

    maximumAmount: {
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderBottomColor: colors.borderGrey,
        borderBottomWidth: 1,
        flexDirection: 'row',
    },

    txtLeft: {
        fontSize: 15,
        width: '40%',
        fontFamily: fonts.nunitoLight
    },

    txtRight: {
        fontSize: 15,
        fontWeight: 'bold',
        width: '60%',
        fontFamily: fonts.nunitoLight,
        textAlign: 'right'
    },

    btnCont: {
        width: '100%', 
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop: 40,
        paddingHorizontal: 10,
        marginBottom: 20
    },

    sendBtn: {
        padding: 11,
        backgroundColor: colors.lightGrey,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        borderRadius: 5,
    },

    sendBtnTxt: {
        color: 'white',
        fontSize: 20    
    },

    sliderCont: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },

    slider: {
    //    paddingHorizontal: 20,
       marginHorizontal: 10,
    },

    speed: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 5,
    },

    error: {
        color: 'red',
    }


})