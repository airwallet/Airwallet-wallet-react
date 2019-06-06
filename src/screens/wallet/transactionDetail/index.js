import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ToastAndroid, Platform, Clipboard } from 'react-native';
import Background from '../../../components/background'
import Container from '../../../components/Container'
import Icon from 'react-native-vector-icons/dist/Ionicons';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Svg,{ Path } from 'react-native-svg';
import { colors, dimensions, fonts } from '../../../constants/variables';
import IosToast from '../../../components/customToast';
import SwipTab from './swipTab';
import { getQrCode } from '../../../utils/getQrCode';
import PopView from '../../../components/popView';
import {Languages} from '../../../components/Languages/All_languages'
const headerColor = '#585757';

class CytoTransationDetail extends Component {
    constructor(){
        super();
        this.state = {
            address: '',
            imgPopup: false
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

    copyAddress = () => {
        Clipboard.setString(this.state.address);
        this.showToast('Copied on clipboard')
    }

    showImage = () => {
        this.setState({imgPopup: !this.state.imgPopup})
    }

    componentWillMount(){
        const data = this.props.navigation.getParam('data', 'Bitcoin');
        const { addresses } = data;

        this.setState({address: addresses.length ? addresses[0].address : ''})
    }

    imgPop = () => {
        const qrCode = getQrCode(this.state.address, 500)
        return <PopView visible = {this.state.imgPopup} onRequestClose={this.showImage}>
                    <View style={styles.imgPopCont}>
                        <Text style={styles.curAddTxt}>{Languages.YOUR_CURRENT_ADDRESS}</Text>
                        <TouchableOpacity onPress={this.showImage} activeOpacity={0.6} style={styles.closeIcon} >
                            <MaterialCommunityIconsIcon name="close" size={25} color="black"/>
                        </TouchableOpacity>
                        <View style={styles.imgPop}>
                            <Image style={{flex: 1, resizeMode: "contain"}} source={{uri:qrCode}}/>
                        </View>
                        <View style={[styles.address, {flexDirection: 'column'}]}>
                            <Text style={styles.addTxt}>{this.state.address}</Text>
                            <TouchableOpacity onPress={() => this.copyAddress()} style={[styles.popCopyBtn]}>
                                <Text style={styles.copyTxt}>{Languages.COPY}</Text>
                                <View style={[styles.copyIcon, {marginRight: -15,}]}>
                                    <Svg viewBox="0 0 37 31" height="30" width="30">
                                        <Path strokeWidth="0" fill="white" d="M13.653,15.383 C13.367,15.383 13.138,15.154 13.138,14.869 C13.138,14.583 13.367,14.354 13.653,14.354 C13.897,14.354 14.095,14.156 14.095,13.912 L14.095,1.498 C14.095,1.254 13.897,1.056 13.653,1.056 L4.995,1.056 C4.751,1.056 4.553,1.254 4.553,1.498 C4.553,1.784 4.324,2.013 4.038,2.013 C3.752,2.013 3.523,1.784 3.523,1.498 C3.523,0.687 4.183,0.027 4.995,0.027 L13.653,0.027 C14.465,0.027 15.125,0.687 15.125,1.498 L15.125,13.912 C15.125,14.724 14.465,15.383 13.653,15.383 ZM11.814,4.753 L11.814,17.167 C11.814,17.979 11.155,18.638 10.342,18.638 L1.685,18.638 C0.873,18.638 0.213,17.979 0.213,17.167 L0.213,4.753 C0.213,3.941 0.873,3.282 1.685,3.282 L10.342,3.282 C11.151,3.282 11.811,3.941 11.814,4.753 ZM1.681,4.311 C1.437,4.311 1.239,4.509 1.239,4.753 L1.239,17.163 C1.239,17.407 1.437,17.605 1.681,17.605 L10.338,17.605 C10.583,17.605 10.781,17.407 10.781,17.163 L10.781,4.753 C10.781,4.509 10.583,4.311 10.338,4.311 L1.681,4.311 Z" />
                                    </Svg>
                                </View>
                            </TouchableOpacity>
                        </View> 
                    </View>
                </PopView>
        }

    render() {
        const data = this.props.navigation.getParam('data', 'Bitcoin');

        const name = data.name;
        
        return (
            <Background style={styles.background} type="dark">
                <IosToast positionValue={160} ref="iosToast"/>
                    {this.imgPop()}
                <Container style={[styles.container]}>
                    <View style={styles.content}>
                        <View style={styles.headerView}>
                            <View style={styles.header}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('home')} style={styles.backButton}>
                                    <Svg viewBox="0 0 37 51" height="30" width="50">
                                        <Path strokeWidth="0" fill="rgb(255, 255, 255)" d="M8.357,21.622 L24.196,5.756 C24.633,5.320 24.872,4.737 24.872,4.116 C24.872,3.494 24.633,2.912 24.196,2.475 L22.808,1.085 C22.373,0.648 21.791,0.408 21.171,0.408 C20.550,0.408 19.969,0.648 19.533,1.085 L0.674,19.976 C0.237,20.414 -0.003,20.999 -0.001,21.621 C-0.003,22.246 0.236,22.830 0.674,23.268 L19.516,42.140 C19.951,42.577 20.533,42.818 21.153,42.818 C21.774,42.818 22.355,42.577 22.791,42.140 L24.179,40.751 C25.082,39.846 25.082,38.374 24.179,37.470 L8.357,21.622 Z" />
                                    </Svg>
                                </TouchableOpacity>
                                <View style={styles.headerRight}>
                                    <Text style={styles.headerTxt}>{name}</Text>
                                    <TouchableOpacity onPress={this.showImage} style={styles.qrCode}>
                                        <Svg viewBox="0 0 37 31" height="28" width="30">
                                            <Path strokeWidth="0" fill="white" d="M39.375,45.000 L39.375,42.187 L45.000,42.187 L45.000,45.000 L39.375,45.000 ZM42.187,30.937 L45.000,30.937 L45.000,33.750 L42.187,33.750 L42.187,30.937 ZM39.375,25.312 L45.000,25.312 L45.000,28.125 L39.375,28.125 L39.375,25.312 ZM42.187,22.500 L30.937,22.500 L30.937,19.687 L33.750,19.687 L33.750,16.875 L36.562,16.875 L36.562,19.687 L39.375,19.687 L39.375,16.875 L45.000,16.875 L45.000,19.687 L42.187,19.687 L42.187,22.500 ZM30.937,-0.000 L45.000,-0.000 L45.000,14.062 L30.937,14.062 L30.937,-0.000 ZM33.750,11.250 L42.187,11.250 L42.187,2.812 L33.750,2.812 L33.750,11.250 ZM36.562,5.625 L39.375,5.625 L39.375,8.437 L36.562,8.437 L36.562,5.625 ZM30.937,36.562 L28.125,36.562 L28.125,30.937 L30.937,30.937 L30.937,36.562 ZM25.312,22.500 L28.125,22.500 L28.125,28.125 L25.312,28.125 L25.312,22.500 ZM16.875,16.875 L25.312,16.875 L25.312,14.062 L28.125,14.062 L28.125,19.687 L16.875,19.687 L16.875,16.875 ZM25.312,11.250 L22.500,11.250 L22.500,8.437 L16.875,8.437 L16.875,7.031 L16.875,5.625 L16.875,2.812 L19.687,2.812 L19.687,5.625 L28.125,5.625 L28.125,8.437 L25.312,8.437 L25.312,11.250 ZM22.500,-0.000 L28.125,-0.000 L28.125,2.812 L22.500,2.812 L22.500,-0.000 ZM19.687,14.062 L16.875,14.062 L16.875,11.250 L19.687,11.250 L19.687,14.062 ZM19.687,25.312 L22.500,25.312 L22.500,28.125 L16.875,28.125 L16.875,25.312 L14.062,25.312 L12.656,25.312 L11.250,25.312 L11.250,28.125 L8.437,28.125 L8.437,22.500 L11.250,22.500 L11.250,16.875 L14.062,16.875 L14.062,22.500 L19.687,22.500 L19.687,25.312 ZM-0.000,-0.000 L14.062,-0.000 L14.062,14.062 L-0.000,14.062 L-0.000,-0.000 ZM2.812,11.250 L11.250,11.250 L11.250,2.812 L2.812,2.812 L2.812,11.250 ZM5.625,5.625 L8.437,5.625 L8.437,8.437 L5.625,8.437 L5.625,5.625 ZM5.625,16.875 L8.437,16.875 L8.437,19.687 L5.625,19.687 L5.625,16.875 ZM2.812,22.500 L5.625,22.500 L5.625,25.312 L2.812,25.312 L2.812,28.125 L-0.000,28.125 L-0.000,16.875 L2.812,16.875 L2.812,22.500 ZM14.062,45.000 L-0.000,45.000 L-0.000,30.937 L14.062,30.937 L14.062,45.000 ZM11.250,33.750 L2.812,33.750 L2.812,42.187 L11.250,42.187 L11.250,33.750 ZM8.437,39.375 L5.625,39.375 L5.625,36.562 L8.437,36.562 L8.437,39.375 ZM25.312,39.375 L30.937,39.375 L30.937,42.187 L25.312,42.187 L25.312,45.000 L16.875,45.000 L16.875,42.187 L22.500,42.187 L22.500,33.750 L16.875,33.750 L16.875,30.937 L25.312,30.937 L25.312,39.375 ZM19.687,39.375 L16.875,39.375 L16.875,36.562 L19.687,36.562 L19.687,39.375 ZM30.937,25.312 L36.562,25.312 L36.562,33.750 L33.750,33.750 L33.750,28.125 L30.937,28.125 L30.937,25.312 ZM42.187,39.375 L36.562,39.375 L36.562,45.000 L33.750,45.000 L33.750,36.562 L42.187,36.562 L42.187,39.375 Z" />
                                        </Svg>

                                    </TouchableOpacity>
                                </View>
                            </View>
                           {this.state.address ? <View style={styles.address}>
                                <TouchableOpacity style={styles.addressBtn}>
                                    <Text style={styles.addressTxt}>ADDRESS</Text>
                                </TouchableOpacity>
                                <Text style={{fontSize: 12, fontFamily: fonts.nunitoLight}}>{this.state.address}</Text>
                                <TouchableOpacity  onPress={() => this.copyAddress()} style={styles.copyIcon}>
                                    <Svg viewBox="0 0 37 31" height="30" width="30">
                                        <Path strokeWidth="0" fill="#27292a" d="M13.653,15.383 C13.367,15.383 13.138,15.154 13.138,14.869 C13.138,14.583 13.367,14.354 13.653,14.354 C13.897,14.354 14.095,14.156 14.095,13.912 L14.095,1.498 C14.095,1.254 13.897,1.056 13.653,1.056 L4.995,1.056 C4.751,1.056 4.553,1.254 4.553,1.498 C4.553,1.784 4.324,2.013 4.038,2.013 C3.752,2.013 3.523,1.784 3.523,1.498 C3.523,0.687 4.183,0.027 4.995,0.027 L13.653,0.027 C14.465,0.027 15.125,0.687 15.125,1.498 L15.125,13.912 C15.125,14.724 14.465,15.383 13.653,15.383 ZM11.814,4.753 L11.814,17.167 C11.814,17.979 11.155,18.638 10.342,18.638 L1.685,18.638 C0.873,18.638 0.213,17.979 0.213,17.167 L0.213,4.753 C0.213,3.941 0.873,3.282 1.685,3.282 L10.342,3.282 C11.151,3.282 11.811,3.941 11.814,4.753 ZM1.681,4.311 C1.437,4.311 1.239,4.509 1.239,4.753 L1.239,17.163 C1.239,17.407 1.437,17.605 1.681,17.605 L10.338,17.605 C10.583,17.605 10.781,17.407 10.781,17.163 L10.781,4.753 C10.781,4.509 10.583,4.311 10.338,4.311 L1.681,4.311 Z" />
                                    </Svg>
                                </TouchableOpacity>
                            </View> : null}
                        </View>
                        <View style={styles.tabs}>
                            <SwipTab/>
                        </View>
                    </View>
                </Container>
            </Background>
        );
    }
}

const styles = StyleSheet.create({
    background: {
    }, 

    container : {
        marginTop: 15,
        padding: 0,
        borderRadius: 5,
        // marginBottom: dimensions.bottomTabHeight,
        borderRadius: 0
    },

    content: {
        height: '100%',
        borderRadius: 5,
    },

    headerView: {
        backgroundColor: '#dfe6ed',
    },

    scroll: {
        padding: 6,
        paddingTop: 10,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: headerColor,
        paddingVertical: 25,
        paddingHorizontal: 5,
        borderRadius: 5,
        marginBottom: 10,
        marginHorizontal: 6,
        marginTop: 6,  
        justifyContent: 'space-between'
    },

    backButton: {
        marginRight: 10,
    },

    headerRight: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '70%',
    },

    headerImg: { 
        height: 50, 
        width: 50,
        marginRight: 10,
        borderRadius: 5,
    },

    headerTxt: {
        color: 'white',
        fontSize: 23,
        fontFamily: fonts.nunitoSemiBold,
        marginRight: 10
    },

    qrCode: {
        paddingRight: 10,
    },

    address: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginBottom: 10,
        // width: '100%',
    },

    addressBtn: {
        paddingVertical: 7,
        paddingHorizontal: 15,
        backgroundColor: 'white',
        borderRadius: 5,
        marginRight: 10,
    },

    addressTxt: {
        color: '#898989',
        fontFamily: fonts.nunitoLight
    }, 

    copyIcon: {
        marginBottom: -9, 
        marginLeft: 5,
    },

    tabs: {
        flex: 1,
        marginTop: 15
    },

    imgPopCont: {
        backgroundColor: 'white', 
        borderRadius: 5, 
        width: '100%', 
        alignItems:'center', 
        justifyContent:'center', 
        paddingVertical: 10,
    },

    imgPop: {
        padding: 5, 
        backgroundColor: 'white',
        height: 150,
        width: 150,
    },

    curAddTxt: {
        fontSize: 20, 
        paddingVertical: 10,
        fontFamily: fonts.nunitoLight
    },

    addTxt: {
        fontSize: 12, 
        paddingVertical: 10,
        fontFamily: fonts.nunitoLight
    },

    copyTxt: {
        marginRight: 10, 
        color: 'white',
        fontFamily: fonts.nunitoLight
    },

    popCopyBtn: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 5,
        backgroundColor: colors.lightGrey,
    },

    closeIcon: {
        position: 'absolute',
        top: 7,
        right: 7
    }
})

export default CytoTransationDetail;