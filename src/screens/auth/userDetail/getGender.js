import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import InputComponent from './InputComponent';
import { colors } from '../../../constants/variables';
import RadioButton from '../../../components/radioButton/radio';
import { InputBox } from '../../../components/inputBox';
import {Languages} from '../../../components/Languages/All_languages';

const geneders = ['male', 'female', 'other']

class GetGender extends Component {
    constructor(props) {
        super(props);
        this.state={
            sex: 0,
            validate: false,
            error: ''
        }
        Languages.setLanguage(global.code);
    }

    onSexChange = (sex) => {this.setState({sex, error: ''})}

    onContinue = () => {
    	const preData = this.props.navigation.getParam('data', {})
        let { sex } = this.state;
        const data = {...preData, sex: geneders[sex] }
        this.props.navigation.navigate('getEmail', {data})
    }

    render() {
        const { sex, error, loading } = this.state;

        return (
            
           <InputComponent
                header= {Languages.WHAT_IS_GENDER}
                onContinue = {()=>this.onContinue()}
                error={this.state.error}
            >
	            <View>
		            <Text style={[styles.birthWarn]}>
		            	{ Languages.GENDER_WARN }
		            </Text>
	            </View>

                <RadioButton
                            male={Languages.MALE}
                            female={Languages.FEMALE}
                            other={Languages.OTHER}
                            onPress={this.onSexChange}
                />
                
            </InputComponent>
        );
    }
}

const styles = StyleSheet.create({

    birthWarn: {
        color: colors.textGrey,
        fontSize: 15,
        marginBottom: 15,
    }
})


export default GetGender;