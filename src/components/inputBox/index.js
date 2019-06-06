import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { colors, fonts } from '../../constants/variables';

export const InputBox = (props) => {
    const editable = props.editable === false ? false : true;

    return <TextInput 
        style={[styles.inputBox, props.inputStyle]}
        placeholder={props.placeholder}
        onChangeText={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
        keyboardType={props.keyboardType !== undefined ? props.keyboardType : 'default'}
        secureTextEntry={props.isPassword}
        editable={editable}
    />
}

const styles = StyleSheet.create({
    inputBox: {
        borderWidth: 1,
        borderColor: colors.borderGrey,
        borderRadius: 50,
        backgroundColor: colors.insideGrey,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        paddingHorizontal: 20,
        height: 40,
        fontFamily: fonts.nunitoLight
    },
})