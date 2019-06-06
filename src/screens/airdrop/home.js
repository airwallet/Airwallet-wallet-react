import React, { Component } from 'react';
import { View, Text, StyleSheet, ToastAndroid, Platform, Image, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import Background from '../../components/background';
import Container from '../../components/Container';
import SearchBar from '../../components/searchbar';
import Svg,{ Path} from 'react-native-svg';
import { dimensions, colors, fonts } from '../../constants/variables';
import IosToast from '../../components/customToast';
import { icoList } from '../../constants/icoList';
import{Languages} from '../../components/Languages/All_languages'
const headerBg = '#e4e4e4';
const airDropColor = colors.orange;

class AirDrop extends Component {
    constructor(props) {
        super(props)
      Languages.setLanguage(global.code) 
    };
        
  
    showToast(message) {   
        if(Platform.OS === 'ios'){
            this.refs.iosToast.show(message);
        }else{
            ToastAndroid.show(message, ToastAndroid.SHORT);
        }
    }
  
    render() {
        let icoData = [];
        if(icoList.length){
            icoData = icoList.sort((a, b) => a.name.localeCompare(b.name))
        }
        return (
            <Background style={styles.background}>
                <IosToast positionValue={160} ref="iosToast"/>
                {/* <SearchBar openOption = {() => this.showToast('Open options')}/> */}
                <Container style={styles.container}>
                    <ScrollView style={styles.scrollView}>
                        <View style={styles.content} >
                            <View style={styles.birdchain} >
                                <View style={[styles.imgCon, {marginRight: 5}]}>
                                    <Image  style={[styles.image, {width: '100%'}]} source={require('../../images/insureum.png')}/>
                                </View>
                                <ImageBackground imageStyle={{ borderRadius: 5 }} source={require('../../images/birdchain.png')} style={[styles.imgCon, {marginLeft: 5}]}>
                                    <Text style={styles.birdchainTxt}>{Languages.BIRDCHAIN}</Text>
                                </ImageBackground>
                            </View>
                            {
                                icoData.length && icoData.map((item, index)=> {
                                    return <TouchableOpacity 
                                                key={item.key} 
                                                onPress={() => this.props.navigation.navigate('projectIntro', {name: item.name, image: item.image})} 
                                                style={styles.cryptoList}
                                            >
                                                <View style={styles.listRow}>
                                                    <View style={styles.cyptoImage}>
                                                        <Image style={styles.image} source={item.image}/>
                                                    </View>
                                                    <View style={styles.cyptoTitle}>
                                                        <Text style={styles.cyptoTitleTxt}>{item.name}</Text>
                                                        <Text numberOfLines={2} style={styles.cyptoTitleDes}>{item.description}</Text>
                                                    </View>
                                                    <View style={styles.cyptoImage}>
                                                        <Svg viewBox="0 0 37 51" height="40" width="50">
                                                            <Path strokeWidth="0" fill={airDropColor} d="M22.66 6.27C21.51 4.57 20.48 3.01 19.53 1.58C19.4 1.37 19.19 1.17 18.99 1.03C18.17 0.49 17.08 0.76 16.54 1.58C15.65 3.01 14.63 4.5 13.41 6.27C8.03 14.17 0 26.08 0 32.88C0 37.85 2.04 42.34 5.31 45.61C8.57 48.81 13.07 50.85 18.03 50.85C23 50.85 27.49 48.81 30.76 45.54C34.03 42.27 36.07 37.78 36.07 32.81C36.07 26.01 28.04 14.17 22.66 6.27ZM28.31 43.09C25.66 45.75 22.05 47.31 18.03 47.31C14.02 47.31 10.41 45.68 7.76 43.09C5.1 40.44 3.54 36.83 3.54 32.81C3.54 27.1 11.23 15.73 16.33 8.18C16.95 7.29 17.49 6.41 18.03 5.66C18.58 6.41 19.12 7.29 19.74 8.18C24.84 15.8 32.53 27.1 32.53 32.81C32.53 36.83 30.9 40.44 28.31 43.09ZM28.58 31.59C27.63 31.52 26.81 32.27 26.75 33.22C26.68 34.72 26.2 36.15 25.45 37.37C24.7 38.6 23.61 39.69 22.32 40.37C21.51 40.85 21.16 41.93 21.64 42.75C22.19 43.7 23.27 43.98 24.09 43.5C25.93 42.48 27.43 40.98 28.45 39.28C29.54 37.58 30.15 35.54 30.22 33.43C30.28 32.47 29.54 31.66 28.58 31.59Z" stroke="black" />
                                                        </Svg>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                })
                            }
                            
                    </View>
                    </ScrollView>
                </Container>
                {/* <BottomTabBar {...this.props}/> */}
            </Background>
        );
    }
}

export default AirDrop;

const styles = StyleSheet.create({

    container: {
        marginTop: 5,
        padding: 0,
        paddingTop: 10,
        marginBottom: (dimensions.bottomTabHeight - 10),
        flex: 1,
    },

    content: {
        flex: 1,
        height: '100%',
    },

    birdchain: {
        height: 110,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: headerBg,
        padding: 10, 
        margin: 6,
        borderRadius: 5,
        marginBottom: 20,
    },

    imgCon: {
       flex: 1,
       height: '100%',
    },

    image: {
        height: '100%',
        width: '90%',
        borderRadius: 5,
    },

    birdchainTxt: {
        color: 'white',
        padding: 5,
        fontFamily: fonts.nunitoRegular
    },

    cryptoList: {
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderGrey,
        paddingBottom: 5,
        marginHorizontal: 10,
    },

    listRow: {
        flexDirection: 'row',
        // marginHorizontal: 10,
    },

    cyptoImage: {
        padding: 10,
        height: 80,
        width: 80,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },

    cyptoTitle: {
        flex: 2,
        padding: 10,
        justifyContent: 'center',
    },

    cryptoDrop: {
        flex: 1,
        paddingVertical: 10,
    },

    cyptoTitleTxt: {
        fontSize: 20,
        color:'#262626',
        fontWeight: 'bold',
        fontFamily: fonts.nunitoLight
    }, 

    cyptoTitleDes: {
        fontSize: 12, 
        fontFamily: fonts.nunitoLight
    }
   
})