import React, { Component } from 'react';
import { 
    View,  
    StyleSheet,
    Text,
    TouchableOpacity,
    Linking, } from 'react-native';
import PopView from '../popView';
import QRCodeScanner from './scanner';
import { colors } from '../../constants/variables';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

class QrScanner extends Component {
    render() {
        return (
            <PopView style={styles.container} visible={this.props.visible} onRequestClose={this.props.onRequestClose}>

                <QRCodeScanner
                    onRead={this.props.onScanSucess}
                />
                <TouchableOpacity onPress={this.props.onRequestClose} activeOpacity={0.6} style={styles.closeIcon} >
                    <MaterialCommunityIconsIcon name="close" size={25} color="white"/>
                </TouchableOpacity>
                {/* <View style={styles.focusBox}>

                </View> */}
            </PopView>
        );
    }
}

export default QrScanner;



const styles = StyleSheet.create({
    container: {
        // flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },

    focusBox: {
        position: 'absolute',
        top: 210,
        height: 170,
        width: 170,
        borderColor: colors.borderGrey,
        borderWidth: 2,
        borderRadius: 5,
    },

    closeIcon: {
        position: 'absolute',
        top: 7,
        right: 10
    },


});