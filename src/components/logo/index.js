import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { staticTxt, colors, fonts } from '../../constants/variables'

class Logo extends Component {
    render() {
        return (
            <View style={styles.logoCont}>
                <Image resizeMode="contain" style={[styles.logo, this.props.style]} source={require('../../images/logo.png')} />
                <AppName {...this.props}/>
            </View>
        );
    }
}

export const AppName = (props) => (
    <View style={{flexDirection: 'row',}}>
        <Text style={[styles.logoTxt, {color: 'black'}, props.styleTxt]}>AIR</Text>
        <Text style={[styles.logoTxt, props.styleTxt]}>WALLET</Text>
    </View>
)

const styles = StyleSheet.create({

    logoCont: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    logo: {
    },

    logoTxt: {
        fontSize: 40,
        color: colors.orange,
        fontFamily: fonts.exoSemiBold,
    }
})

export default Logo;

