import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg,{ Path} from 'react-native-svg';

class RoundButton extends Component {
    
    render() {
        const { disabled = false } = this.props;
        return (
            <TouchableOpacity disabled={disabled} onPress={this.props.onPress} activeOpacity={0.6} style={[styles.container, this.props.style]}>
                <View style={{width: '10%', marginHorizontal: 15}}>
                    <View style={[styles.btnIcon, this.props.iconStyle]}>{this.props.icon}</View>
                </View>
                <View style={{width: '90%'}}>
                    <Text style={[styles.btnTitle, this.props.titleStyle]}>{this.props.title}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'white',
    },

    btnIcon: {
        borderWidth: 1, 
        borderColor: 'white', 
        borderRadius: 100,
        height: 25, 
        width: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },

    btnTitle: {
        color: 'white',
        fontSize: 17,
    }
})

export default RoundButton;