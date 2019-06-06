import React, { Component } from 'react';
import {getAsyncStorage } from '../../utils/asyncStorage';
import { USER_INFO } from '../../constants/api';
import {fonts} from '../../constants/variables'

import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  NetInfo,
  Animated,
  
  TouchableOpacity,
  Dimensions
} from 'react-native';
 
//const barWidth = width;
// const barHeight = 20;
 //ddc4d638-4e53-419e-863f-68f5b95a56c1
 // thread carriage argument buy tool cave bomber year cultivate meet constant eanemy
class VerifyEmailNotification extends Component {
    state={
        txtHeigh: new Animated.Value(0),
    }
    
    
      
                          
 onShow(){
     
    Animated.timing(                   
        this.state.txtHeigh,            
        {
          toValue: 40,                   
          duration: 1000,              
        }
      ).start(); 
 }
 
  render() 
     { 
        let {txtHeigh}=this.state
        const {confirmed} =this.props.getUserInfo  
        let visiable='none'
        if(!confirmed){
            visiable='flex'
            this.onShow()
         }
        return <View/>
        return (
        <Animated.View                 
            style={[styles.box,{display:visiable,height:txtHeigh} ]}
             >
            
         {/* // <View style={[styles.box,{height:fadeAnim}]}> */}
                
             <Text style={styles.msgTxt} >Verify Your Email</Text> 
                <TouchableOpacity >
                    <Text style={styles.btnTxt}>Resend</Text> 
                </TouchableOpacity>
         {/* // </View>    */}
          </Animated.View>
        );
    }
 }
 
 const styles = StyleSheet.create({
     
      box: {
          
    
         width:'100%',
         justifyContent:'space-between',
         backgroundColor:'#ffea00',
         alignItems:'center',
         flexDirection:'row',
         paddingLeft: 20,
         paddingRight: 20,
        
     },
     msgTxt: {
         
         textAlign: 'center',
         fontSize: 15,
         fontFamily: fonts.nunitoLight,
         fontWeight: '200',
     },
     btnTxt: {
         textAlign: 'center',
         fontSize: 15,
         fontWeight: '500',
         fontFamily: fonts.nunitoBold,
     }
 });

 const mapStateToProps = (state) => ({
	getUserInfo: state.userInfo.get('userInfo'),
  });
  
export default connect(mapStateToProps, { })(VerifyEmailNotification);       
 
 


