import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Platform } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import FeatherIcon from 'react-native-vector-icons/Feather'
import { colors } from '../../constants/variables';

export default class OptionsMenu extends Component {
  onSelect = (index, value) => {
      this.dropdown.hide();
  }

  render() {
      const options = this.props.options ? this.props.options : [{"name": "Settings" , "key" : "settings" }]
    return (
      <View style={styles.container}>
            <ModalDropdown ref={dropdown => this.dropdown = dropdown}
                dropdownStyle={styles.dropdown_2_dropdown}
                options={options}
                onSelect={this.props.onSelect}
                renderRow={this.renderRow.bind(this)}
                renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => this._dropdown_2_renderSeparator(sectionID, rowID, adjacentRowHighlighted)}
            >
                <FeatherIcon style={[this.props.iconStyle]} name="more-vertical" size={30} color="white"/>
			</ModalDropdown>
      </View>
    );
  }

  renderRow (rowData, rowID, highlighted){
    return (
      <TouchableHighlight underlayColor={colors.lightGrey} style={styles.row}>
        <View style={[styles.dropdown_2_row]}>
          <Text style={[styles.dropdown_2_row_text]}>
            {rowData.name}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
  _dropdown_2_renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    if (!this.props.options || (rowID ==  this.props.options.length - 1)) return;
    let key = `spr_${rowID}`;
    return (<View style={styles.dropdown_2_separator}
                  key={key}
    />)
  }
}



const styles = StyleSheet.create({
 
    row: {
        justifyContent: 'center', 
        alignItems: 'center', 
        borderBottomWidth: 0,
    },

  dropdown_2: {
    alignSelf: 'flex-end',
    width: 150,
    marginTop: 32,
    // right: 8,
    borderWidth: 0,
    borderRadius: 3,
    backgroundColor: 'cornflowerblue',
    
  },
  dropdown_2_text: {
    marginVertical: 10,
    marginHorizontal: 6,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  dropdown_2_dropdown: {
    width: 200,
    height: 'auto',
    borderColor: colors.borderGrey,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: Platform.OS === 'ios' ? -39 : -58,
    marginRight: -10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation:50,
  },
  dropdown_2_row: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    borderBottomWidth: 0
  },
 
  dropdown_2_row_text: {
    marginHorizontal: 4,
    fontSize: 16,
    // color: 'navy',
    textAlignVertical: 'center',
    borderBottomWidth: 0
  },

  dropdown_2_separator: {
    height: 1,
    backgroundColor: colors.borderGrey,
  },

});