import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import common from '../../../constants/action-types/common';
import Loader from './loader';
import { colors } from '../../../constants/variables';

class BarLoader extends Component {
    render(){
        const { 
            loading, 
            color=colors.orange, 
            borderWidth=0, 
            height = 4, 
            unfilledColor = '#fff', 
            width=Dimensions.get('window').width, 
            borderColor='transparent' 
        } = this.props;
        return (
            <View>
                {loading && <Loader
                    height = {height}
                    indeterminate={loading}
                    color={color}
                    unfilledColor={unfilledColor}
                    width={width}
                    borderRadius={0}
                    borderColor={borderColor}
                    borderWidth={borderWidth}
                />}
            </View>
        )
    }
}

export default BarLoader;