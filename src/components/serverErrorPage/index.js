import React, { Component } from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'
//import {Languages}  from '../../components/Languages/All_languages'
import SplashScreen from 'react-native-splash-screen';
import {fonts,colors} from '../../constants/variables'
import FontAwesomeIcon from 'react-native-vector-icons/dist/FontAwesome';
import { RadioButton } from '../radioButton';
class ServerError extends Component {
   
    render() { 
        SplashScreen.hide();
        return (
             <View style={styles.container}>
                <View>
                  <View style={styles.Img}>
                      <FontAwesomeIcon name="exclamation-triangle" size={100} color={colors.tabBarColor} />
                  </View> 
                </View>
                <View>
                  <Text style={styles.titleTxt}>Server Error</Text> 
                </View>
                <View>
                  <Text style={styles.msgTxt}>Server not found</Text> 
                </View>
                <TouchableOpacity style={styles.btnstyle}>
                  <Text style={styles.btnTxt}>Try Again</Text> 
                </TouchableOpacity>
             </View>     
        );
    }
}
const styles=StyleSheet.create({ 
    container: {
    flex:1, 
     backgroundColor:'white',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'column',
 
    } ,  
    Img:{
        
        justifyContent: 'center',
        alignItems: 'center',
        height:100,
        width:100,
      
    },
    titleTxt: {
         
        textAlign: 'center',
        fontSize: 22,
        fontWeight: '500',
        fontFamily: fonts.nunitoLight,
       
    },
    btnTxt: {
        color:'#fff',
        textAlign: 'center',
        fontSize: 15,
      
        fontFamily: fonts.nunitoBold,
    },
    btnstyle:{
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:2,
        paddingRight:10,
        paddingLeft:10,
        paddingBottom:5,
      
     
        marginTop:10,
        textAlign:'center',
        backgroundColor: colors.tabBarColor,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    }
});
export default ServerError;