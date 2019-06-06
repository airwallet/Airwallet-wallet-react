import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Platform, TouchableOpacity } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather'
import { colors, dimensions } from '../../constants/variables';
import OptionsMenu from '../optionsMenu';

class HeaderContainer extends Component {
    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                    {this.props.children}
                <TouchableOpacity style={[styles.moreIcon, this.props.iconContStyle]}>
                    <OptionsMenu iconStyle={this.props.iconStyle} options={this.props.options} onSelect={this.props.onSelect}/>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: Platform.OS === 'ios' ? 0 : 0,
        position: 'relative',
        left: 0,
        right: 0,
        top: 0,
        zIndex: 100,
        marginHorizontal: 10,
        paddingTop: dimensions.topExtraSpace
    },

    moreIcon:{
        borderRadius: 5,
        width: '7%',
    },
})

export default HeaderContainer;