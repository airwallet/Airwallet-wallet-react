import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ToastAndroid, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/dist/FontAwesome';
import Svg,{ Path } from 'react-native-svg';
import { colors, dimensions } from '../../constants/variables';
import IosToast from '../customToast';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';


class SocialButtons extends Component {

    showToast(message) {   
        if(Platform.OS === 'ios'){
            this.refs.iosToast.show(message);
        }else{
            ToastAndroid.show(message, ToastAndroid.SHORT);
        }
    }

    render(){
        return (
            <View style={styles.share}>
            <IosToast positionValue={160} ref="iosToast"/>
                <TouchableOpacity onPress={() => this.showToast('Share on github')}>
                    <Icon style={styles.icon} name="logo-github" size={20} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.showToast('Share on telegram')}>
                    <FontAwesomeIcon style={styles.icon} name="telegram" size={22} color="#41b4e6" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.showToast('Share on facebook')}>
                    <MaterialCommunityIcons style={styles.icon} name="facebook-box" size={22} color="#3b5998" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.showToast('Share on twitter')}>
                    <FontAwesomeIcon style={styles.icon} name="twitter" size={22} color="#26a6d1" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.showToast('Share on reddit')}>
                    <FontAwesomeIcon style={styles.icon} name="reddit" size={22} color="#fe5022" />
                </TouchableOpacity>
            </View>
        )
    }
}

export default SocialButtons;


const styles = StyleSheet.create({
    share: {
        flexDirection: 'row',
    },

    icon : {
        marginHorizontal: 4
    },
})