import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, ScrollView, ToastAndroid, TextInput } from 'react-native';
import Background from '../../../components/background';
import Container from '../../../components/Container';
import FontAwesomeIcon from 'react-native-vector-icons/dist/FontAwesome';
import BottomButton from '../../../components/bottomButton'
import { dimensions, fonts } from '../../../constants/variables';
import Logo from '../../../components/logo';
import Svg,{ Path} from 'react-native-svg';
import { getAsyncStorage, setAsyncStorage } from '../../../utils/asyncStorage';
import { USER_DATA, ACCESS_TOKEN, ENDPOINTS, USER_ID } from '../../../constants/api';
import { POST } from '../../../utils/api/Request';
import IosToast from '../../../components/customToast';
import {Languages} from '../../../components/Languages/All_languages'
const iconColor = '#a6a4a4';
const headColor = '#1b1b1b';


class BackupPharse extends Component {
    constructor(props){
        super(props);
        this.state = {
            backupPhrase: [],
            match: false,
            generatingPhrase: true,
            userData: {},
            selectedWords: [],
            verifing: false,
            errorShake: false,
            phraseString: '',
            error: '',
        }
        Languages.setLanguage(global.code) 
    }

    showToast(message) {   
        if(Platform.OS === 'ios'){
            this.refs.iosToast.show(message);
        }else{
            ToastAndroid.show(message, ToastAndroid.SHORT);
        }
    }

    onContinue = () => {
        const { phraseString } = this.state;
        const backupPhrase = phraseString.split(" ");
        console.log('backupphrase', backupPhrase)
        const userData = this.props.navigation.getParam('userData', {})

            if(userData[ACCESS_TOKEN]){
				const config = {
                    headers: {Authorization: 'bearer ' + userData[ACCESS_TOKEN]},
                    data: {backupPhrase: backupPhrase}
				}
				POST(ENDPOINTS.CONFIRM_BACKUP_PHRASE, config)
				.then(res => {
                    this.showToast(Languages.PHREASE_VERFIY)
                    this.setState({verifing: false})
                    let userData = {};
                    userData[ACCESS_TOKEN] = res.data.user.token
                    userData[USER_ID] = res.data.user.id
                    console.log('userDatais', userData)
                    setAsyncStorage(USER_DATA, JSON.stringify(userData))
                    this.props.navigation.navigate('createPin', {onCreate: 'Tab'})
				})
				.catch(error => {
                    // this.showToast('Error Occured')
                    this.setState({error: Languages.PHREASE_NOT_VERFIY_TRY_AGAIN})
					this.setState({verifing: false})
					console.log(error)
				})
			}else{
				this.setState({verifing: false});
			}
    }

    
    render() {
        const { backupPhrase, generatingPhrase, match, verifing, phraseString } = this.state;
        let secretString = '';
        if(backupPhrase && backupPhrase.length){
            backupPhrase.map(word => {secretString += word+' '})
        }
        
        return (
            <Background type="dark" style={styles.background}>
                <IosToast positionValue={160} ref="iosToast"/>
                <View style={styles.logoCont}>
                    <Logo style={{height: 100}} styleTxt={{fontSize: 30}}/>
                </View>
                <Container style={styles.container}>
                <ScrollView>
                    <View style={styles.header}>
                        <View>
                            <Svg viewBox="0 0 60 60" height="50" width="40">
                                <Path strokeWidth="0" fill={iconColor} d="M34.84 12.29L34.84 9.21C34.84 6.54 32.67 4.37 30 4.37C27.33 4.37 25.16 6.54 25.16 9.21L25.16 12.29C24.04 12.69 23.23 13.76 23.23 15.02L23.23 22.76C23.23 24.36 24.53 25.66 26.13 25.66L33.87 25.66C35.47 25.66 36.77 24.36 36.77 22.76L36.77 15.02C36.77 13.76 35.96 12.69 34.84 12.29ZM27.1 9.21C27.1 7.61 28.4 6.31 30 6.31C31.6 6.31 32.9 7.61 32.9 9.21L32.9 12.11L27.1 12.11L27.1 9.21ZM34.84 22.76C34.84 23.29 34.4 23.73 33.87 23.73L26.13 23.73C25.6 23.73 25.16 23.29 25.16 22.76L25.16 15.02C25.16 14.48 25.6 14.05 26.13 14.05L33.87 14.05C34.4 14.05 34.84 14.48 34.84 15.02L34.84 22.76ZM30 15.02C28.4 15.02 27.1 16.32 27.1 17.92C27.1 19.18 27.91 20.24 29.03 20.64L29.03 22.76L30.97 22.76L30.97 20.64C32.09 20.24 32.9 19.18 32.9 17.92C32.9 16.32 31.6 15.02 30 15.02ZM30 18.89C29.47 18.89 29.03 18.45 29.03 17.92C29.03 17.39 29.47 16.95 30 16.95C30.53 16.95 30.97 17.39 30.97 17.92C30.97 18.45 30.53 18.89 30 18.89ZM2.9 41.15C1.3 41.15 0 42.45 0 44.05C0 45.31 0.81 46.37 1.94 46.77L1.94 57.6L3.87 57.6L3.87 46.77C4.99 46.37 5.81 45.31 5.81 44.05C5.81 42.45 4.5 41.15 2.9 41.15ZM2.9 45.02C2.37 45.02 1.94 44.58 1.94 44.05C1.94 43.51 2.37 43.08 2.9 43.08C3.44 43.08 3.87 43.51 3.87 44.05C3.87 44.58 3.44 45.02 2.9 45.02ZM9.68 54.87L9.68 44.05L7.74 44.05L7.74 54.87C6.62 55.27 5.81 56.34 5.81 57.6C5.81 59.2 7.11 60.5 8.71 60.5C10.31 60.5 11.61 59.2 11.61 57.6C11.61 56.34 10.8 55.27 9.68 54.87ZM8.71 58.56C8.18 58.56 7.74 58.13 7.74 57.6C7.74 57.06 8.18 56.63 8.71 56.63C9.24 56.63 9.68 57.06 9.68 57.6C9.68 58.13 9.24 58.56 8.71 58.56ZM57.1 41.15C55.5 41.15 54.19 42.45 54.19 44.05C54.19 45.31 55.01 46.37 56.13 46.77L56.13 57.6L58.06 57.6L58.06 46.77C59.19 46.37 60 45.31 60 44.05C60 42.45 58.7 41.15 57.1 41.15ZM57.1 45.02C56.56 45.02 56.13 44.58 56.13 44.05C56.13 43.51 56.56 43.08 57.1 43.08C57.63 43.08 58.06 43.51 58.06 44.05C58.06 44.58 57.63 45.02 57.1 45.02ZM52.26 54.87L52.26 44.05L50.32 44.05L50.32 54.87C49.2 55.27 48.39 56.34 48.39 57.6C48.39 59.2 49.69 60.5 51.29 60.5C52.89 60.5 54.19 59.2 54.19 57.6C54.19 56.34 53.38 55.27 52.26 54.87ZM51.29 58.56C50.76 58.56 50.32 58.13 50.32 57.6C50.32 57.06 50.76 56.63 51.29 56.63C51.82 56.63 52.26 57.06 52.26 57.6C52.26 58.13 51.82 58.56 51.29 58.56ZM20.32 31.47L22.26 31.47L22.26 33.4L20.32 33.4L20.32 31.47ZM37.74 31.47L39.68 31.47L39.68 33.4L37.74 33.4L37.74 31.47ZM20.32 43.08L22.26 43.08L22.26 45.02L20.32 45.02L20.32 43.08ZM24.19 43.08L26.13 43.08L26.13 45.02L24.19 45.02L24.19 43.08ZM37.74 54.69L39.68 54.69L39.68 56.63L37.74 56.63L37.74 54.69ZM33.87 54.69L35.81 54.69L35.81 56.63L33.87 56.63L33.87 54.69ZM51.29 33.4C51.29 35.54 49.55 37.27 47.42 37.27L47.42 39.21C50.62 39.21 53.23 36.61 53.23 33.4L51.29 33.4ZM48.34 23.77C48.12 21.47 47.07 19.31 45.38 17.7C45.45 17.13 45.48 16.56 45.48 15.98C45.48 7.45 38.54 0.5 30 0.5C21.91 0.5 15.26 6.74 14.58 14.65C12.85 16.71 11.82 19.25 11.64 21.96C6.6 22.86 2.9 27.23 2.9 32.44C2.9 38.3 7.68 43.08 13.55 43.08L16.45 43.08L16.45 48.89L19.35 48.89L19.35 50.82L16.45 50.82L16.45 60.5L43.55 60.5L43.55 50.82L40.65 50.82L40.65 48.89L43.55 48.89L43.55 43.08L47.42 43.08C52.76 43.08 57.1 38.74 57.1 33.4C57.1 28.38 53.25 24.24 48.34 23.77ZM30 2.44C37.47 2.44 43.55 8.51 43.55 15.98C43.55 23.45 37.47 29.53 30 29.53C22.53 29.53 16.45 23.45 16.45 15.98C16.45 8.51 22.53 2.44 30 2.44ZM18.39 35.34L18.39 29.53L22.52 29.53C24.74 30.76 27.29 31.47 30 31.47C32.71 31.47 35.26 30.76 37.48 29.53L41.61 29.53L41.61 35.34L18.39 35.34ZM38.71 37.27L38.71 39.21L21.29 39.21L21.29 37.27L38.71 37.27ZM16.45 41.15L13.55 41.15C8.75 41.15 4.84 37.24 4.84 32.44C4.84 27.94 8.21 24.21 12.68 23.77L13.55 23.63L13.55 22.76C13.55 21.1 13.94 19.48 14.67 18.02C15.17 21.82 17.05 25.18 19.79 27.6L16.45 27.6L16.45 37.27L19.35 37.27L19.35 39.21L16.45 39.21L16.45 41.15ZM41.61 52.76L41.61 58.56L18.39 58.56L18.39 52.76L41.61 52.76ZM21.29 50.82L21.29 48.89L38.71 48.89L38.71 50.82L21.29 50.82ZM41.61 46.95L18.39 46.95L18.39 41.15L41.61 41.15L41.61 46.95ZM47.42 41.15L43.55 41.15L43.55 39.21L40.65 39.21L40.65 37.27L43.55 37.27L43.55 27.6L40.21 27.6C42.44 25.63 44.11 23.03 44.92 20.07C45.9 21.4 46.45 23.02 46.45 24.69L46.45 25.66L47.42 25.66C51.69 25.66 55.16 29.13 55.16 33.4C55.16 37.67 51.69 41.15 47.42 41.15Z" />
                            </Svg>
                        </View>
                    </View>
                    {/* <View style={styles.phraseArea}> */}
                        <TextInput 
                            textBreakStrategy="highQuality" 
                            placeholder={Languages.ENTER_YOUR_BACKUP_PHRASE}
                            style={styles.phraseArea}
                            multiline = {true}
                            value={phraseString}
                            onChangeText={(phraseString) => this.setState({phraseString:phraseString.toLowerCase(), error: ''})}
                        />
                    {/* </View> */}
                    <Text style={{color: '#ea3d13'}}>{this.state.error}</Text>
                   </ScrollView>
                </Container>
                <BottomButton loading={verifing}>
                    <TouchableOpacity onPress={this.onContinue} activeOpacity={0.6} style={styles.bottomButton}>
                        <Text style={{color:'white', fontSize: 20, marginRight: 20}}>{Languages.CONTINUE}</Text>
                        <FontAwesomeIcon style={styles.icon} name="angle-right" size={30} color="white" />
                    </TouchableOpacity>
                </BottomButton>
            </Background>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        padding: 0,
        paddingBottom: 10
    },
    logoCont: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    container: {
        flex: 2,
        margin: 0,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        flexDirection: 'column',
        // justifyContent: "space-between",
        marginBottom: (dimensions.bottomButtonHeight - 10),
        padding: 0,
    },   

    header : {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
     
    headerTxt: {
        color: headColor,
        fontSize: 23,
        marginTop: 3,
        fontFamily: fonts.nunitoLight,
    },

    bottomButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: dimensions.bottomButtonHeight,
    },

    phraseArea: {
        height: 100,
        backgroundColor: "rgba(229, 229, 299, 0.2)",
        flexDirection: 'row',
        fontSize: 20, 
        borderRadius: 5,
        padding: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
})

export default BackupPharse;