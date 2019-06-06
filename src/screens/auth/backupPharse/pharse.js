import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, BackHandler } from 'react-native';
import Svg,{ Path} from 'react-native-svg';
import { fonts } from '../../../constants/variables';
import Loader from '../../../components/loader';
import {Languages} from '../../../components/Languages/All_languages'
const descColor = '#747474';
const phraseBg = '#b8b7b7';
const headColor = '#1b1b1b';
const iconColor = '#a6a4a4';

class Pharse extends Component {
    constructor(props) {
        super(props)
        Languages.setLanguage(global.code) 
    }
    render() {
        const { secretString, generatingPhrase } = this.props;
        let backupPhrase =  null;
        if(generatingPhrase){
            backupPhrase = <Loader loadingTxt={Languages.BACK_PHARE_GENERATING}/>
        }else{
            backupPhrase = secretString ? <Text style={styles.secretTxt}>{secretString}</Text> : null
        }
        return (
            <View>
                <View style={styles.description}>
                    <Text style={styles.descriptionTxt}>
                  {Languages.BACK_PHARE_THERE_WORDS}
                    </Text>
                </View>
                <View style={styles.secretWord}>
                   {backupPhrase}
                </View>
                <View style={[styles.header, {paddingVertical: 20, padding: 20}]}>
                    <View style={{alignItems: 'center', justifyContent: 'center',}}>
                        <Svg viewBox="0 0 60 60" height="50" width="40">
                            <Path strokeWidth="0" fill= {iconColor} d="M60.13 32.11L60.13 28.12C60.13 27.57 59.68 27.12 59.13 27.12L44.17 27.12L44.17 7.19C44.17 6.64 43.73 6.19 43.18 6.19L35.09 6.19C36.43 4.88 37.19 3.08 37.19 1.21C37.19 0.66 36.75 0.21 36.2 0.21C33.74 0.21 31.47 1.51 30.21 3.61C28.95 1.51 26.68 0.21 24.23 0.21C23.68 0.21 23.23 0.66 23.23 1.21C23.23 3.08 23.99 4.88 25.34 6.19L17.25 6.19C16.7 6.19 16.25 6.64 16.25 7.19L16.25 27.12L1.29 27.12C0.74 27.12 0.3 27.57 0.3 28.12L0.3 32.11C0.3 32.66 0.74 33.1 1.29 33.1L34.04 33.1L28.06 35.1L13.26 35.1C13 35.1 12.74 35.2 12.55 35.39L8.27 39.67L6.98 38.38C6.6 37.99 5.96 37.99 5.57 38.38L0.59 43.36C0.2 43.75 0.2 44.38 0.59 44.77L15.55 59.73C15.94 60.11 16.57 60.11 16.96 59.73L21.94 54.74C22.33 54.35 22.33 53.72 21.94 53.33L21.78 53.17L27.54 49.05L47.16 49.05C47.41 49.05 47.65 48.96 47.84 48.79L58.68 38.86C60.32 37.36 60.6 34.89 59.35 33.06C59.8 32.96 60.12 32.57 60.13 32.11ZM35.07 2.33C34.64 4.18 33.19 5.63 31.34 6.06C31.77 4.21 33.22 2.76 35.07 2.33ZM29.09 6.06C27.23 5.63 25.79 4.18 25.35 2.33C27.21 2.76 28.65 4.21 29.09 6.06ZM18.25 8.18L42.18 8.18L42.18 27.12L31.46 27.12L39.98 15.76C40.25 15.41 40.25 14.92 39.98 14.56L36.99 10.58C36.8 10.33 36.51 10.18 36.2 10.18L24.23 10.18C23.92 10.18 23.62 10.33 23.43 10.58L20.44 14.56C20.17 14.92 20.17 15.41 20.44 15.76L28.97 27.12L18.25 27.12L18.25 8.18ZM25.53 16.16L27.68 22.09L23.23 16.16L25.53 16.16ZM23.23 14.17L24.73 12.17L27.8 12.17L25.81 14.17L23.23 14.17ZM27.65 16.16L32.78 16.16L30.21 23.21L27.65 16.16ZM28.63 14.17L30.21 12.58L31.79 14.17L28.63 14.17ZM34.61 14.17L32.62 12.17L35.7 12.17L37.19 14.17L34.61 14.17ZM37.19 16.16L32.74 22.09L34.9 16.16L37.19 16.16L37.19 16.16ZM2.29 31.11L2.29 29.12L58.13 29.12L58.13 31.11L2.29 31.11ZM42.92 33.68C42.81 33.48 42.69 33.28 42.55 33.1L51.52 33.1L44.79 39.08L41.25 39.08C43.21 38.05 43.95 35.63 42.92 33.68ZM16.25 57.61L2.7 44.07L6.28 40.49L19.83 54.04L16.25 57.61ZM57.34 37.39L46.78 47.06L27.22 47.06C27.01 47.06 26.81 47.12 26.64 47.24L20.35 51.74L9.68 41.08L13.67 37.09L28.22 37.09C28.32 37.09 28.43 37.07 28.53 37.04L38.73 33.64C39.79 33.29 40.93 33.86 41.28 34.91C41.64 35.96 41.07 37.11 40.02 37.46C39.98 37.47 39.94 37.48 39.9 37.49L34.07 39.08L31.21 39.08L31.21 41.08L45.17 41.08C45.41 41.08 45.65 40.99 45.83 40.83L53.82 33.73C54.28 33.33 54.86 33.1 55.46 33.1L55.67 33.1C57.03 33.1 58.14 34.2 58.14 35.56C58.14 36.26 57.85 36.92 57.34 37.39ZM4.58 43.78L5.99 42.37L8.98 45.36L7.57 46.77L4.58 43.78ZM47.16 4.2L49.16 4.2L49.16 6.19L47.16 6.19L47.16 4.2ZM49.16 2.2L51.15 2.2L51.15 4.2L49.16 4.2L49.16 2.2ZM51.15 4.2L53.15 4.2L53.15 6.19L51.15 6.19L51.15 4.2ZM49.16 6.19L51.15 6.19L51.15 8.18L49.16 8.18L49.16 6.19ZM58.13 1.21L60.13 1.21L60.13 3.2L58.13 3.2L58.13 1.21ZM50.16 12.17L52.15 12.17L52.15 14.17L50.16 14.17L50.16 12.17ZM9.27 11.17L11.27 11.17L11.27 13.17L9.27 13.17L9.27 11.17ZM9.27 15.16L11.27 15.16L11.27 17.16L9.27 17.16L9.27 15.16ZM11.27 13.17L13.26 13.17L13.26 15.16L11.27 15.16L11.27 13.17ZM7.28 13.17L9.27 13.17L9.27 15.16L7.28 15.16L7.28 13.17ZM0.3 6.19L2.29 6.19L2.29 8.18L0.3 8.18L0.3 6.19ZM9.27 1.21L11.27 1.21L11.27 3.2L9.27 3.2L9.27 1.21Z" />
                        </Svg>
                    </View>
                    <Text style={{color: headColor, textAlign: 'center', marginTop: 10,fontFamily: fonts.nunitoLight, }}>{Languages.BACK_PHARE_PLEASE_WRITE}</Text>
                </View>
            </View> 
        );
    }
}

const styles = StyleSheet.create({

    description: {
       paddingVertical: 10, 
       paddingHorizontal: 30,
       marginBottom: 15,
    },

    descriptionTxt: {
        textAlign: 'center',
        fontSize: 15,
        color: descColor,
        fontFamily: fonts.nunitoLight
    },

    secretWord: {
        paddingVertical: 15, 
        paddingHorizontal: 30,
        backgroundColor: phraseBg,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.5,
                shadowRadius: 1,
            },
            android: {
              elevation: 2,
            },
          }),
    },

    secretTxt: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        fontFamily: fonts.nunitoLight,
    },
})

export default Pharse;