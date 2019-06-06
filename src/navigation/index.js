import React from 'react';
import { View, Text } from 'react-native'
import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';
import ProjectPageIntro from '../screens/airdrop/projectPageIntro';
import BottomTabBar from '../components/bottomTabBar';
import { AuthNavigation } from '../screens/auth';
import { WalletNavigation } from '../screens/wallet';
import { AirDropNavigation } from '../screens/airdrop';
import { ExchangesNavigation } from '../screens/exchanges';
import { MoreNavigation } from '../screens/more_old';
import CyptoTransationDetail from '../screens/wallet/transactionDetail';
import AuthStatus from '../screens/auth/authStatus';
import CreateBinanceConnection from '../screens/exchanges/createConnection/createBinanceConnection';
import CreateOkexConnection from '../screens/exchanges/createConnection/createOkexConnection';
import CreateCoinbaseConnection from '../screens/exchanges/createConnection/createCoinbaseConnection';
import CreateKucoinConnection from '../screens/exchanges/createConnection/createKucoinConnection';


const TabNavigation = createBottomTabNavigator({
	wallet: WalletNavigation,
	exchanges: ExchangesNavigation,
	airDrop: AirDropNavigation,
	more: MoreNavigation,
},
	{
		initialRouteName: 'wallet',
		tabBarComponent: (props) => { return <BottomTabBar {...props} /> },
	})

const SwitchNavigation = createSwitchNavigator(
	{
		AuthStatus: AuthStatus,
		Tab: TabNavigation,
		Auth: AuthNavigation,
	},
	{
		initialRouteName: 'AuthStatus',
	}
);

export const RootNavigation = createStackNavigator(
	{
		switch: SwitchNavigation,
		projectIntro: ProjectPageIntro,
		cyptoTransationDetail: CyptoTransationDetail,
		createBinanceConnection: CreateBinanceConnection,
		createOkexConnection: CreateOkexConnection,
		createCoinbaseConnection: CreateCoinbaseConnection,
		createKucoinConnection: CreateKucoinConnection,
	},
	{
		navigationOptions: {
			header: null
		},
	}
)