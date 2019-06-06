import React, { Component } from 'react';
import { StyleSheet } from 'react-native'
import DatePicker from './datepicker'
import { colors } from '../../constants/variables';
 
export default class MyDatePicker extends Component {
  constructor(props){
    super(props)
    this.state = {date:"2016-05-15"}
  }
 
  render(){
    return (
      <DatePicker
        style={{width: 200}}
        inputStyle={this.props.inputStyle}
        date={this.props.date}
        mode="date"
        placeholder="Date of Birth"
        format="YYYY-MM-DD"
        // minDate="2016-05-01"
        // maxDate="2016-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        showIcon={false}
        style={styles.datePicker}
        // hideText={true}

        androidMode="spinner"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 44
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={this.props.onDateChange}
      />
    )
  }
}

const styles = StyleSheet.create({
  datePicker: {
    width: '100%', 
    borderColor: colors.borderGrey, 
    backgroundColor: colors.insideGrey,
    borderWidth: 1, 
    borderRadius: 20, 
    justifyContent: 'flex-start', 
    alignItems: 'flex-start',
    paddingLeft: 10,
    
  }
})