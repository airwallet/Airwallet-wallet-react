	import React, { Component } from "react";
	import {
		View,
		Text,
		StyleSheet,
		ToastAndroid,
		Platform,
		Image,
		ImageBackground,
		ScrollView,
		TouchableOpacity,
		FlatList
	} from "react-native";
	import Background from "../../components/background";
	import Container from "../../components/Container";

	import SearchBar from "../../components/searchbar";
	import Svg, { Path } from "react-native-svg";
	import { dimensions, colors, fonts } from "../../constants/variables";
	import IosToast from "../../components/customToast";
	import MaterialCommunityIcons from "react-native-vector-icons/dist/MaterialCommunityIcons";
	import Logo from "../../components/logo";
	import SocialButtons from "../../components/socialButtons";
	import SplashScreen from "react-native-splash-screen";
	import { AppName } from "../../components/logo/index";
	import { Languages } from "../../components/Languages/All_languages";
	import Card from "./Card";
	import JButton from "./Button";

	const isIos = Platform.OS === "ios";
	const btn1Border = "#262626";
	const btn2Border = "#262626";

	const headerBg = "#a6a4a4";
	const DATA = [
	{ title: "575", subtitle: "subtitle", footer_title: "Twitch" },
	{ title: "234", subtitle: "subtitle", footer_title: "Twitch" },
	{ title: "234", subtitle: "subtitle", footer_title: "Afreeca" },
	{ title: "676", subtitle: "subtitle", footer_title: "Afreeca" },
	{ title: "456", subtitle: "subtitle", footer_title: "Afreeca" }
	];
	const MediaData = [
	{ title: "Why would a blockchain project deliver free tokens, anyway?", footer_title: "TokenPoint" },
	{ title: "Why would a blockchain project deliver free tokens, anyway?", footer_title: "BlockEco" },
	{ title: "Why would a blockchain project deliver free tokens, anyway?", footer_title: "Forbes" },
	{ title: "Why would a blockchain project deliver free tokens, anyway?", footer_title: "Medium" },
	{ title: "Why would a blockchain project deliver free tokens, anyway?", footer_title: "ABC" }
	];
	const DATA1 = [
	{ product: 'Cystal Pendulum', title: "45 Air", subtitle: "$ 3.25 USD" },
	{ product: 'Pyro Cadle', title: "45 Air", subtitle: "$ 3.25 USD" },
	{ product: 'Cystal Bottal', title: "45 Air", subtitle: "$ 3.25 USD" },
	{ product: 'Cystal Bottal', title: "45 Air", subtitle: "$ 3.25 USD" },
	{ product: 'Cystal Bottal', title: "45 Air", subtitle: "$ 3.25 USD" }
	];
	class More extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	       platform: 'Shopping'
		 }
	}

	showToast(message) {
		if (isIos) {
			this.refs.iosToast.show(message);
		} else {
			ToastAndroid.show(message, ToastAndroid.SHORT);
		}
	}

	render() {
		SplashScreen.hide();
		return (
			<Background style={styles.background}>
			<IosToast positionValue={160} ref="iosToast" />
			<Container style={styles.container}>
				<View style={styles.header}>
					<MaterialCommunityIcons style={styles.mapMarker} name="map-marker" size={35} color="grey"/>
					<Text style={{fontSize: 18}}>S. Korea</Text>
					<MaterialCommunityIcons style={styles.menuDown} name="menu-down" size={35} color="#cccc12"/>
				</View>
				<ScrollView style={styles.scrollView}>
					<View>
						<Text style={styles.title}>On Air</Text>
						<View style={styles.user}>
							<FlatList
								showsHorizontalScrollIndicator={false}
								horizontal={true}
								data={DATA}
								renderItem={({ item }) => (
								<Card
									iconEnable={true}
									data={item}
								/>
								)}
							/>
							<View style={styles.line}>
								<TouchableOpacity>
									<Text style={styles.viewall}>View All</Text>
								</TouchableOpacity>
							</View>
						</View>
						<Text style={styles.title}>Media</Text>
						<View style={styles.user}>
							<FlatList
								showsHorizontalScrollIndicator={false}
								horizontal={true}
								data={MediaData}
								renderItem={({ item }) => (
								<Card
									iconEnable={true}
									fullImage={true}
									data={item}
								/>
								)}
							/>
							<View style={styles.line}>
							<TouchableOpacity>
								<Text style={styles.viewall}>View All</Text>
							</TouchableOpacity>
							</View>
						</View>
						<Text style={[styles.title, { marginBottom: 0 }]}>Platforms</Text>
						<View style={{ justifyContent: "center", alignItems: "center" }}>
							<View style={styles.menus}>
								<JButton onPress = {(platform) => this.setState({platform})} active={this.state.platform} text="Shopping" />
								<JButton onPress = {(platform) => this.setState({platform})} active={this.state.platform} text="Games" />
								<JButton onPress = {(platform) => this.setState({platform})} active={this.state.platform} text="Travel" />
								<JButton onPress = {(platform) => this.setState({platform})} active={this.state.platform} text="Travels" />
							</View>
							<View style={styles.menus}>
								<JButton onPress = {(platform) => this.setState({platform})} active={this.state.platform} text="Market Place" />
								<JButton onPress = {(platform) => this.setState({platform})} active={this.state.platform} text="LifeStyle" />
								<JButton onPress = {(platform) => this.setState({platform})} active={this.state.platform} text="Event" />
								<JButton onPress = {(platform) => this.setState({platform})} active={this.state.platform} text="Hotel" />
							</View>
						</View>
						<View style={[styles.user, { marginTop: 10, paddingLeft: 0 }, ]}>
							<FlatList
								showsHorizontalScrollIndicator={false}
								horizontal={true}
								data={DATA1}
								renderItem={({ item }) => (
								<Card
									titleEnable={true}
									style={{
										borderColor: colors.borderGrey,
										width: 120,
										height: 140,
										margin: 7
									}}
									data={item}
								/>
								)}
							/>
							<View style={[styles.line, { marginBottom: 60 }]}>
							<TouchableOpacity>
								<Text style={styles.viewall}>View All</Text>		
							</TouchableOpacity>
							</View>
						</View>
					</View>
				</ScrollView>
			</Container>
			</Background>
		);
	}
	}

	export default More;

	const styles = StyleSheet.create({
	background: {
		// paddingBottom: 40
	},
	
	container: {
		marginTop: 5,
		padding: 0,
		marginBottom: 100,
		marginBottom: dimensions.bottomTabHeight - 10,
		flex: 1
	},
	viewall: {
		color: colors.orange,
		fontSize: 12
	},

	line: {
		justifyContent: "center",
		alignItems: "flex-end",
		paddingRight: 10,
		height: 30,
		width: "95%",
		marginLeft: 10,
		marginRight: 10,
		marginBottom: 5,
		borderBottomColor: "#ccc",
		borderBottomWidth: 1,
	},

	header: {
		flexDirection: "row",
		paddingHorizontal: 10,
		justifyContent: "center",
		alignItems: "center",
		width: '100%',
		paddingVertical: 10,
		// borderColor: colors.borderGrey,
		// backgroundColor: headerBg,
		// borderWidth: 1,
		// margin: 10,
		// borderRadius: 5,
		// paddingVertical: 5,
		// paddingBottom: 3
	},

	mapMarker: {
		marginRight: 10
	},

	menuDown: {
		marginTop: 5,
	},

	title: {
		fontFamily: fonts.nunitoLight,
		paddingBottom: 5,
		paddingTop: 5,
		paddingLeft: 10,
		fontSize: 15,
		fontWeight: 'bold'
	},
	menus: {
		flexDirection: "row",
		width: "90%",

		justifyContent: "center"
	},

	user: {
		flexDirection: "column",
		alignItems: "center",
		paddingLeft: 10
	},

	amount: {
		justifyContent: "center",
		alignItems: "flex-end"
	},

	userNameTxt: {
		fontSize: 23,
		marginLeft: 10,
		color: "white",
		fontFamily: fonts.nunitoRegular
	},

	amountTxt: {
		fontSize: 22,
		marginTop: 5,
		fontWeight: "bold"
	},

	openButtons: {
		margin: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 15
	},

	whitepaperBtn: {
		width: "48%",
		borderWidth: 1,
		borderColor: btn1Border,
		alignItems: "center",
		justifyContent: "center",
		padding: 10,
		borderRadius: 5,
		flexDirection: "row"
	},

	websiteBtn: {
		width: "48%",
		borderWidth: 1,
		borderColor: btn2Border,
		alignItems: "center",
		justifyContent: "center",
		padding: 10,
		borderRadius: 5,
		flexDirection: "row"
	},

	websiteTxt: {
		color: btn2Border,
		fontFamily: fonts.nunitoRegular
	},

	logoCont: {
		borderColor: colors.borderGrey,
		borderWidth: 1,
		marginHorizontal: 10,
		marginVertical: 5,
		borderRadius: 5
	},

	logoTxt: {
		// color: 'white',
		fontSize: 20,
		fontWeight: "bold"
	},

	logo: {
		paddingVertical: 10,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 20
	},

	shareButton: {
		justifyContent: "flex-end",
		flexDirection: "row",
		paddingRight: 10,
		marginBottom: 20
	},

	notification: {
		borderColor: colors.borderGrey,
		borderWidth: 2,
		borderRadius: 10,
		padding: 10
	},

	card: {
		borderColor: colors.yellow
	}
	});
