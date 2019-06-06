import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, ToastAndroid, Platform, Image } from 'react-native';
import Background from '../../../components/background';
import Container from '../../../components/Container';
import Svg,{ Path } from 'react-native-svg';
import { colors, dimensions, fonts } from '../../../constants/variables';
import IosToast from '../../../components/customToast';
// import { currencies } from '../../../constants/currenciesList';
import {Languages} from '../../../components/Languages/All_languages';
import Loader from '../../../components/loader';
import { POST } from '../../../utils/api/Request';
import { EXCHANGES } from '../../../constants/api';
import {TextBox} from '../../../components/TextBox';
import FeatherIcons from 'react-native-vector-icons/dist/Feather';
import Exchange from './exchange';
import IoniconsIcon from 'react-native-vector-icons/dist/MaterialIcons'

const currencies = [
    {
        symbol: "BNB",
    },
    {
        symbol: "BTC",
    },
    {
        symbol: "ETH",
    },
    {
        symbol: "PAX",
    },
    {
        symbol: "BNB",
    },
    {
        symbol: "BNB",
    },
    {
        symbol: "BNB",
    },
    {
        symbol: "BNB",
    },
    {
        symbol: "BNB",
    },
]

class ExchangesDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'exchange',
        }
        Languages.setLanguage(global.code);
    }

    changeTab = (activeTab) => {
        this.setState({activeTab})
    }

    render() {
        const { activeTab } = this.state;

        const activeTabStyle = {
            borderBottomWidth: 2
        }

        const activeTabTxt = {
            color: colors.textDark
        }
     
        return (
            <Background style={styles.background} type="dark">
                <IosToast positionValue={160} ref="iosToast"/>
                <Container style={styles.container}>
                    <View style={styles.content}>
                        <View style={styles.header}>
                            <View>
                                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                    <FeatherIcons color={colors.lightGrey} size={20} name="arrow-left" style={{marginRight: 10}}/>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.headerCenter}>
                                <TextBox style={styles.headerTitle}>binance</TextBox>
                            </View>
                            <View style={styles.settings}>
                                <TouchableOpacity>
                                    <FeatherIcons color={colors.lightGrey} size={18} name="search" style={{marginRight: 10}}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        <View style={styles.tabBar}>
                            <TouchableOpacity onPress={() => this.changeTab('exchange')} style={[styles.tab, activeTab === 'exchange' ? activeTabStyle : {}]}>
                                <TextBox style={[styles.tabTxt, activeTab === 'exchange' ? activeTabTxt : {}]}>Exchange</TextBox>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.changeTab('blance')} style={[styles.tab, activeTab === 'blance' ? activeTabStyle : {}]}>
                                <TextBox style={[styles.tabTxt, activeTab === 'blance' ? activeTabTxt : {}]}>Blance</TextBox>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.changeTab('history')} style={[styles.tab, activeTab === 'history' ? activeTabStyle : {}]}>
                                <TextBox style={[styles.tabTxt, activeTab === 'history' ? activeTabTxt : {}]}>History</TextBox>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.currencyList}>
                            <ScrollView horizontal={true} style={styles.scroll}>
                            <TouchableOpacity><TextBox style={styles.currencyTxt}>
                                    <IoniconsIcon name="star" size={20} />
                                </TextBox></TouchableOpacity>
                                {currencies.map(item => <TouchableOpacity><TextBox style={styles.currencyTxt}>{item.symbol}</TextBox></TouchableOpacity>)}
                           </ScrollView>
                        </View>
                        <View>
                            <Exchange/>
                        </View>
                        <ScrollView style={styles.scroll}>
                           
                        </ScrollView>
                    </View>
                </Container>
            </Background>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        // paddingBottom: 40,
        // padding: 0
    }, 

    container : {
        // marginTop: 15,
        padding: 0,
        marginBottom: (dimensions.bottomTabHeight),
    },

    content: {
        width: '100%',
        height: '100%'
    },

    scroll: {
        // padding: 10,
        paddingTop: 0,
    },

    header: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
        marginBottom: 10
    },

    headerCenter: {
        alignItems: 'center'
    },

    settings: {
        flexDirection: 'row'
    },

    headerTitle: {
        fontSize: 20,
        flexDirection: 'column'
    },

    headerDes: {
        fontSize: 10,
    },

    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    tab: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderBottomColor: '#78BEE4',
        width: "33.33%"
    },

    tabTxt: {
        fontSize: 18,
        color: colors.lightGrey,
        fontWeight: 'bold',
    },

    currencyList: {
        padding: 10
    },

    currencyTxt: {
        borderColor: colors.lightGrey,
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginHorizontal: 5,
        borderRadius: 5,
        color: colors.lightGrey
    }
})

export default ExchangesDetail;
