import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { colors, dimensions, deviceDimensions, fonts } from '../../constants/variables'
import { ifIphoneX } from '../../utils/isIphoneX';
import Svg,{ Path, Image} from 'react-native-svg';
import IosToast from '../../components/customToast';
import { connect } from 'react-redux';
import { setHomeActive } from '../../actions/wallet';
import {Languages} from '../Languages/All_languages'
// const activeTab = 'white';
const deactiveTab = "rgba(255, 255, 255, 0.5)";
const activeColor = colors.yellow
import VerifyEmailNotification from '../verifyEmailNotification'
class BottomTabBar extends Component {
    constructor(props) {
        super(props)
        Languages.setLanguage(global.code);
    }
    showToast(message) {   
        if(Platform.OS === 'ios'){
            this.refs.iosToast.show(message);
        }else{
            ToastAndroid.show(message, ToastAndroid.SHORT);
        }
    }

    onTabClick = (i, home, tabName) => {
        const { index, routes} = this.props.navigation.state;
        if(index === i){
            this.props.navigation.navigate(home)
            if(this.props.walletStatus.active !== 'wallet'){
                this.props.setHomeActive({active: 'wallet', fromtab: true});
            }
        }else{
            this.props.navigation.navigate(tabName)
        }
    }

    render() {
        const { index, routes} = this.props.navigation.state;
        const activeTab = {borderTopColor: colors.yellow};
        const active = {
                            myaccount: index === 0,
                            exchanges: index === 1,
                            airdrop: index === 2,
                            more: index === 3,
                        }
        
        return (
            <View style={styles.container}>
                <IosToast positionValue={160} ref="iosToast"/>
                <VerifyEmailNotification/>
                <View style={styles.tabCont}>
                    <TouchableOpacity 
                        onPress={() => this.onTabClick(0, 'home', 'wallet')} 
                        activeOpacity={active.myaccount ? 1 : undefined}
                        style={[styles.tabIcon, active.myaccount ? activeTab : {}]}
                    >
                        <View style={[styles.svgIcon, {marginRight: 12 }]}>
                            <Svg  height="30" width="50" viewBox="0 0 234.877 334.877"  >
                                <Path fill={index === 0 ? activeColor : deactiveTab} d="M333.196,155.999h-16.067V82.09c0-17.719-14.415-32.134-32.134-32.134h-21.761L240.965,9.917
                                    C237.571,3.798,231.112,0,224.107,0c-3.265,0-6.504,0.842-9.364,2.429l-85.464,47.526H33.815
                                    c-17.719,0-32.134,14.415-32.134,32.134v220.653c0,17.719,14.415,32.134,32.134,32.134h251.18
                                    c17.719,0,32.134-14.415,32.134-32.134v-64.802h16.067V155.999z M284.995,62.809c9.897,0,17.982,7.519,19.068,17.14h-24.152
                                    l-9.525-17.14H284.995z M220.996,13.663c3.014-1.69,7.07-0.508,8.734,2.494l35.476,63.786H101.798L220.996,13.663z
                                    M304.275,302.742c0,10.63-8.651,19.281-19.281,19.281H33.815c-10.63,0-19.281-8.651-19.281-19.281V82.09
                                    c0-10.63,8.651-19.281,19.281-19.281h72.353L75.345,79.95H37.832c-3.554,0-6.427,2.879-6.427,6.427s2.873,6.427,6.427,6.427h14.396
                                    h234.83h17.217v63.201h-46.999c-21.826,0-39.589,17.764-39.589,39.589v2.764c0,21.826,17.764,39.589,39.589,39.589h46.999V302.742z
                                    M320.342,225.087h-3.213h-59.853c-14.743,0-26.736-11.992-26.736-26.736v-2.764c0-14.743,11.992-26.736,26.736-26.736h59.853
                                    h3.213V225.087z M276.961,197.497c0,7.841-6.35,14.19-14.19,14.19c-7.841,0-14.19-6.35-14.19-14.19s6.35-14.19,14.19-14.19
                                    C270.612,183.306,276.961,189.662,276.961,197.497z"
                                />
                            </Svg>
                        </View>
                        <Text style={[styles.itemText, {color: active.myaccount ? activeColor : 'white'}]}>{Languages.WALLETS}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.onTabClick(1, 'wallets', 'exchanges')} 
                        activeOpacity={active.exchanges ? 1 : undefined}
                        style={[styles.tabIcon, active.exchanges ? activeTab : {}]}
                    >
                        <View style={[styles.svgIcon, {marginRight: 12 }]}>
                        <Svg height="30" width="50" viewBox="0 0 380.877 450.877"  >
                                <Path fill={index === 1 ? activeColor : deactiveTab} d="M365.697,0l-13.923,13.923l67.76,67.76H132.139c-54.452,0-98.75,44.298-98.75,98.745v61.389h19.692v-61.389
			                        c0-43.591,35.466-79.053,79.058-79.053h287.394l-67.76,67.76l13.923,13.923l91.529-91.529L365.697,0z" />
                                <Path fill={index === 1 ? activeColor : deactiveTab} d="M433.457,244.716v61.389c0,43.591-35.466,79.058-79.058,79.058H67.004l67.76-67.764l-13.923-13.923L29.313,395.01
			                        l91.529,91.529l13.923-13.923l-67.76-67.76h287.394c54.452,0,98.75-44.298,98.75-98.75v-61.389H433.457z" />
                        </Svg>
                        </View>
                        <Text style={[styles.itemText, {color: active.exchanges ? activeColor : 'white'}]}>{Languages.EXCHANGES}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => this.onTabClick(2, 'airDrop', 'airDrop')} 
                        activeOpacity={active.airdrop ? 1 : undefined} 
                        style={[styles.tabIcon, active.airdrop && activeTab ]}
                    >
                        <View style={[styles.svgIcon]}>
                             <Svg  height="30" width="30" viewBox="0 0 820.877 800.877"  >
                                
                                <Path fill={index === 2 ? activeColor : deactiveTab} d="M395.98,792c-156.124,0-283.174-127.051-283.174-283.175c0-150.551,256.79-487.352,267.702-501.576
                                    c7.366-9.665,23.54-9.665,30.944,0c10.912,14.225,267.742,351.025,267.742,501.576C679.194,664.949,552.144,792,395.98,792z
                                    M395.98,51.639c-55.926,75.763-244.202,339.606-244.202,457.187c0,134.65,109.552,244.202,244.202,244.202
                                    c134.689,0,244.242-109.552,244.242-244.202C640.222,391.245,451.944,127.401,395.98,51.639z" />
                                <Path fill={index === 2 ? activeColor : deactiveTab} d="M411.179,717.835c-8.262,0-15.939-5.3-18.589-13.602c-3.235-10.249,2.417-21.2,12.666-24.475
                                    c78.023-24.864,138.041-86.714,160.605-165.438c2.963-10.405,13.797-16.446,24.086-13.367
                                    c10.328,2.962,16.33,13.757,13.367,24.085c-26.111,91.312-95.756,163.062-186.211,191.861
                                    C415.116,717.562,413.167,717.835,411.179,717.835z" />
                            
                        </Svg>

                        </View>
                        <Text style={[styles.itemText, {color: active.airdrop ? activeColor : 'white'}]}>{Languages.AIRDROP}</Text>
                    </TouchableOpacity>
                   
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('more')} 
                        activeOpacity={active.more ? 1 : undefined} 
                        style={[styles.tabIcon, active.more && activeTab ]}
                    >
                        <View style={[styles.svgIcon, {marginRight: 1 }]}>
                                <Svg viewBox="0 0 470.544 470.544" height="30" width="50" >
                                    <Path strokeWidth="100" fill={index === 3 ? activeColor : deactiveTab} d="M363.602,213.883c59.887,0,106.942-47.055,106.942-106.942S423.489,0,363.602,0S256.66,47.055,256.66,106.942
                                        S303.715-,213.883,363.602,213.883z M363.602,42.777c36.36,0,64.165,27.805,64.165,64.165s-27.805,64.165-64.165,64.165
                                        s-64.165-27.805-64.165-64.165S327.241,42.777,363.602,42.777z"/>
                                    <Path strokeWidth="0" fill={index === 3 ? activeColor : deactiveTab} d="M106.942,256.66C47.055,256.66,0,303.715,0,363.602s47.055,106.942,106.942,106.942s106.942-47.055,106.942-106.942
                                        S166.829,256.66,106.942,256.66L106.942,256.66z M106.942,427.767c-36.36,0-64.165-27.805-64.165-64.165
                                        s27.805-64.165,64.165-64.165s64.165,27.805,64.165,64.165C171.107,397.822,143.302,427.767,106.942,427.767z"/>
                                    <Path strokeWidth="0" fill={index === 3 ? activeColor : deactiveTab} d="M363.602,256.66c-59.887,0-106.942,47.055-106.942,106.942s47.055,106.942,106.942,106.942
                                        s106.942-47.055,106.942-106.942S423.489,256.66,363.602,256.66L363.602,256.66z M363.602,427.767
                                        c-36.36,0-64.165-27.805-64.165-64.165s27.805-64.165,64.165-64.165s64.165,27.805,64.165,64.165
                                        C427.767,397.822,399.962,427.767,363.602,427.767z"/>
                                    <Path strokeWidth="0" fill={index === 3 ? activeColor : deactiveTab} d="M106.942,0C47.055,0,0,47.055,0,106.942s47.055,106.942,106.942,106.942s106.942-47.055,106.942-106.942
                                        S166.829,0,106.942,0z M106.942,171.107c-36.36,0-64.165-27.805-64.165-64.165s27.805-64.165,64.165-64.165
                                        s64.165,27.805,64.165,64.165S143.302,171.107,106.942,171.107z"/>
                                </Svg>
                        </View>
                        <Text style={[styles.itemText, {color: active.more ? activeColor : 'white'}]}>{Languages.MORE}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        // height: dimensions.bottomTabHeight + (isIphoneX() ? 25 : 0),
        left: 0,
        right: 0,
        bottom: 0,
        width: deviceDimensions.width,
        backgroundColor: colors.tabBarColor,
        zIndex: 100,
    },

    tabCont: {
        flexDirection: 'row',
        alignItems: 'center',
        // height: '100%',
        ...ifIphoneX({
            marginBottom: 20
        }, {
            marginBottom: 0
        })
    },

    tabIcon: {
        padding: 10,
        paddingTop: 15,
        // height:'100%',
        alignItems: 'center',
        flex: 1,
        borderTopWidth: 4,
        borderTopColor: colors.tabBarColor
    },

    Icon: {
        //
    },

    itemText: {
        color: 'white',
        fontSize: 11,
        fontFamily: fonts.nunitoLight
    },

    svgIcon: {
        marginBottom: 6,
    },

    activeTab: {
        borderTopColor: '#55a60e',
    }
})

const mapStateToProps = (state) => ({
	walletStatus: state.wallet.get('homeStatus'),
  });
  
export default connect(mapStateToProps, { setHomeActive })(BottomTabBar);