import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Background from '../../../components/background';
import Container from '../../../components/Container';
import { colors, fonts, dimensions } from '../../../constants/variables';
import BottomButton from '../../../components/bottomButton';
import { withNavigation } from 'react-navigation';
import FontAwesomeIcon from 'react-native-vector-icons/dist/FontAwesome';
import BarLoader from '../../../components/loader/barLoader';
import {Languages} from '../../../components/Languages/All_languages';

class InputComponent extends Component {
    constructor(props) {
        super(props)
        Languages.setLanguage(global.code);
     }
       
    render() {
        const {  error, loadingTxt, loading, navigation, header, onContinue, children, subHeader, disableContinue } = this.props;
        return (
            <Background smallTopMargin type="light">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesomeIcon style={styles.backBtn} name="angle-left" size={35} color="black" />
                </TouchableOpacity>
                <Container style={[styles.container, this.props.style]}>
                    <View style={styles.header}>
                        <Text style={styles.headerTxt}>{header}</Text>
                        {subHeader !== undefined ? <Text style={{fontFamily: fonts.nunitoLight}}>{subHeader}</Text> : null}
                    </View>
                    {children}
                  
                    {error ? <Text style={styles.error}>{error}</Text> : null}
                    
                </Container>
                <BottomButton loading={loading}>
                    <TouchableOpacity disabled={disableContinue || loading} onPress={onContinue} activeOpacity={0.6} style={styles.bottomButton}>
                        <Text style={styles.continueTxt}>{Languages.CONTINUE}</Text>
                    </TouchableOpacity>
                </BottomButton>
            </Background>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        // height: '100%',
    },


    header: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginBottom: 20,
    },

    headerTxt: {
        fontSize: 24,
        color: '#000',
        fontFamily: fonts.exoSemiBold
    },

    inputBox: {
        borderWidth: 1,
        borderColor: colors.borderGrey,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        paddingHorizontal: 10,
        height: 40,
        fontFamily: fonts.nunitoLight
    },

    bottomButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: dimensions.bottomButtonHeight
    },

    resendCode: {
        justifyContent: 'flex-end',
    },

    continueTxt: {
        color:'black', 
        fontSize: 20, 
        fontFamily: fonts.exoSemiBold
    },

    resendBtn: {
        textAlign: 'right', 
        color: 'blue',
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

export default withNavigation(InputComponent);