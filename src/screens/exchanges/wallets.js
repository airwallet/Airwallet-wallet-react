import React, { Component } from 'react';
import { View, Text, Animated, ListView, StyleSheet, ToastAndroid, Platform, Image, ScrollView, TouchableOpacity } from 'react-native';
import Background from '../../components/background'
import Container from '../../components/Container'
import SearchBar from '../../components/searchbar'
import { dimensions, colors, deviceDimensions } from '../../constants/variables'
import IosToast from '../../components/customToast'
import AllCurrenciesList from '../../components/currenciesList';
import { walletsList } from '../../constants/walletsList';
import ListCell from './listCell';
import Header from '../../components/innerHeader';
import AddButton from '../../components/CricleImgBorder'
import { getAsyncStorage, getMultiAsyncStorage } from '../../utils/asyncStorage';
import { USER_DATA, USER_ID, ENDPOINTS, ACCESS_TOKEN, EXCHANGES } from '../../constants/api';
import { GET, POST } from '../../utils/api/Request';
import Loader from '../../components/loader';
import { Languages } from '../../components//Languages/All_languages'
import { showNotification } from '../../utils/showNotification';
import AllExchangeChart from './allExchangeChart';

class Wallets extends Component {
	constructor(props) {
		super(props);
		this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
		this.state = {
			rate: null,
			visibleCurrencyList: false,
			order: this.getListOrder(walletsList),
			collapsed: '',
			isFetching: false,
			exchanges: {},
			loginExchanges: [],
			currenciesList: []
		}
		Languages.setLanguage(global.code);
	}

	showToast(message) {
		if (Platform.OS === 'ios') {
			this.refs.iosToast.show(message);
		} else {
			ToastAndroid.show(message, ToastAndroid.SHORT);
		}
	}

	getListOrder = (data) => {
		let order = [];
		data.sort((a, b) => a.name.localeCompare(b.name))
		data.map((item, index) => {
			order.push(index)
		})
		return order;
	}

	toggleCurrenciesList = (value) => {
		this.setState({ visibleCurrencyList: value })
	}

	onChangeOrder = (order) => {
		console.log('order', order)
		this.setState({ order })
	}

	orderData = (data) => {
		const Data = [];
		const { order } = this.state;
		order.map((item, index) => {
			Data.push(data[Number(item)])
		})
		return Data;
	}

	componentWillMount() {
		this.getExchangeData(walletsList);
	}

	getExchanges = () => {
		getAsyncStorage(USER_DATA).then(data => {
			let userData = JSON.parse(data)
			if (userData) {
				const config = {
					headers: { Authorization: 'bearer ' + userData[ACCESS_TOKEN] },
					// params: { userId: userData[USER_ID] },
					data: {loginExchanges: this.state.loginExchanges}
				}

				POST(ENDPOINTS.GET_EXCHANGES, config)
					.then(res => {
						console.log('getExchanges', res)
						this.setState({ isFetching: false, exchanges: res.data && res.data.exchanges })
					})
					.catch(error => {
						this.setState({ isFetching: false })
						console.log(error)
						showNotification(error.response);
					})
			} else {
				this.setState({ isFetching: false });
			}
		})
	}

	getExchangeData = (walletsList) => {
		let currenciesList = [];
		let itemKeys = [];
		let storageKeys = [];

		if (walletsList.length) {
			let orderedData = this.orderData(walletsList);
			currenciesList = orderedData.filter((item) => item.selected && item.selected);
			storageKeys = currenciesList.map(item => EXCHANGES[item.key]);
			itemKeys = currenciesList.map(item => item.key);
		}

		getMultiAsyncStorage(storageKeys, (err, data) => {
			let loginExchanges = [];
			data.map((item, index) => {
				const loginData = item[1] ? JSON.parse(item[1]) : {};
				const signin = item[1] ? true : false;
				currenciesList[index] = {...currenciesList[index], signin, loginData}
				if(signin){
					loginExchanges.push(currenciesList[index].name.toLowerCase())
				}
			})
			this.setState({currenciesList, loginExchanges}, () => this.getExchanges())
		})		
	}

	getChartData = (exchanges) => {
		let chartData = [];
		let totalBalance = 0;
		let totalBtc = 0;
		exchanges.map(exch => {
			let lastData = {};
			if(exch.data.length){
				lastData = exch.data[exch.data.length - 1]
			}
			chartData.push({name: exch.name, ...lastData});
			totalBalance += lastData.totalAmount;
			totalBtc += lastData.btc_price;
		})
		return {data: chartData, totalBalance, totalBtc};
	}

	getExchangeChartData = (exchanges) => {
		let exchangeChart = {};
		exchanges.map(item => {
			exchangeChart[item.name] = item.data;
		})
		return exchangeChart;
	}

	render() {
		const { isFetching, exchanges, currenciesList } = this.state;
		
		let chartData = {};
		let exchangeChart = {};
		if(exchanges.length){
			chartData = this.getChartData(exchanges)
			exchangeChart = this.getExchangeChartData(exchanges)
		}

		return (
			<Background style={styles.background}>
				<IosToast positionValue={160} ref="iosToast" />
				<TouchableOpacity onPress={() => this.props.navigation.navigate('search')}>
				</TouchableOpacity>
				<Container style={styles.container}>
					<AllCurrenciesList
						data={walletsList}
						visible={this.state.visibleCurrencyList}
						onRequestClose={this.toggleCurrenciesList}
						onChangeOrder={this.onChangeOrder}
						order={this.state.order}
					/>

					<ScrollView style={styles.scrollView}>
						<AllExchangeChart isFetching = {isFetching} data = {chartData} />
						<View style={styles.content} >
							{/* <Header amount={totalUsd + ' USD'} /> */}
							{!isFetching ? currenciesList.map((item, index) => {
								return <ListCell
									key={item.name}
									item={item}
									chartData = {exchangeChart[item.name]}
									{...this.props}
								/>
							}) :
								<Loader loadingTxt=" " style={{ height: '50%' }} />
							}
						</View>
						{!isFetching && <AddButton
							title={Languages.ADD_EXCHANGE}
							onPress={() => this.toggleCurrenciesList(true)}
							style={{ marginVertical: 30 }}
						/>}
					</ScrollView>
				</Container>
			</Background>
		);
	}
}



const styles = StyleSheet.create({
	container: {
		marginTop: 5,
		padding: 0,
		marginBottom: (dimensions.bottomTabHeight - 10),
		flex: 1,
	},

	scrollView: {
		paddingBottom: 20,
		height: '100%'
	},

	content: {
		flex: 1,
		height: '100%',
	},
})

export default Wallets;