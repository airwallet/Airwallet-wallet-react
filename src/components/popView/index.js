import React, { Component } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';

class PopView extends Component {
    render() {
        return (
            <Modal transparent={true}
                    visible={this.props.visible}
                    onRequestClose={this.props.onRequestClose}>
                <TouchableOpacity 
                    activeOpacity={1} 
                    onPress={this.props.onRequestClose} 
                    style={[styles.container, this.props.containerStyle]}>
                    <TouchableOpacity 
                        activeOpacity={1} 
                        onPress={() => {}} 
                        style={[styles.children, this.props.style]}
                    >
                        {this.props.children}
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
        );
    }
}

export default PopView;

const styles = StyleSheet.create({
    children : {
        height: 300,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    }
})