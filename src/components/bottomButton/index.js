import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { dimensions, deviceDimensions, colors, isIos } from '../../constants/variables';
import { ifIphoneX } from '../../utils/isIphoneX';
import BarLoader from '../../components/loader/barLoader';
import KeyboardListener from '../../components/keyboardListener';

const LOADER_HEIGHT = 4;
const IPHONEX_BOTTOM_SPACE = 20;

class BottomButton extends Component {
    constructor(){
        super();
        this.state= {
            keyboardHeight: 0,
            keyboardOpen: false,
        }
    }

    onKeyboardToggle = (e, keyboardOpen) => {
        const keyboardHeight = e.endCoordinates.height;
        setTimeout(() => this.setState({keyboardHeight, keyboardOpen}), 150);
        
    }
    render() {
        const { keyboardOpen, keyboardHeight } = this.state;
        const containerStyle = {
            // bottom: keyboardHeight - IPHONEX_BOTTOM_SPACE,
            ...ifIphoneX({
                bottom: keyboardHeight - IPHONEX_BOTTOM_SPACE
            },{
                bottom: keyboardHeight - 10
            })
        }
        return (
            <View style={[styles.container, keyboardOpen ? containerStyle : {}, this.props.style]}>
                <KeyboardListener
                    onWillShow={(event) => this.onKeyboardToggle(event, true)}
                    onWillHide={(event) => this.onKeyboardToggle(event, false)}
                />
                <View style={[isIos ? styles.barLoader : {height: LOADER_HEIGHT}]}>
                    <BarLoader
                        height = {LOADER_HEIGHT}
                        {...this.props}
                    />
                </View>
                <View style={[styles.children, this.props.childrenStyle]}>
                    {this.props.children}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        height: dimensions.bottomButtonHeight,
        left: 0,
        right: 0,
        bottom: 0,
        height: '10%',
        borderRadius: 15,
        width: deviceDimensions.width,
        backgroundColor: colors.mainColor,
        zIndex: 100,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },

    children: { 
        alignItems: 'center', 
        justifyContent: 'center', 
        width: '100%',
        ...ifIphoneX({
            paddingBottom: IPHONEX_BOTTOM_SPACE
        }, {
            // paddingBottom: 10
        })
    },

    barLoader: {
        position: 'absolute',
        top: - LOADER_HEIGHT,
    },
})

export default BottomButton;