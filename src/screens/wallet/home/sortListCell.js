import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Platform, Image, Switch, Easing, Animated  } from 'react-native';
import { colors, fonts } from '../../../constants/variables';

const isIos = Platform.OS === 'ios' ;

class CurrencyCell extends Component {
	
constructor(props) {
	super(props);

	this._active = new Animated.Value(0);

	this._style = {
		...Platform.select({
		ios: {
			transform: [{
				scale: this._active.interpolate({
				inputRange: [0, 1],
				outputRange: [1, 1.1],
				}),
			}],
			shadowRadius: this._active.interpolate({
				inputRange: [0, 1],
				outputRange: [2, 10],
			}),
		},

		android: {
			transform: [{
				scale: this._active.interpolate({
				inputRange: [0, 1],
				outputRange: [1, 1.07],
				}),
			}],
			elevation: this._active.interpolate({
				inputRange: [0, 1],
				outputRange: [2, 6],
			}),
		},
		})
	};
}

getTotalUsd = (rate, amount) => { 
    return Number(rate) * Number(amount)
}

componentWillReceiveProps(nextProps) {
	if (this.props.active !== nextProps.active) {
		Animated.timing(this._active, {
		duration: 300,
		easing: Easing.bounce,
		toValue: Number(nextProps.active),
		}).start();
	}
}

	render() {
		const {item} = this.props;
		if(!item){
				return null;
        }
        if(!item.selected){
            return null
        }
		return(
            <Animated.View style={[
                styles.cryptoList,
                this._style,
            ]}>
               
                <View style={styles.listRow}>
                    <View style={styles.cyptoImage}>
                        <View style={styles.image2}>
                            <Image  style={{width: 30, height: 30}} source={{uri: item.icon}}/>
                        </View>
                            <Text numberOfLines={1} style={styles.right_top_s2}>{item.symbol}</Text>
                    </View>
                    <View style={styles.cyptoTitle}>
                        <Text style={styles.middle_txt_s}>{Math.round(item.price_usd * 1000) / 1000} USD</Text>
                    </View>
                    <View style={styles.right_s}>
                        <Text numberOfLines={1} style={styles.right_top_s}>{item.balance}</Text>
                        <View style={styles.listRow2}>
                            <Text numberOfLines={1} style={{color: colors.textDark, fontFamily: fonts.nunitoLight}}>≈</Text>
                            <Text numberOfLines={1} style={styles.right_bottom_s}>{this.getTotalUsd(item.price_usd, item.balance)} USD</Text>
                        </View>
                    </View>
                </View>
            {/* </TouchableOpacity>   */}

            </Animated.View>
		)
	}
}

export default CurrencyCell;


const styles = StyleSheet.create({

image: {
		width: 35,
		height: 35,
	marginRight: 10,
},

image2: {
    justifyContent: 'flex-start',
    // alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    width: 45,
    borderRadius: 5,
    // paddingRight: 10,
    paddingBottom: 10,
    paddingTop: 10,
},

cryptoList: {
    backgroundColor: '#fff',
    height:80,
    // elevation: 100,
    
},

listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey,
},

listRow2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
},

cyptoImage: {
    padding: 10,
    height: 80,
    width: 80,
    flex: 1,
    flexDirection: 'row',        
    alignItems: 'center',  
    // justifyContent: 'center',     
},

cyptoTitle: {
    flex: 2,
    padding: 10,
    marginLeft: 10,
    justifyContent: 'center',
},

user: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
},


amountTxt: {
    fontSize: 22,
    color: colors.orange,
},	

rowBack: {//need
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    marginBottom: 5,
},

backRightBtnLeft: {
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: colors.lightGrey,
    borderRadius: 25,
    width:90,
    height:30,
    right: 10,
},

middle_txt_s:{
    color: colors.textDark,
    textAlign:'center',
    fontSize:20,
    fontFamily: fonts.nunitoLight
},

right_top_s:{
    color: colors.textDark,       
    fontSize: 12,
    textAlign:'right',
    fontFamily: fonts.nunitoLight
},

right_top_s2:{
    color: colors.textHead,       
    fontSize:20,
    textAlign:'right',
    fontFamily: fonts.nunitoLight
},

right_bottom_s:{
    color: colors.orange,        
    fontSize: 12,
    textAlign:'right',
    fontFamily: fonts.nunitoLight
},

right_s: {
    flex: 1,
    paddingRight: 10,
    paddingBottom: 10,
    paddingTop: 10,
    width:50,
    justifyContent: 'center',
    alignItems: 'flex-end',
},


text: {
	fontSize: 18,
	fontFamily: fonts.nunitoLight
},
})