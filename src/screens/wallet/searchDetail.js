import React, { Component } from 'react';
import { View, Text, Animated, ListView, StyleSheet, ToastAndroid, Platform, Image, ScrollView, TouchableOpacity } from 'react-native';
import {
    VictoryAxis,
    VictoryChart,
    VictoryGroup,
    VictoryStack,
    VictoryCandlestick,
    VictoryErrorBar,
    VictoryBar,
    VictoryLine,
    VictoryArea,
    VictoryScatter,
    VictoryTooltip,
    VictoryZoomContainer,
    VictoryVoronoiContainer,
    VictorySelectionContainer,
    VictoryTheme,
    VictoryBrushContainer,
    VictoryPie,
    createContainer
  } from "victory-native";
import Background from '../../components/background'
import Container from '../../components/Container'
import SearchBar from '../../components/searchbar'
import { dimensions, colors, deviceDimensions } from '../../constants/variables'
import IosToast from '../../components/customToast'
import { currencies } from '../../constants/currenciesList';
import {Languages} from '../../components/Languages/All_languages'
const options = [
					{"name":"My Account", "key": "myAccount"},
					{"name":"Settings", "key": "settings"},
				]

class searchDetail extends Component {
	constructor(props) {
		super(props);
		const data = props.navigation.getParam('data', '');
		this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
		this.state={
			data: data,
			tro:null,
			top_value:null,
			total_value: null,
			rate: null,
			visibleCurrencyList: false,
			listViewData: currencies,
			order: [ "3", "4", "5", "6", "7", "8", "9", "10", "11", "0", "1", "2"]
		}
		Languages.setLanguage(global.code);
	}
	
	showToast(message) {   
		if(Platform.OS === 'ios'){
			this.refs.iosToast.show(message);
		}else{
			ToastAndroid.show(message, ToastAndroid.SHORT);
		}
	}

	onSelectOption = (index, data) => {
		this.props.navigation.navigate(data.key)
	}

	render() {
		return (
			<Background type="dark" style={styles.background}>
				<IosToast positionValue={160} ref="iosToast"/>
				<Container style={styles.container}>
					<TouchableOpacity onPress={()=>this.props.navigation.navigate('search')}>
						<SearchBar options={options} onSelect={this.onSelectOption}/>
					</TouchableOpacity>
                    <ScrollView style={styles.scrollView}>
                        <View style={styles.content }>
                            <View style={styles.header}>
                                <View style={styles.currencyName}>
                                    {this.state.data.item && 
										<Image style={{height:60,width:60}} resizeMode="contain"  source={this.state.data.item.image} />}
                                    <Text style={{fontSize:20}}>{Languages.ETHEREUM}</Text>
                                </View>
                                <View style={{ backgroundColor: colors.borderGrey, width:1}}/>
                                <View style={styles.currencyRank}>
                                    <View>
                                        <View style={styles.totalAmount} >
                                            <Text style={styles.amountTxt}>$220.76</Text>
                                            <Text style={styles.percentTxt}>+2.58%</Text>
                                        </View>
                                        <View style={{flexDirection:'row'}}>
                                            <Text style={styles.rankTxt}>{Languages.RANK} : </Text>
                                            <Text style={styles.rankValTxt}>2</Text>
                                        </View>
                                    </View>
                                </View>                                
                            </View>
                            <View style={styles.graphCont}>                            
                                <View style={styles.btn}>
                                    <Text style={styles.btnLabel}>{Languages.MARKET_CAP}</Text>
                                    <View style={styles.outlineBtn}>
                                        <Text numberOfLines={2} style={styles.btnTxt}>$4,990,993,413</Text>
                                    </View>
                                </View>
                                <View style={styles.btn}>
                                    <Text style={[styles.btnLabel, {color: '#61ab20'}]}>24h Vol.</Text>
                                    <View style={[styles.outlineBtn, {borderColor: '#61ab20',}]}>
                                        <Text numberOfLines={2} style={[styles.btnTxt, {color: '#61ab20'}]}>$4,990,993,413</Text>
                                    </View>
                                </View>
                                <View style={styles.btn}>
                                    <Text style={[styles.btnLabel, {color: colors.info}]}>{Languages.CRIC_SUPPLY}</Text>
                                    <View style={[styles.outlineBtn, {borderColor: colors.info}]}>
                                        <Text  numberOfLines={2} style={[styles.btnTxt, {color: colors.info}]}>101,134,767</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.graph}>
                                <VictoryChart  height={200} theme={VictoryTheme.material} >
								<VictoryStack>
                                    <VictoryLine style={{data: {stroke: "yellow", strokeWidth: 2}}}
                                        data={[
                                            {x: 0, y: 1},
                                            {x: 1, y: 3},
                                            {x: 2, y: 2},
                                            {x: 3, y: 4},
                                            {x: 4, y: 3},
                                            {x: 5, y: 5}
                                        ]}
                                    />
									<VictoryLine style={{
										data: {stroke: "red", strokeWidth: 2},
										parent: { border: "1px solid #ccc"}
									}}
                                        data={[
                                            {x: 0, y: 0},
                                            {x: 2, y: 1},
                                            {x: 2, y: 2},
                                            {x: 3, y: 3},
                                            {x: 5, y: 4},
                                            {x: 5, y: 5}
                                        ]}
                                    />
									</VictoryStack>
                                </VictoryChart>
                            </View>
                            <TouchableOpacity onPress={() => this.showToast('Information')} activeOpacity={0.6} style={[styles.outlineBtn, styles.infoBtn]}>
                                <Text numberOfLines={1} style={[styles.btnTxt, styles.infoTxt]}>{Languages.INFORMATION}</Text>
                            </TouchableOpacity>
                            <View style={styles.description}>
                                <Text style={styles.descTxt}>  
								{Languages.ETHEREUM_TEXT}
								</Text>
                            </View>
                        </View>                    
                    </ScrollView>
				</Container>
			</Background>
		);
	}
}

const styles = StyleSheet.create({

	container: {
		marginTop: 15,
		padding: 0,
		marginBottom: (dimensions.bottomTabHeight - 10),
		flex: 1,
	},

	scrollView: {
		paddingBottom: 20,
	},
	
	content: {
		backgroundColor: 'white',
		flex: 1, 
		padding: 5, 
		marginTop: 20,
	},

	header: {
		flexDirection: 'row',
		alignContent: 'center',
		height: 100, 
		marginBottom: 20,
	},

	currencyName: {
		flexDirection: 'column',
		flex:1, 
		justifyContent: 'center',
		alignItems: 'center',
	},

	currencyRank: {
		flexDirection: 'column',
		flex:1, 
		justifyContent: 'center',
		alignItems: 'center',
	},

	totalAmount: {
		flexDirection: 'row', 
		marginBottom: 20,
	},

	amountTxt: {
		fontSize: 20, 
		fontWeight: 'bold',
		color: 'black',
	},

	percentTxt: {
		fontSize: 12,
		color: '#33cc33',
	},

	rankTxt: {
		fontSize: 20,
		color: 'black',
	},

	graphCont: {
		flexDirection: 'row', 
		justifyContent: 'space-between',
	},

	btn: {
		flexDirection: 'column', 
		flex:1,
		margin: 5
	},

	btnLabel: {
		paddingHorizontal: 5,
		paddingBottom: 2,
	},

    outlineBtn:{
        margin:1,
        borderColor: 'grey',
        borderWidth: 1,
        backgroundColor: '#fff',
        borderRadius: 4,
        padding: 5,
		
		alignItems: 'center',
        justifyContent: 'center',
    },

    btnTxt:{
		flex:1,
		color: '#262626',
		textAlign: 'center',
		height: '100%',
		fontSize: 13,
	},
	
	infoBtn: {
		borderColor: colors.info,
		padding: 7,
		marginHorizontal: 5
	},

	infoTxt: {
		justifyContent: 'center',
		alignItems: 'center',
		color: colors.info,
		fontSize: 17
	},

	rankValTxt: {
		fontSize: 20,
		color: 'black',
	},

	graph: {
		height: 150 , 
		marginTop: -20,
		marginBottom: 50,
	},

	description: {
		marginHorizontal: 5,
		marginVertical: 10,
		marginBottom: 20,
	},

	descTxt: {
		fontSize: 17,
		textAlign: 'justify',
		color: colors.darkGrey,
	}


})

export default searchDetail;