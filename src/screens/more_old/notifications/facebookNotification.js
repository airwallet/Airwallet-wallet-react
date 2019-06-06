import React, { Component } from 'react';
import { View, Text, StyleSheet, ToastAndroid, Platform, Image, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import Svg,{ Path} from 'react-native-svg';
import { dimensions, colors, fonts } from '../../../constants/variables';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {Languages} from '../../../components/Languages/All_languages';
const textColor = '#7c8389';

class FacebookNotifications extends Component {
    constructor(props) {
        super(props)
        Languages.setLanguage(global.code) 
    }
    render() {
        return (
            <View style={{margin: 10, marginBottom: 5}}>
                <View style={styles.notification}>
                    <View style={{flexDirection: 'row', alignItems: 'center', borderBottomColor: colors.borderGrey, borderBottomWidth: 1, paddingBottom: 5, justifyContent: 'space-between', width: '100%'}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Image source={require('../../../images/logo.png')} style={{height: 40, width: 40, resizeMode: 'contain', marginRight: 10}}/>
                            <View>
                                <View style={{flexDirection: 'row', marginBottom: 5}}>
                                    <Text style={{fontSize: 13, color: colors.orange, fontFamily: fonts.nunitoRegular}}>{Languages.FACEBOOK_TEAN}</Text>
                                    <Text style={{fontSize: 13, color: textColor, fontFamily: fonts.nunitoLight}}> 17, 549 like this</Text>
                                </View>
                                <View>
                                    <Text style={{color: textColor, fontFamily: fonts.nunitoLight}}>October 5 at 5:59pm</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{marginBottom: 25, marginRight: 5}}>
                            <TouchableOpacity  activeOpacity={1}>
                                <MaterialCommunityIcons style={styles.icon} name="facebook-box" size={20} color="#3b5998" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{paddingTop: 5}}>
                        <Text style={{color: textColor, fontFamily: fonts.nunitoLight}}>
                          {Languages.FACEBOOK_AIRWALLET_}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}

export default FacebookNotifications;

const styles = StyleSheet.create({
    notification: {
        borderColor: colors.borderGrey,
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
    }
})