import React, { Component } from 'react';
import { 
	View, Text, TextInput, StyleSheet, 
	Platform, TouchableOpacity, PixelRatio, 
	KeyboardAvoidingView, ToastAndroid
} from 'react-native';
import { colors, fonts, dimensions } from '../../../constants/variables';
import Background from '../../../components/background';
import Container from '../../../components/Container';
import BottomButton from '../../../components/bottomButton';
import FontAwesomeIcon from 'react-native-vector-icons/dist/FontAwesome';
import { Codes } from '../../../components/staticContent/conutryCode';
import CountryPicker from 'react-native-country-picker-modal';
import IosToast from '../../../components/customToast';
import { getAsyncStorage } from '../../../utils/asyncStorage';
import { USER_DATA, USER_ID, ENDPOINTS, ACCESS_TOKEN } from '../../../constants/api';
import { GET, POST } from '../../../utils/api/Request';
import KeyboardListener from '../../../components/keyboardListener';
import { ifIphoneX } from '../../../utils/isIphoneX';
import {Languages} from '../../../components/Languages/All_languages';  
let isIos = Platform.OS === 'ios';
const fontFamily = fonts.nunitoLight;

class PhoneRegistration extends Component {
	constructor(props) {
		super(props);
		this.state={
			countryName: '',
			mobileNumber: '',
			cca2: '',
			countryName: '',
			dialCode: '+1',
			error: '',
			loading: false,
		}
		Languages.setLanguage(global.code);
	}

	onChangeCountry = (country) => {
		const dialCode = '+'+country.callingCode
		this.setState({ cca2: country.cca2, countryName: country.name, dialCode});
	}

	showToast(message) {   
        if(Platform.OS === 'ios'){
            this.refs.iosToast.show(message);
        }else{
            ToastAndroid.show(message, ToastAndroid.SHORT);
        }
    }
  
	onContinue = () => {
		const { dialCode, mobileNumber } = this.state;
		const paramData = this.props.navigation.getParam('userData', '')
		const phone = dialCode+mobileNumber;
		if(!dialCode){
			this.setState({error: Languages.PLEASE_SELECT_COUNTERY})
			return
		}else if(mobileNumber.length < 10){
			this.setState({error: Languages.NUMBER_NOT_VALID})
			return
		}

		getAsyncStorage(USER_DATA).then(data => {
			let userData = JSON.parse(data)
			const accessToken = paramData ? paramData[ACCESS_TOKEN] : userData[ACCESS_TOKEN];
			this.setState({loading: true})
			if(accessToken){
				const config = {
					headers: {Authorization: 'bearer ' + accessToken},
					data: { phone }
				}
	
				POST(ENDPOINTS.PHONE_VERIFICATION_REQUEST, config)
				.then(res => {
					console.log('phoneRegistration request', res)
					this.setState({loading: false})
					this.props.navigation.navigate('phoneVerification', {data: config})
				})
				.catch(error => {
					this.setState({loading: false})
					console.log(error)
				})
			}else{
				this.setState({loading: false});
			}
		})
	}

	onNumberChange = (num) => {
		if (/^\d+$/.test(num)) {
			this.setState({
			  mobileNumber: num
			});
		  }else{
			  this.showToast(Languages.ONLY_NUMBER_ALLOW)
		  }
	}

	renderContent = () => {
		
		return <View style={{height: '100%'}}>
				
		</View>
	}

	render() {
		const { dialCode, countryName, error, loading } = this.state;
		const numberInput = {
			width: dialCode ? '85%' : '100%'
		}

		return (
			<Background smallTopMargin type="light">
				<IosToast positionValue={160} ref="iosToast"/>
				<TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <FontAwesomeIcon style={styles.backBtn} name="angle-left" size={35} color="black" />
                </TouchableOpacity>
				<Container style={[styles.container, this.props.style]}>
					<View style={styles.header}>
						<Text style={styles.headerTxt}>{Languages.WHAT_IS_PHONE_NO}</Text>
					</View>
				
				<View>
						<View style={[styles.mobileInput]}>
						<CountryPicker
						filterable={true}
						countryList={Codes}
						onChange={value => this.onChangeCountry(value)}
						cca2={this.state.cca2}
						translation="eng"
						showCallingCode={true}
						closeable={true}
						filterPlaceholder={Languages.COUNTEY_NAME}
						animationType="slide"
						closeButtonImage={require('../../../images/back_img.png')}
						transparent={true}
						styles={{itemCountryName: styles.itemCountry, countryName: {fontFamily}, input: {fontFamily}, letterText: {fontFamily}}}
						>
							{dialCode ? <Text style={styles.countryCode}>{dialCode}</Text> : null}
						</CountryPicker>
							<TextInput 
								style={[styles.inputBox, numberInput]}
								placeholder={Languages.MOBILE}
								onChangeText={this.onNumberChange}
								keyboardType='numeric'
								value={this.state.mobileNumber}
							/>
						</View> 
					
				</View>
				
				{error ? <Text style={styles.error}>{error}</Text> : null}
			</Container>
			<BottomButton loading={loading}>
					<TouchableOpacity onPress={this.onContinue} activeOpacity={0.6} style={styles.bottomButton}>
						<Text style={styles.continueTxt}>{Languages.CONTINUE}</Text>
					</TouchableOpacity>
			</BottomButton>
			</Background>
		);
	}
}

export default PhoneRegistration;


const styles = StyleSheet.create({
	container: {
		// marginTop: 15,
		padding: 20,
	},
	
	header: {
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		marginBottom: 20,
	},

	headerTxt: {
		fontSize: 24,
		color: '#000',
		fontFamily: fonts.exoSemiBold,
	},

	mobileInput: {
		width:'100%',
		borderWidth: 1,
        borderColor: colors.borderGrey,
        borderRadius: 50,
        backgroundColor: colors.insideGrey,  
		flexDirection: 'row',
		paddingLeft: 10,
		marginTop: 15,
		height: 40,
		alignItems: 'center',
	},

	inputBox: {
		width:'85%',
		paddingVertical:10,
		height: 40,
		fontFamily: fonts.nunitoLight,
		paddingHorizontal: 10
	},

	bottomButton: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 5,
		height: dimensions.bottomButtonHeight,
		width: '100%',
	},
	
	countrySelect: {
		flexDirection: 'row', 
		alignItems: 'center',
		borderColor: colors.borderGrey,
		borderWidth: 1,
		padding: 10,
		borderRadius: 5,
	},

	countryCode: {
		borderColor: '#000', 
		color: '#FFF',
		backgroundColor: '#000',
		paddingHorizontal: 0,
		paddingVertical: 2,
		borderRadius: 7,
		borderWidth: 1,
		overflow: 'hidden',
		textAlign: 'center',
		width: 45,
		justifyContent: 'center',
		alignItems: 'center',
	},

	itemCountryFlag: {
		justifyContent: 'center',
		alignItems: 'center',
		height: '7%',
		width: '15%'
	},

	itemCountry: {
		borderBottomColor: 'transparent',
		width: '100%'
	},

	emojiFlag: {
		alignItems: 'center',
		justifyContent: 'center',
		fontSize: 30,
		width: 30,
		height: 30,
		borderWidth: 1 / PixelRatio.get(),
		borderColor: 'transparent',
		backgroundColor: 'transparent'
	},

	imgStyle: {
		resizeMode: 'contain',
		width: 25,
		height: 19,
		borderWidth: 1 / PixelRatio.get(),
		borderColor: '#eee',
		opacity: 0.8
	},

	touchFlag: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 19,
		marginTop: isIos ? -4 : 0,
		marginRight: 10,
		paddingVertical: 5,
		width: 45
	},

	continueTxt: {
		color: colors.textDark, 
		fontSize: 20, 
		fontFamily: fonts.nunitoLight,
	},

	backBtn: {
        paddingLeft: 10,
        paddingBottom: 10,

	},
	
    error: {
        color: 'red',
        marginTop: 10
    }
})
