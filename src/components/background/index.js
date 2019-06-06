import React, { Component } from 'react';
import { ImageBackground, StyleSheet, StatusBar, Platform, Text, View, SafeAreaView } from 'react-native';
import { dimensions } from '../../constants/variables';
 
// const paddingTop = Platform.OS === 'ios' ? getStatusBarHeight() : StatusBar.currentHeight;

class Background extends Component {
   
    renderImgBg = (img, style) => (
        <ImageBackground
            source={img}
            style={[styles.container, style]}
         >
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="dark-content" />
            {this.props.children}
        </ImageBackground>
    )

    renderDefault = (style) => (
        <View style={[styles.container, styles.defaultContainer, style]}>
            {this.props.children}
            
        </View>
    )

    render() {
        let { style={}, type, defaultStyle, smallTopMargin=false } = this.props;
        let background = '';
        const lightBg = require('../../images/background_light.png');
        const darkBg = require('../../images/background_dark.png');

        if(type === 'light'){
            background = this.renderImgBg(lightBg, style) 
        }else if(type === 'dark'){
            background = this.renderImgBg(darkBg, style) 
        }else{
            background = this.renderDefault(defaultStyle)
        }
        
        return (
            <View>
                {/* <Text style={{marginTop: 40}}>{dimensions.topSpace}</Text> */}
                <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content" />
       
                {background}
               
            </View>
        );
    }
}

export default Background;

const styles = StyleSheet.create({
    container: {
        height: '100%', 
        width: '100%',
        paddingTop: dimensions.statusBar,
    },

    defaultContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',

    },
})
        
