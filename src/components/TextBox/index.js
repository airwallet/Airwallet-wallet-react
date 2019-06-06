import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { colors, fonts } from '../../constants/variables';

export const TextBox = (props) => {
    return <Text
        style={[styles.textBox, props.style]}
        numberOfLines = {props.numberOfLines}
        >
            {props.children ? props.children : null}
        </Text>
}

const styles = StyleSheet.create({
    textBox: {
        fontFamily: fonts.nunitoLight
    },
})