import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Platform, Image, Switch, Easing, Animated  } from 'react-native';
import { colors, fonts } from '../../constants/variables';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

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
		return(
				<Animated.View style={[
					styles.row,
					this._style,
				]}>
					<View style={{flexDirection: 'row', alignItems: 'center'}}>
						<MaterialCommunityIconsIcon size={25} name="menu" style={{marginRight: 10}}/>
						<Image source={item && item.image} style={styles.image} />
						<Text style={styles.text}>{item && item.name}</Text>
					</View>
					<View>
						<Switch onValueChange={(value) => this.props.onToggleSelect(value, item.key)} value={item && item.selected}/>
					</View>
				</Animated.View>
		)
	}
}

export default CurrencyCell;


const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		padding: 10,
		justifyContent: 'space-between',
		alignItems: 'center',
		borderBottomColor: colors.borderGrey,
		borderBottomWidth: 1,
		backgroundColor: 'white',
	},

image: {
		width: 35,
		height: 35,
	marginRight: 10,
},

text: {
	fontSize: 18,
	fontFamily: fonts.nunitoLight
},
})