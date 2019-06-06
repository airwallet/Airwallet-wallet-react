import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { deviceDimensions, colors } from '../../constants/variables';

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
let deviceWidth = deviceDimensions.width;
const underlayColor = colors.orange;

class NumberPad extends Component {
    render() {
        return (
            <View style={styles.numberPad}>
                <View style={styles.numView}>
                    <View style={styles.numberCont}>
                        <TouchableHighlight underlayColor= {underlayColor} 
                            onPress={() => this.props.onClickNum(1)} 
                            style={styles.number}
                        >
                            <Text style={styles.keyboardNum}>1</Text>
                      
                        </TouchableHighlight>  
                        <TouchableHighlight 
                            underlayColor= {underlayColor} 
                            onPress={() => this.props.onClickNum(2)} 
                            style={styles.number}
                        >
                            <Text style={styles.keyboardNum}>2</Text>
                           
                        </TouchableHighlight>  
                        <TouchableHighlight 
                            underlayColor= {underlayColor} 
                            onPress={() => this.props.onClickNum(3)} 
                            style={styles.number}
                        >
                            <Text style={styles.keyboardNum}>3</Text>
                           
                        </TouchableHighlight>  
                    </View>
                    <View style={styles.numberCont}>
                        <TouchableHighlight underlayColor= {underlayColor} 
                            onPress={() => this.props.onClickNum(4)} 
                            style={styles.number}
                        >
                            <Text style={styles.keyboardNum}>4</Text>
                      
                        </TouchableHighlight>  
                        <TouchableHighlight 
                            underlayColor= {underlayColor} 
                            onPress={() => this.props.onClickNum(5)} 
                            style={styles.number}
                        >
                            <Text style={styles.keyboardNum}>5</Text>
                           
                        </TouchableHighlight>  
                        <TouchableHighlight 
                            underlayColor= {underlayColor} 
                            onPress={() => this.props.onClickNum(6)} 
                            style={styles.number}
                        >
                            <Text style={styles.keyboardNum}>6</Text>
                           
                        </TouchableHighlight>  
                    </View>
                    <View style={styles.numberCont}>
                        <TouchableHighlight underlayColor= {underlayColor} 
                            onPress={() => this.props.onClickNum(7)} 
                            style={styles.number}
                        >
                            <Text style={styles.keyboardNum}>7</Text>
                      
                        </TouchableHighlight>  
                        <TouchableHighlight 
                            underlayColor= {underlayColor} 
                            onPress={() => this.props.onClickNum(8)} 
                            style={styles.number}
                        >
                            <Text style={styles.keyboardNum}>8</Text>
                           
                        </TouchableHighlight>  
                        <TouchableHighlight 
                            underlayColor= {underlayColor} 
                            onPress={() => this.props.onClickNum(9)} 
                            style={styles.number}
                        >
                            <Text style={styles.keyboardNum}>9</Text>
                           
                        </TouchableHighlight>  
                    </View>
                    
                </View>
                <View style={[styles.numView, {justifyContent: 'center'}]}>
                    <TouchableHighlight underlayColor= {underlayColor} onPress={() => this.props.onClickNum('0')} style={[styles.number, {alignSelf:'center', justifyContent: 'center'}]}>
                        <Text style={styles.keyboardNum}>0</Text>
                    </TouchableHighlight> 
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    numberPad: {
        justifyContent: 'center', 
        alignItems: 'center',
        flex: 1,
    },

    numView:{
        // flexDirection:'row',
        width: deviceWidth,
        flexWrap: 'wrap',
        justifyContent:'space-between',
        alignItems:'center',
    },

    numberCont: {
        alignItems:'center', 
        justifyContent:'space-between', 
        flexDirection: 'row', 
        width: '80%', 
        marginBottom: 10,
    },  

    number: {    
        borderWidth:1,
        borderColor:'grey',
        alignItems:'center',
        justifyContent:'center',
        width: 90,
        marginHorizontal: 2,
        height:60,
        // height: deviceWidth / 5,
        backgroundColor:'#FFF',
        borderRadius:10,
        
    },

    keyboardNum: {
        color:'black', 
        fontSize:30, 
        fontWeight:'200',
    },
})

export default NumberPad;