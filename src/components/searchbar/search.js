import React, { Component } from 'react';
import { View, Text, Animated, ListView, StyleSheet, TextInput, Platform, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import PopView from '../../components/popView';
import SearchBar from '../../components/searchbar';
import { colors, fonts, dimensions } from '../../constants/variables';
import Icon from 'react-native-vector-icons/dist/Feather';
import { currencies } from '../../constants/currenciesList';

const isIos = Platform.OS === 'ios';

class Search extends Component {
	constructor(props) {
		super(props);
		this.state={
			searchTxt: '',
		}
	}
	render() {
		const { searchTxt } = this.state;
		let currenciesList = [];
		if(searchTxt){
			currencies.map(item => {
				if(item.name.toLowerCase().indexOf(searchTxt.toLowerCase()) !== -1){
					currenciesList.push(item)
				}
			})
		}else{
			currenciesList = currencies
		}
		return (
			<PopView 
				{...this.props}
				style={styles.container}
			>
				<View style={styles.content}>
					<View style={styles.searchInput}>
						<TouchableOpacity activeOpacity={0.6} onPress={this.props.onRequestClose} >
							<Icon style={styles.backIcon} name="arrow-left" size={25} color= "black"/>
						</TouchableOpacity>
						<TextInput 
							style={styles.input} 
							placeholder = "Coin Information" 
							autoFocus
							onChangeText={(text)=> this.setState({searchTxt: text})}
						/>
					</View>
					<ScrollView style={styles.scrollView}>
						<View style={styles.results}>
							{currenciesList.length ? currenciesList.map((item, index)=>{
								return <TouchableOpacity key={item.key} onPress={this.props.onRequestClose} style={styles.itemRow}>
											<Image source={item.image} style={styles.image} />
											<Text style={styles.title}>{item.name}</Text>
										</TouchableOpacity>
							}) : 
							<View style={styles.noResult}>
								<Text style={styles.noResultTxt}>Sorry! No Coin found.</Text>
							</View>
						}
						</View>
					</ScrollView>
				</View>
				
			</PopView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex:1,
		width: '100%',
	},	

	scrollView: {
		backgroundColor: 'white',
	},

	content: {
		flex: 1,
        width: '100%',
		paddingTop: isIos ? 30 : 0,
		backgroundColor: '#747474',
		paddingTop: isIos ? (dimensions.topSpace + dimensions.topExtraSpace) : dimensions.topExtraSpace,
	},

	searchInput: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
		paddingLeft: 5,
        position: 'relative',
        left: 0,
        right: 0,
        top: isIos ? -10 : -5,
        zIndex: 100,
		marginHorizontal: 10,
		marginTop: 5,
	},
	
	backIcon: {
		paddingRight: 10
	},

	input: {
		flex: 1,

		padding: isIos ? 7 : 3,
		// paddingHorizontal: 7,
        // paddingVertical: 7,
		fontFamily: fonts.nunitoLight
	},

	results: {
		flex: 1,
		width: '100%',
	},

	itemRow: {
		padding: 10,
		flexDirection: 'row',
		alignItems: 'center',
	},

	image: {
		height: 25,
		width: 25,
		resizeMode: 'contain',
		marginRight: 10,

	},

	title: {
		fontSize: 16,
	},
	 
	noResult: {
		alignItems: 'center', 
		padding: 10,
	},
	
	noResultTxt: {
		fontSize: 20,
		color: colors.lightGrey,
	}
	
})

export default Search;