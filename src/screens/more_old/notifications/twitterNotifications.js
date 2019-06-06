import React, { Component } from 'react';
import { View, Text, StyleSheet, ToastAndroid, Platform, Image, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import Svg,{ Path} from 'react-native-svg';
import { dimensions, colors, fonts } from '../../../constants/variables';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import FontAwesomeIcons from 'react-native-vector-icons/dist/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import {Languages} from '../../../components/Languages/All_languages';
const textColor = '#7c8389';

class TwitterNotifications extends Component {
    constructor(props) {
        super(props)
        Languages.setLanguage(global.code) 
    }
    render() {
        return (
            <View style={{margin: 10, marginBottom: 5}}>
                <View style={styles.notification}>
                    <View style={{flexDirection: 'row', alignItems: 'center', borderBottomColor: colors.borderGrey, borderBottomWidth: 0, justifyContent: 'space-between', width: '100%'}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Image source={require('../../../images/logo.png')} style={{height: 40, width: 40, resizeMode: 'contain', marginRight: 10}}/>
                            <View>
                                <View style={{flexDirection: 'row', marginBottom: 5}}>
                                    <Text style={{fontSize: 13, color: colors.orange, fontFamily: fonts.nunitoRegular}}>AirWallet </Text>
                                </View>
                                <View>
                                    <Text style={{color: textColor, fontFamily: fonts.nunitoLight}}>@MyAirWallet</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{marginBottom: 25, marginRight: 5}}>
                            <TouchableOpacity activeOpacity={1}>
                                <MaterialCommunityIcons name="twitter" size={20} color="#26a6d1" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{}}>
                        <Text style={{color: textColor, fontFamily: fonts.nunitoLight}}>
                        {Languages.TWITTER_CRPTYO}
                        </Text>
                    </View>
                    <View style={styles.bottomBar}>
                        <View style={styles.bottomIcon}>
                            <FontAwesomeIcons style={[styles.icon, {marginTop: -3}]} name="comment" size={20} /> 
                            <Text style={styles.text}>5,778</Text>
                        </View>
                        <View style={styles.bottomIcon}>
                            <MaterialCommunityIcons style={styles.icon} name="repeat" size={20} c/>
                            <Text style={styles.text}>51,441</Text>
                        </View>
                        <View style={styles.bottomIcon}>
                            <MaterialCommunityIcons style={styles.icon} name="heart-outline" size={20} />
                            <Text style={styles.text}>9,336</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

export default TwitterNotifications;

const styles = StyleSheet.create({
    notification: {
        borderColor: colors.borderGrey,
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
    },

    bottomBar: {
        flexDirection: 'row', 
        marginTop: 5
    },

    bottomIcon: {
        marginRight: 15, 
        flexDirection: 'row',
        alignItems: 'center',
    },

    icon: {
        marginRight: 5, 
        marginTop: 5,
        color: '#ABABAB',
    },

    text: {
        color: '#ABABAB',
        fontSize: 13,
        fontFamily: fonts.nunitoLight
    }
})