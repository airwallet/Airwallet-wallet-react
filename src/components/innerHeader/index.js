import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, Image, TouchableOpacity } from 'react-native';
import { colors, fonts } from '../../constants/variables'

const isIos = Platform.OS === 'ios';

class Header extends Component {
	logoPress = () => {
		this.props.logoPress && this.props.logoPress();
	}
    render() {
        const { amount = "6089", totalTxt = "TOTAL", style, showLogo = false} = this.props;
        return (
            <View style={[style]}>
                <View style={[styles.totalAmount]} >
                    <View style={styles.total}>
                        <Text style={styles.totalTXT}>{totalTxt}</Text>
                        <Text style={styles.amountTxt}>{amount}</Text>
                    </View>
                </View>
                {showLogo && <TouchableOpacity activeOpacity={this.props.logoPress ? 0.8 : 1} onPress={this.logoPress} style={styles.logo}>
                    <Image source={require('../../images/logowithroundborder.png')} style={{width: 45, height: 45, resizeMode: 'contain'}}/>
                </TouchableOpacity>}
            </View>
        );
    }
}



const styles = StyleSheet.create({
    
	totalAmount: {
		alignItems: 'center',
		borderColor: colors.gold,
		borderWidth: 1,
		borderRadius: 5,
		paddingHorizontal: 15,
		paddingBottom: 20,
		paddingTop: 20,
		marginBottom: 25,
		marginHorizontal: 10,
		marginTop: 15,
    },
    
    logo: {
		position: 'absolute', 
		top: isIos ? 62 : 64, 
		left: '44%',
    },
    
    totalTXT:{
		fontSize: 22,
		color: colors.textLight,
		fontFamily: fonts.nunitoLight,
	},

	amountTxt: {
		fontSize: 22,
		color: colors.orange,
		fontFamily: fonts.nunitoLight,
    },
    
    total: {
		flexDirection:'row', 
		width:'100%', 
		justifyContent:'space-between',
	},
})

export default Header;