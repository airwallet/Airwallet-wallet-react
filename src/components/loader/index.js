import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { colors, fonts } from '../../constants/variables';

class Loader extends Component {
    render(){
        let { color, size, loadingTxt, style} = this.props;
        color = color ? color : colors.orange;
        size = size ? size : 'large';
        loadingTxt = loadingTxt ? loadingTxt : 'Loading...'

        return(
            <View style={[styles.container, style]}>
                <ActivityIndicator
                    size={size}
                    color={color}
                />
                <Text style={styles.loadingTxt}>{loadingTxt}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },

    loadingTxt: {
        marginTop: 5,
        fontFamily: fonts.nunitoLight
    }
})

export default Loader;