import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {  colors,fonts  } from '../../constants/variables';
 
class Card extends React.Component{
    render() {
        const { active, onPress, text } = this.props;
        const borderColor = active === text ? colors.yellow : colors.grey;
        return ( 
         <TouchableOpacity style={[styles.Card, { borderColor }]} onPress={() => onPress(text)}>
             <Text style={{fontSize:12, fontFamily:fonts.nunitoRegular}}>{text}</Text>
         </TouchableOpacity>
        )
    }
}
     
        
const styles = StyleSheet.create({
    Card:
    {
      flexDirection: 'column',
      padding:5,
      width:'25%',
      height:35,
      justifyContent:'center',
      alignItems:'center', 
      margin:3,
      borderRadius:5,
      borderWidth:1,
      borderColor:colors.grey,
      elevation:1
    },
    
}) 
export default Card;
 
