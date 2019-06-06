import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

class Container extends Component {
    render() {
        return (
            <View style={[styles.container, this.props.style]}>
         
               {this.props.children}  
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 6,
        backgroundColor:'white',
        // borderTopRightRadius: 5,
        // borderTopLeftRadius: 5,
        zIndex: 0,
    }
})

export default Container;