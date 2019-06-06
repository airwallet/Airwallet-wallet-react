import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import InputComponent from './InputComponent';
import { colors } from '../../../constants/variables';
import { InputBox } from '../../../components/inputBox';
import {Languages} from '../../../components/Languages/All_languages';
import { clearAsyncStorage } from '../../../utils/asyncStorage';

class GetName extends Component {
    constructor(props) {
        super(props);
        this.state={
            firstName: '',
            lastName: '',
            validate: false,
            error: ''
        }
        Languages.setLanguage(global.code);
        clearAsyncStorage();
    }
        
    
    handleChange = (name, value) => {
        this.setState({[name]: value, error: ''})
    }

    onContinue = () => {
        const { firstName, lastName } = this.state;
        const nameRegex = /^[a-zA-Z ]{2,30}$/;
        if(!nameRegex.test(firstName)){
            this.setState({error:Languages.FIRST_NAME_NOT_VALID})
            return
        }else if(!nameRegex.test(lastName)){
            this.setState({error: Languages.LAST_NAME_NOT_VALID})
            return
        }
        // console.log('ageis', getAge(dateOfBirth ? dateOfBirth : new Date()))
        const data = {firstName, lastName}
        this.props.navigation.navigate('getBirth', {data})
    }
   

    render() {
        const { firstName, lastName, error, loading } = this.state;
        const input1 = {
            placeholder: Languages.FIRST_NAME_PLACEHOLDER,
            name: 'firstName',
            value: this.state.firstName
        }
        const input2 = {
            placeholder:Languages.LAST_NAME_PLACEHOLDER,
            name: 'lastName',
            value: this.state.lastName
        }
        return (
            
           <InputComponent
                header= {Languages.WHAT_IS_NAME}
                onContinue = {()=>this.onContinue()}
                error={this.state.error}
            >
                <InputBox
                    placeholder = {Languages.FIRST_NAME_PLACEHOLDER}
                    value={firstName}
                    onChange = {(text) => this.handleChange('firstName', text)}
                />
                <InputBox
                    placeholder = {Languages.LAST_NAME_PLACEHOLDER}
                    value={lastName}
                    onChange = {(text) => this.handleChange('lastName', text)}
                />
                
            </InputComponent>
        );
    }
}

export default GetName;