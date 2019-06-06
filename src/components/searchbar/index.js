import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Platform, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather'
import { colors, fonts } from '../../constants/variables'
import HeaderContainer from '../../components/headerContainer';
import Search from './search';
import { currencies } from '../../constants/currenciesList';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchEnable: false,
        }
    }
    
    onSearch = (searchEnable) => {
		this.setState({searchEnable})
    }
    
    render() {
        const { searchEnable } = this.state;
		
        return (
            <HeaderContainer {...this.props}>
                <View style={styles.content}>
                    <TouchableOpacity 
                        activeOpacity={1} 
                        onPress={() => this.onSearch(true)}
                    >
                        <Icon style={styles.searchIcon} name="search" size={25} color={colors.lightGrey}/>
                    </TouchableOpacity>
                    <Text 
                        onPress={() => this.onSearch(true)} 
                        style={styles.input}
                    >
                        Coin Information
                    </Text>

                    <Search 
                        visible={searchEnable}
                        onRequestClose={() => this.onSearch(false)}
                    />
                </View>
            </HeaderContainer>
        );
    }
}

const styles = StyleSheet.create({

    content: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'white', 
        width: '93%',
        borderRadius: 5,
    },  
    
    searchIcon: {
        paddingLeft: 5,
    },

    moreIcon:{
        paddingRight: 8,
    },
    
    input: {
        flex: 1, 
        fontSize: 14, 
        paddingHorizontal: 5,
        paddingVertical: 7,
		fontFamily: fonts.nunitoLight,
    },
})

export default SearchBar;