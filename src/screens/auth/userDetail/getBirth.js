import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import InputComponent from './InputComponent';
import { colors } from '../../../constants/variables';
import { getAge } from '../../../utils/getAge';
import DatePicker from '../../../components/datePicker';
import { InputBox } from '../../../components/inputBox';
import {Languages} from '../../../components/Languages/All_languages';

const geneders = ['male', 'female']

class GetBirth extends Component {
    constructor(props) {
        super(props);
        this.state={
            dateOfBirth: '',
            validate: false,
            error: ''
        }
        Languages.setLanguage(global.code);
    }

    onDateChange = (dateOfBirth) => {this.setState({dateOfBirth, error: ''})}

    onContinue = () => {
    	const preData = this.props.navigation.getParam('data', {})
        let { dateOfBirth } = this.state;
        const nameRegex = /^[a-zA-Z ]{2,30}$/;
        if(getAge(dateOfBirth ? dateOfBirth : new Date()) < 18){
            this.setState({error:Languages.AGE_NOT_VALID })
            return
        }
        // console.log('ageis', getAge(dateOfBirth ? dateOfBirth : new Date()))
        const data = {...preData, dateOfBirth }
        this.props.navigation.navigate('getGender', {data})
    }

    render() {
        const { dateOfBirth, error, loading } = this.state;

        return (
            
           <InputComponent
                header= {Languages.WHAT_IS_BIRTH}
                onContinue = {()=>this.onContinue()}
                error={this.state.error}
            >
	            <View>
		            <Text style={[styles.birthWarn]}>
		            	{ Languages.BIRTH_WARN }
		            </Text>
	            </View>

                <DatePicker
                        onDateChange={this.onDateChange}
                        date={dateOfBirth}
                        inputStyle={{borderColor: 'transparent'}}
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


export default GetBirth;