import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import FingurPrintScaner from '../../../components/fingerPrintScaner'


export default class VerifyFingerPrint extends Component {
    onSkip = () => {
        this.props.navigation.navigate('backupPharse')
    }
    render() {
        const sensorType = this.props.navigation.getParam('sensorType', '')
        return (
        <FingurPrintScaner 
            navigation={this.props.navigation} 
            skippable={true} 
            onSkip={() => this.props.navigation.navigate('backupPharse')}
            onVerify={() => this.props.navigation.navigate('backupPharse')}
            title={sensorType === 'faceId' ? ' ' : undefined}
            sensorType = {sensorType}
        />
        );
    }
}
