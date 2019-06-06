import React, { Component } from 'react';
import { 
	View, 
	Text, 
	Animated, 
	ListView, 
	StyleSheet, 
	ToastAndroid, 
	Platform
} from 'react-native';
import Background from '../../../components/background'
import Container from '../../../components/Container'
import SearchBar from '../../../components/searchbar'
import { dimensions, deviceDimensions, colors } from '../../../constants/variables'
import IosToast from '../../../components/customToast';
import AllCurrenciesList from '../currencyList';
import { currencies } from '../../../constants/currenciesList';
import Header from '../../../components/innerHeader';
import Tokens from '../tokens';
import { connect } from 'react-redux';
import { setHomeActive, setWalletData, setBalances, setRates } from '../../../actions/wallet';
import { icoList } from '../../../constants/icoList';
import SwipList from './swipList';
import SortList from './sortList';
import { GET } from '../../../utils/api/Request';
import { removeAsyncStorage, setAsyncStorage, getMultiAsyncStorage,  removeMultiAsyncStorage, clearAsyncStorage} from '../../../utils/asyncStorage';
import { ACCESS_TOKEN, ENDPOINTS, ALL_WALLETS, USER_ID, USER_DATA, BACKUP_PHRASE, PIN, BALANCES, RATES } from '../../../constants/api';
import Loader from '../../../components/loader';
import {Languages} from '../../../components/Languages/All_languages'
import { showNotification} from '../../../utils/showNotification'
const DEVICE_WIDTH = deviceDimensions.width;
const isIos = Platform.OS === 'ios';

class Home extends Component {
	constructor(props) {
		super(props);
		this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
		this.state={
			top_value:null,
			visibleCurrencyList: false,
			listViewData: currencies,
			order: [],
			active: 'wallet',
			sortEnable: false,
			walletFetching: false,
			allWallets: [],
			userData: {},
			fetchingLocal: true,
			priceFetching: false,
			curreciesFetching: true,
			balancesFetching: true,
			allCurrencies: [],
			balances : [],
			rates: [],
		}
		Languages.setLanguage(global.code);
		//this.socket = global.socket;
	}


	componentWillMount() {
		this.animatedValue = new Animated.Value(0);
		this.value = 0;
		this.animatedValue.addListener(({ value }) => {
		  this.value = value;
		})
		this.frontInterpolate = this.animatedValue.interpolate({
		  inputRange: [0, 180],
		  outputRange: ['0deg', '180deg'],
		})
		this.backInterpolate = this.animatedValue.interpolate({
		  inputRange: [0, 180],
		  outputRange: ['180deg', '360deg']
		})
		this.walletOpacity = this.animatedValue.interpolate({
		  inputRange: [89, 90],
		  outputRange: [1, 0]
		})
		this.tokenOpacity = this.animatedValue.interpolate({
		  inputRange: [89, 90],
		  outputRange: [0, 1]
		})

	getMultiAsyncStorage([USER_DATA, ALL_WALLETS, BALANCES, RATES], (err, data) => {
		this.setState({fetchingLocal: false})
		let userData = data[0][1] ? JSON.parse(data[0][1]) : {};
		let allWallets = data[1][1] ? JSON.parse(data[1][1]) : [];
		let balances = data[2][1] ? JSON.parse(data[2][1]) : [];
		let rates = data[3][1] ? JSON.parse(data[3][1]) : [];
		//this.connectSocket(userData[ACCESS_TOKEN])
		this.setState({
			userData, 
			allWallets,
			balances,
			rates}, () => this.getAllWallet())
		})
	}

	connectSocket = (token) => {
		console.log('this.socket', this.socket)
		global.socket.emit('Logged_In_User', token)
		global.socket.on('User_Balances', (balances) => this.balancesListener(balances));
		global.socket.on('CoinPayment_Rates', (rates) => this.coinRatesListener(rates));
	}

	balancesListener = (balances) => {
		console.log('User_Balances', balances);
		this.props.setBalances(balances);
		setAsyncStorage(BALANCES, JSON.stringify(balances))
	}

	coinRatesListener = (rates) => {
		console.log('CoinPayment_Rates', rates)
		this.props.setRates(rates);
		setAsyncStorage(RATES, JSON.stringify(rates))
	}

	componentWillReceiveProps(nextProps){
		const { rates, balances } = nextProps;
		if(nextProps.homeStatus.fromtab){
			this.toggleTokens();
		}

		this.setState({balances, rates})
	}

	getBalances = (config) => {
		GET(ENDPOINTS.GET_BALANCES, config)
			.then(res => {
				console.log('balances RES', res)
				const balances = res.data;
				this.setState({balances, balancesFetching: false})
				setAsyncStorage(BALANCES, JSON.stringify(balances))
			})
			.catch(error => {
				console.log(error)
				this.setState({balancesFetching: false})
				showNotification(error.response);
			})
	}

	getAllWallet = () => {
		const { userData } = this.state;
		
		// console.log('userData', userData)
		this.setState({walletFetching: true, balancesFetching: true})
		if(userData[USER_ID]){
			const config = {
				headers: {Authorization: 'bearer ' + userData[ACCESS_TOKEN]}
			}
			this.getBalances(config);
			GET(ENDPOINTS.GET_INITIAL_INFO, config)
				.then(res => {
					console.log('allwallets RES', res)
					const allWallets = res.data;
					this.setState({walletFetching: false, allWallets})
					let wallets = res.data;
					setAsyncStorage(ALL_WALLETS, JSON.stringify(wallets))
				})
				.catch(error => {
					this.setState({walletFetching: false})
					console.log(error)
					showNotification(error.response);
				})
		}else{
			this.showToast(Languages.ERROR_OCCURED)
			setTimeout(()=>{ this.setState({walletFetching: false})}, 3000);
		}
	}

	  toggleTokens = () => {
          if(this.state.sortEnable){
            //
          }else{
            if (this.value >= 90) {
                this.props.setHomeActive({active: 'wallet', fromtab: false})
            Animated.spring(this.animatedValue,{
                toValue: 0,
                friction: 8,
                tension: 10
            }).start();
            } else {
                this.props.setHomeActive({active: 'token', fromtab: false})
            Animated.spring(this.animatedValue,{
                toValue: 180,
                friction: 8,
                tension: 10
            }).start();
            }
        }
	  }
	
	showToast(message) {   
		if(Platform.OS === 'ios'){
			this.refs.iosToast.show(message);
		}else{
			ToastAndroid.show(message, ToastAndroid.SHORT);
		}
	}

	onSend = (rowKey, rowMap, toValue)=> {
		// console.log('openDetail', rowKey, rowMap, toValue)
		const { allWallets } = this.state;
		const selectedWallet = allWallets.filter(wallet => wallet.symbol === rowKey)
		const data = selectedWallet.length && selectedWallet[0]
		this.props.navigation.navigate('sendCrypto', {data})
	}

	fadeOut=(rowKey, rowMap,toValue)=> {
		if(rowKey!=null){
			var index=Number(rowKey);    
			const z = this.state.listViewData;
			this.setState({ listViewData: z, top_value: null})
		}								
	}

	closeRow(rowMap, rowKey) {
		if (rowMap[rowKey]) {
			rowMap[rowKey].closeRow();
		}
	}

	onSelectOption = (index, data) => {
		if(data.key === 'sort'){
			this.setState({sortEnable: !this.state.sortEnable})
		}else if(data.key === 'logout'){
			clearAsyncStorage(() => this.props.navigation.navigate('Auth'));
		}else{
			this.props.navigation.navigate(data.key)
		}
	}

	toggleCurrenciesList = (value) => {
		this.setState({visibleCurrencyList: value})
		this.getAllWallet();
	}

	onChangeOrder = (order) => {
		this.setState({order})
	}

	orderData = (data) => {
		const Data = [];
		const { order } = this.state;
		order.map((item, index) => {
			Data.push(data[Number(item)])
		})
		return Data;
	}

	filterWallets = (allWallets) => {
		let { balances, rates } = this.state;

        allWallets.map(wallet => {
			wallet.key = wallet.symbol
			if(balances.length){
				const filters = balances.filter(item => item.symbol === wallet.symbol);
				if(filters.length) {
					wallet.balance = filters[0].balance;
				}
			}
			// if(rates.length){
			// 	const filters = rates.filter(item => item.symbol === wallet.symbol);
			// 	if(filters.length) {
			// 		wallet.price_usd = filters[0].price_usd;
			// 	}
			// }
		});
		return allWallets;
	}

	render() {
		let { 
			visibleCurrencyList, userData,
			priceFetching, sortEnable, 
			walletFetching, allWallets, fetchingLocal,
			allCurrencies, curreciesFetching, balancesFetching
		 } = this.state;
		const { homeStatus } = this.props;
		const active = homeStatus.active
		let currenciesList = [];
		let totalUsd = 0;
		let tokenData = [];

		if(allWallets.length){
			allWallets.map((item)=>{
				const { balance, price_usd } = item;
				totalUsd += Number(balance * price_usd)
			})
			totalUsd = Math.round(totalUsd * 100) / 100
		}

		const walletAnimatedStyle = {
			transform: [
			  { rotateY: this.frontInterpolate }
			]
		  }
		  const tokenAnimatedStyle = {
			transform: [
			  { rotateY: this.backInterpolate }
			]
		  }

		  if(icoList.length){
			tokenData = icoList.sort((a, b) => a.name.localeCompare(b.name))
		  }

		  if(active !== 'wallet' && icoList.length){
			  totalUsd = 0
			  tokenData.map((item) => {
				  totalUsd += Number(item.amount)
			  })
		  }

		  allWallets = allWallets.filter(wallet => wallet.addresses.length)

		  allWallets = this.filterWallets(allWallets);
		  
          
        const options = [
            {"name":"My Account", "key": "myAccount"},
						{"name":"Settings", "key": "settings"},
						{"name":"Logout", "key": "logout"},
        ]

        // if(!sortEnable && allWallets.length > 1 && active === 'wallet'){
        //     options.push({"name":"Sort", "key": "sort"})
		// }
		
		const updating = (walletFetching || priceFetching || balancesFetching);

		return (
			<Background type="default" style={styles.background}>
				<IosToast positionValue={160} ref="iosToast"/>
				<SearchBar 
					options={options} 
					onSelect={this.onSelectOption}
				/>
			
				<AllCurrenciesList 
					loading = {curreciesFetching}
					visible={visibleCurrencyList}
					onRequestClose = {this.toggleCurrenciesList}
					onChangeOrder= {this.onChangeOrder}
					order={this.state.order}
					userData = {userData}
					selected = {allWallets}
				/>
			 
				<Container style={styles.container}>		
					<Header 
						showLogo={true} 
						logoPress={() => this.toggleTokens()} 
						amount={totalUsd+ ' USD'} 
						totalTxt="TOTAL" 
					/>
                    
					<View>
					
            <Animated.View style={[walletAnimatedStyle, { marginBottom: dimensions.bottomTabHeight + 80},  {opacity: this.walletOpacity}]}>
					   {!fetchingLocal ? sortEnable ? 
					  
                        <SortList
                            data={allWallets} 
                            visible={visibleCurrencyList} 
                            onRequestClose = {this.toggleCurrenciesList}
                            onChangeOrder= {this.onChangeOrder}
                            order={this.state.order}
                            onSortDone = {() => this.setState({sortEnable: false})}
                        />
						:
						
                        <SwipList
                            homeStatus={this.props.homeStatus}
                            currenciesList={allWallets}
                            openDetail={this.onSend}
                            fadeOut={this.fadeOut}
                            navigation={this.props.navigation}
							toggleCurrenciesList={this.toggleCurrenciesList}
							updating={updating}
                        /> : <Loader style={{height: '50%', flex:0}} loadingTxt=" "/>
					   }
					   
                    	</Animated.View>
							<Animated.View style={[styles.tockenStyle, tokenAnimatedStyle, {zIndex: active === 'wallet' ? -1 : 1 }, {opacity: this.tokenOpacity}]}>
							<Tokens tokens={tokenData}/>
						</Animated.View>
					
					</View>
					
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
		height: '100%',
	},

	tockenStyle: {
		width: '100%',
		position: "absolute",
		top: 0,
		height: '100%',
      },
})

const mapStateToProps = (state) => ({
	homeStatus: state.wallet.get('homeStatus'),
	balances: state.wallet.get('balances'),
	rates: state.wallet.get('rates'),
  });
  
export default connect(mapStateToProps, { setHomeActive, setBalances, setRates })(Home);
  