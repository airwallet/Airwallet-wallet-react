import React, { Component } from 'react';
import { View, Text, Animated, ListView, StyleSheet, ToastAndroid, Platform, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import Background from '../../components/background'
import Container from '../../components/Container'
import SearchBar from '../../components/searchbar'
import { dimensions, colors, deviceDimensions, fonts } from '../../constants/variables'
import IosToast from '../../components/customToast'
import CricleImgBorder from '../../components/CricleImgBorder'
import Icon from 'react-native-vector-icons/dist/Feather';
import OptionsMenu from '../../components/optionsMenu';
import AllCurrenciesList from '../../components/currenciesList';
import { walletsList } from '../../constants/walletsList';
import Collapsible from '../../components/collapsibleList';
import {Languages} from '../../components//Languages/All_languages'


class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
        Languages.setLanguage(global.code);
    }

    signIn = ()=> {
        this.props.onSignIn()
    }
    
    render() {
        return (
            <View style={styles.container}>
                <TextInput 
                        style={[styles.inputBox, this.props.inputStyle]}
                        placeholder={Languages.EMAIL}
                        onChangeText={(text) => this.setState({email: text})}
                        value={this.state.email}
                    />
                <TextInput 
                        style={[styles.inputBox, this.props.inputStyle]}
                        placeholder={Languages.PASSWORD}
                        onChangeText={(text) => this.setState({email: text})}
                        value={this.state.password}
                    />
                
                <View style={styles.actionBtn}>
                    <TouchableOpacity style={styles.btn}>
                        <Text style={{fontFamily: fonts.nunitoLight}}>{Languages.REGISTER}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.signIn} activeOpacity={0.6} style={[styles.btn, styles.signIn]}>
                        <Text style={{color: colors.orange, fontFamily: fonts.nunitoLight}}>{Languages.SIGN_IN}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default SignIn;

const styles = StyleSheet.create({
    container: {
        padding: 10
    },

    inputBox: {
        borderColor: colors.borderGrey,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingLeft: 10,
        padding: 10,
        fontFamily: fonts.nunitoLight
    },

    actionBtn: {
        flexDirection: 'row', 
        justifyContent: 'flex-end',
    },

    btn: {
        margin: 5,
        borderColor: colors. borderGrey,
        borderWidth: 1,
        borderRadius: 5,
        // marginBottom: 5,
        marginHorizontal: 10,
        paddingVertical: 5,
        paddingHorizontal: 15,
    },
     signIn: {
        //  backgroundColor: colors.darkBlue,
         borderColor: colors.orange,
     }
})