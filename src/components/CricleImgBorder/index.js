import React,{ component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, fonts } from '../../constants/variables';
import Icon from 'react-native-vector-icons/dist/Feather';

const AddButton = (props) => {
    const { disabled = false } =  props;
   
    return (
        
        <TouchableOpacity disabled={disabled} activeOpacity={0.6} onPress={props.onPress} style={[styles.listRow, props.style]}>
            <View style={[styles.roundIcon, props.roundIcon]}>
                {props.icon ? props.icon : <Icon name="plus" style={[props.iconStyle]} color="#2d2c2c" size={20} />}
            </View>
            <Text style={styles.title}>
                {props.title}
            </Text>
        </TouchableOpacity>
    );
}
export default AddButton

const styles = StyleSheet.create({
    
    roundIcon: {
        width: 30,
        height: 30,
        borderRadius: 150 / 2,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    listRow: {
		flexDirection: 'row',
		marginHorizontal: 10,
		alignItems: 'center',
		justifyContent: 'center',
		elevation: 50,
    },
    
    title: {
        color: '#2d2c2c',
        fontSize: 15, 
        marginLeft: 10,
        fontFamily: fonts.nunitoLight,
    }
})