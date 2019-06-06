import React, { Component } from 'react';
import { Text, View, StyleSheet, Platform, ToastAndroid, TouchableOpacity } from 'react-native';
import { deviceDimensions, colors, fonts } from '../../constants/variables';
import Background from '../../components/background';
import NumberPad from '../../components/numberPad';
import Container from '../../components/Container'
import IosToast from '../../components/customToast';
import Logo from '../../components/logo';
import FontAwesomeIcon from 'react-native-vector-icons/dist/FontAwesome';


let deviceWidth = deviceDimensions.width;
const fillColor = colors.textDark;
const emptyColor = colors.lightGrey;

class PinNumber extends Component {

  render() {
      const { password, title } = this.props;
    return (
        <View>
        <Text style={styles.pinTitle}>{title}</Text>
                <View style={styles.desView}>
                    <Text style={styles.description}>To Protect the security  of your AirWallet </Text>
                    <Text style={styles.description}>please register a 4-digit pin code. </Text>
                </View>
        <View style={styles.passCont}>
            <View style={styles.password}> 
                <View style={styles.pincode}>
                    <View style={[styles.pinCodes, {backgroundColor: password[0] ? fillColor : emptyColor}]}>
                        <Text style={[styles.keyboardNum, {marginTop:5}]}>{password[0] ? '*' : ' '}</Text>
                    </View>
                    <View style={[styles.pinCodes, {backgroundColor: password[1] ? fillColor : emptyColor}]}>
                        <Text style={[styles.keyboardNum, {marginTop:5}]}>{password[1] ? '*' : ' '}</Text>
                    </View>
                    <View style={[styles.pinCodes, {backgroundColor: password[2] ? fillColor : emptyColor}]}>
                        <Text style={[styles.keyboardNum, {marginTop:5}]}>{password[2] ? '*' : ' '}</Text>
                    </View>
                    <View style={[styles.pinCodes, {backgroundColor: password[3] ? fillColor : emptyColor}]}>
                        <Text style={[styles.keyboardNum, {marginTop:5}]}>{password[3] ? '*' : ' '}</Text>
                    </View>
                </View>
            </View></View>
        <Container style={styles.numCont}>
            <NumberPad onClickNum = {this.props.onClickNum}/>
        </Container>
        </View>
        
    );
  }
}


const styles = StyleSheet.create({
    background: {
        padding: 0,
    },

    logoCont: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

  container: {
    flex: 1,
    // marginBottom: 20,
  },

  passCont:{
    flex: 2,
    width:deviceWidth,
    alignItems:'center',
    justifyContent:'center',
    
    paddingTop: 0,
  },

  numCont:{
    backgroundColor:'white',
    flex: 7,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0,
    shadowRadius: 2,
    elevation: 5,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },

  pinTitle:{
    alignItems:'flex-start', 
    justifyContent:'flex-start',
    marginLeft: 40,
    marginTop: 20,
    fontSize: 25,
    color: "black",
    fontFamily: fonts.exoSemiBold,
  },

  password:{
    alignItems:'center',
    justifyContent:'center',
  },

  pinCodes: {
    // padding:12,
    borderWidth:0,
    borderColor:'white',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'white',
    borderRadius:100,
    marginHorizontal:15,
    height:15,
    width:15,
  },

  description: {
    color: colors.lightGrey,
    fontSize:15,
    alignItems:'flex-start', 
    justifyContent:'flex-start',
    marginLeft: 40,
    fontFamily: fonts.nunitoLight,
  },

  desView:{
    alignItems:'flex-start', 
    justifyContent:'flex-start',
    marginTop: 15,
  },

  pincode: {
      flexDirection:'row',
      paddingVertical:20,
  },

  keyboardNum: {
      color:'#444242', 
      fontSize:20, 
      fontWeight:'bold',
    },

    backBtn: {
        paddingLeft: 10,
        paddingTop: 10,
    }
});

export default PinNumber;