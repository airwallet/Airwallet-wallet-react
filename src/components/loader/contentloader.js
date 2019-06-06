import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { colors, fonts } from '../../constants/variables';
import ContentLoader from 'react-native-content-loader'
import {Circle, Rect} from 'react-native-svg'

class Loader extends Component {
    render(){
        let { color, size, loadingTxt, style} = this.props;
        color = color ? color : colors.orange;
        size = size ? size : 'large';
        loadingTxt = loadingTxt ? loadingTxt : 'Loading...'

        return(
            <View style={[styles.container, style]}>
                <ContentLoader primaryColor= "#FCF3CF"
                        secondaryColor="#FEF9E7"
                        duration={700}
                        height={140}
                        width="100%">
                <Circle cx="30" cy="30.52" r="30" /> 
                <Rect x="80" y="17" rx="4" ry="4" width="300" height="13"/>
                <Rect x="80" y="40" rx="3" ry="3" width="250" height="10"/>
                <Rect x="0" y="80" rx="3" ry="3" width="350" height="10"/>
                <Rect x="0" y="100" rx="3" ry="3" width="200" height="10"/>
                <Rect x="0" y="120" rx="3" ry="3" width="360" height="10"/>
            </ContentLoader>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10
    },

    loadingTxt: {
        marginTop: 5,
        fontFamily: fonts.nunitoLight
    }
})

export default Loader;