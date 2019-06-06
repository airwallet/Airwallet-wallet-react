import React, { Component } from 'react';
import { View, Text, StyleSheet, ToastAndroid, Platform, Image, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import Background from '../../components/background';
import Container from '../../components/Container';
import SearchBar from '../../components/searchbar';
import Svg,{ Path} from 'react-native-svg';
import { dimensions, colors, fonts } from '../../constants/variables';
import IosToast from '../../components/customToast';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Logo from '../../components/logo';
import SocialButtons from '../../components/socialButtons';
import Notifications from './notifications';
import { AppName } from '../../components/logo/index';
import {Languages} from '../../components/Languages/All_languages';
const isIos = Platform.OS === 'ios';
const btn1Border = '#262626';
const btn2Border = '#262626';

const headerBg = "#a6a4a4";

class More extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exchanges : [
                {name: 'Bithumb', amount: 2334},
                {name: 'Binance', amount: 434},
                {name: 'UpBit', amount: 242},
                {name: 'Huobi', amount: 904},
            ]
        }
        Languages.setLanguage(global.code);
    }
    
    showToast(message) {   
        if(isIos){
            this.refs.iosToast.show(message);
        }else{
            ToastAndroid.show(message, ToastAndroid.SHORT);
        }
    }
  
    render() {
        return (
            <Background style={styles.background}>
                <IosToast positionValue={160} ref="iosToast"/>
                {/* <SearchBar openOption = {() => this.showToast('Open options')}/> */}
                <Container style={styles.container}>
                    <ScrollView style={styles.scrollView}>
                        <View style={styles.header}>
                            <View style={styles.user}>
                               <MaterialCommunityIcons name="account-circle" size={50} color="white" />
                               <Text style={styles.userNameTxt}>{Languages.MORE_TAEYOUNG}</Text>
                            </View>
                        </View>
                        
                        <View style={styles.logoCont}>
                            <ImageBackground source = {require('../../images/smallbg.png')} style={{ margin: 8}}>
                                <View style={styles.logo}>
                                    <Image 
                                        source={require('../../images/logo.png')} 
                                        style={{height: 50, width: 50, resizeMode: 'contain', marginRight: 15}}/>
                                    <AppName styleTxt={{fontSize: 20, fontWeight: 'bold'}}/>
                                </View>
                            </ImageBackground>
                        </View>
                        <View style={styles.openButtons}>
                            <TouchableOpacity onPress={() => this.showToast('Whitepaper')} style={styles.whitepaperBtn}>
                                <View style={{marginBottom: -20, marginHorizontal: -11}}>
                                    <Svg viewBox="0 0 37 51" height="37" width="50">
                                        <Path strokeWidth="0" fill={btn2Border} d="M17.389,13.263 C17.084,12.961 16.408,12.801 15.380,12.787 C14.684,12.779 13.847,12.841 12.966,12.965 C12.571,12.736 12.165,12.487 11.846,12.187 C10.987,11.380 10.270,10.260 9.824,9.029 C9.853,8.914 9.878,8.813 9.901,8.710 C9.901,8.710 10.384,5.946 10.256,5.011 C10.239,4.883 10.228,4.846 10.194,4.746 L10.152,4.638 C10.020,4.332 9.762,4.009 9.358,4.026 L9.121,4.019 L9.114,4.019 C8.663,4.019 8.296,4.251 8.199,4.598 C7.906,5.686 8.209,7.313 8.757,9.421 L8.617,9.764 C8.224,10.727 7.732,11.697 7.298,12.553 L7.241,12.664 C6.785,13.564 6.370,14.327 5.995,14.974 L5.607,15.180 C5.579,15.195 4.914,15.549 4.758,15.644 C3.435,16.438 2.559,17.341 2.413,18.056 C2.367,18.285 2.402,18.577 2.637,18.713 L3.012,18.903 C3.175,18.985 3.346,19.026 3.522,19.026 C4.464,19.026 5.558,17.845 7.065,15.200 C8.804,14.630 10.784,14.156 12.520,13.895 C13.843,14.644 15.470,15.165 16.497,15.165 C16.679,15.165 16.836,15.147 16.964,15.113 C17.161,15.061 17.327,14.948 17.428,14.794 C17.627,14.493 17.668,14.077 17.613,13.652 C17.597,13.525 17.497,13.369 17.389,13.263 ZM3.318,18.307 C3.490,17.834 4.170,16.900 5.175,16.071 C5.238,16.019 5.394,15.872 5.537,15.736 C4.485,17.423 3.781,18.096 3.318,18.307 ZM9.273,4.508 C9.576,4.508 9.748,5.276 9.762,5.996 C9.777,6.716 9.609,7.221 9.402,7.595 C9.230,7.041 9.147,6.169 9.147,5.598 C9.147,5.598 9.134,4.508 9.273,4.508 ZM7.497,14.341 C7.708,13.961 7.927,13.561 8.151,13.135 C8.698,12.095 9.043,11.281 9.300,10.612 C9.812,11.548 10.449,12.344 11.197,12.982 C11.291,13.062 11.390,13.142 11.494,13.221 C9.971,13.524 8.655,13.893 7.497,14.341 ZM17.096,14.255 C17.003,14.313 16.738,14.347 16.567,14.347 C16.015,14.347 15.333,14.093 14.377,13.681 C14.744,13.653 15.081,13.639 15.383,13.639 C15.936,13.639 16.100,13.637 16.641,13.776 C17.182,13.915 17.189,14.197 17.096,14.255 ZM18.760,4.502 L15.571,1.293 C14.876,0.594 13.504,0.022 12.522,0.022 L1.808,0.022 C0.826,0.022 0.022,0.831 0.022,1.819 L0.022,21.226 C0.022,22.214 0.826,23.022 1.808,23.022 L18.237,23.022 C19.219,23.022 20.022,22.214 20.022,21.226 L20.022,7.569 C20.022,6.581 19.454,5.201 18.760,4.502 ZM17.749,5.518 C17.819,5.589 17.889,5.675 17.957,5.772 L14.308,5.772 L14.308,2.101 C14.405,2.169 14.491,2.239 14.561,2.309 L17.749,5.518 ZM18.594,21.226 C18.594,21.420 18.430,21.585 18.237,21.585 L1.808,21.585 C1.614,21.585 1.451,21.420 1.451,21.226 L1.451,1.819 C1.451,1.625 1.614,1.460 1.808,1.460 L12.522,1.460 C12.630,1.460 12.751,1.474 12.879,1.498 L12.879,7.210 L18.556,7.210 C18.580,7.339 18.594,7.461 18.594,7.569 L18.594,21.226 Z" stroke="black" />
                                    </Svg>
                                </View>
                                <Text style={{color: btn2Border, fontFamily: fonts.nunitoRegular}}>{Languages.WHITEPAPER}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.showToast('Website')} style={styles.websiteBtn}>
                                <View style={{marginBottom: -22, marginHorizontal: -11}}>
                                    <Svg viewBox="0 0 37 51" height="37" width="50">
                                        <Path strokeWidth="0" fill= {btn2Border} d="M18.669,4.975 C17.774,3.441 16.559,2.227 15.026,1.331 C13.491,0.436 11.817,-0.011 10.000,-0.011 C8.184,-0.011 6.509,0.436 4.975,1.331 C3.441,2.226 2.227,3.441 1.331,4.975 C0.436,6.509 -0.011,8.184 -0.011,10.000 C-0.011,11.816 0.436,13.491 1.331,15.025 C2.226,16.559 3.441,17.773 4.975,18.669 C6.509,19.564 8.184,20.011 10.000,20.011 C11.816,20.011 13.492,19.564 15.025,18.669 C16.559,17.774 17.774,16.559 18.669,15.025 C19.564,13.491 20.011,11.816 20.011,10.000 C20.011,8.184 19.564,6.508 18.669,4.975 ZM10.000,1.449 C12.155,1.449 14.037,2.161 15.644,3.586 L15.481,3.814 C15.416,3.906 15.253,4.082 14.993,4.342 C14.732,4.603 14.447,4.851 14.139,5.085 C13.830,5.320 13.411,5.587 12.881,5.887 C12.351,6.187 11.786,6.450 11.186,6.676 C10.187,4.833 9.118,3.174 7.979,1.696 C8.666,1.531 9.340,1.449 10.000,1.449 ZM3.300,4.694 C4.134,3.643 5.151,2.835 6.350,2.270 C7.428,3.704 8.488,5.346 9.531,7.197 C6.889,7.892 4.256,8.240 1.631,8.240 C1.910,6.928 2.466,5.746 3.300,4.694 ZM2.022,13.083 C1.640,12.105 1.449,11.078 1.449,10.000 C1.449,9.878 1.453,9.787 1.462,9.726 C4.608,9.726 7.532,9.322 10.235,8.514 C10.513,9.053 10.743,9.535 10.926,9.961 C10.891,9.978 10.835,9.998 10.756,10.020 C10.678,10.041 10.621,10.056 10.587,10.065 L10.104,10.235 C9.774,10.356 9.341,10.565 8.807,10.860 C8.273,11.156 7.706,11.508 7.106,11.916 C6.506,12.325 5.887,12.866 5.248,13.540 C4.610,14.213 4.073,14.936 3.639,15.710 C2.943,14.936 2.405,14.061 2.022,13.083 ZM10.000,18.552 C7.967,18.552 6.150,17.900 4.551,16.596 L4.747,16.740 C5.051,16.070 5.498,15.427 6.089,14.810 C6.680,14.193 7.250,13.696 7.797,13.318 C8.345,12.940 8.940,12.583 9.583,12.248 C10.226,11.914 10.665,11.701 10.899,11.610 C11.134,11.519 11.321,11.447 11.460,11.395 L11.486,11.382 L11.512,11.382 C12.364,13.615 12.972,15.779 13.337,17.873 C12.260,18.326 11.147,18.551 10.000,18.552 ZM17.196,14.621 C16.553,15.616 15.749,16.440 14.784,17.092 C14.428,15.093 13.872,13.055 13.116,10.978 C14.845,10.708 16.622,10.834 18.447,11.356 C18.256,12.538 17.839,13.626 17.196,14.621 ZM18.421,9.883 C18.334,9.865 18.226,9.846 18.095,9.824 C17.965,9.803 17.806,9.776 17.619,9.746 C17.433,9.716 17.224,9.687 16.994,9.661 C16.763,9.635 16.518,9.611 16.257,9.590 C15.996,9.568 15.718,9.551 15.423,9.537 C15.127,9.524 14.827,9.518 14.523,9.518 C14.219,9.518 13.900,9.527 13.565,9.544 C13.231,9.561 12.907,9.592 12.594,9.635 C12.568,9.592 12.535,9.520 12.496,9.420 C12.457,9.320 12.429,9.244 12.412,9.192 C12.247,8.827 12.055,8.414 11.838,7.954 C12.438,7.710 13.009,7.430 13.553,7.113 C14.096,6.795 14.530,6.513 14.856,6.265 C15.182,6.018 15.490,5.755 15.782,5.477 C16.073,5.199 16.262,5.005 16.349,4.897 C16.436,4.788 16.518,4.681 16.596,4.577 L16.609,4.564 C17.878,6.111 18.526,7.892 18.552,9.909 L18.421,9.883 Z" />
                                    </Svg>
                                </View>
                            <Text style={styles.websiteTxt}>{Languages.WEBSITE}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.shareButton}>
                            <SocialButtons/>
                        </View>
                        <View style={{marginBottom: 30}}>
                            <Notifications/>
                        </View>
                    </ScrollView>
                </Container>
            </Background>
        );
    }
}

export default More;

const styles = StyleSheet.create({

    container: {
        marginTop: 5,
        padding:0,
        paddingTop: 10,
        marginBottom: (dimensions.bottomTabHeight - 10),
        flex: 1,
    },

    header: {
        borderColor: colors.borderGrey,
        backgroundColor: headerBg,
        borderWidth: 1,
        flexDirection: 'row',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems:'center',
        margin: 10,
        borderRadius: 5,
        paddingVertical: 5,
        paddingBottom: 3
    },

    user: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    amount: {
        justifyContent: 'center',
        alignItems: 'flex-end',
    },

    userNameTxt: {
        fontSize: 23,
        marginLeft: 10,
        color: 'white',
        fontFamily: fonts.nunitoRegular
    },

    amountTxt: {
        fontSize: 22,
        marginTop: 5,
        fontWeight: 'bold',
    },

    openButtons: {
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },

    whitepaperBtn: {
        width: '48%',
        borderWidth: 1,
        borderColor: btn1Border,
        alignItems:'center',
        justifyContent:'center',
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
    },

    websiteBtn: {
        width: '48%',
        borderWidth: 1,
        borderColor: btn2Border,
        alignItems:'center',
        justifyContent:'center',
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
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
        borderRadius: 5,
    },

    logoTxt: {
        // color: 'white', 
        fontSize: 20, 
        fontWeight: 'bold',
    },

    logo: {
        paddingVertical: 10, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center', 
        paddingVertical: 20,
    },  

    shareButton: {
        justifyContent: 'flex-end', 
        flexDirection: 'row', 
        paddingRight: 10,
        marginBottom: 20
    },

    notification: {
        borderColor: colors.borderGrey,
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
    }


})