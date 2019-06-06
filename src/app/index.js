
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { RootNavigation } from '../navigation';
import SplashScreen from 'react-native-splash-screen';
import DropdownAlert from 'react-native-dropdownalert';


export default class MainApp extends Component {
	componentDidMount() {
		SplashScreen.hide();
	}
	render() {
		return (
			<View style={{ flex: 1, height: '100%' }}>
				<RootNavigation />
				<DropdownAlert
					ref={(ref) => global.dropdown = ref}
					closeInterval={7000}
					updateStatusBar={false}
					safeAreaStyle={style.safeArea}
					defaultTextContainer={{ justifyContent: 'center', marginLeft: 5 }}
					imageStyle={{ height: 24, width: 24, marginTop: 4 }}
				/>
			</View>
		)
	}
}
const style = StyleSheet.create({
	safeArea: {
		marginTop: (Platform.OS === 'ios') ? 10 : 30,
		justifyContent: 'center',
		flexDirection: 'row'
	}
})
