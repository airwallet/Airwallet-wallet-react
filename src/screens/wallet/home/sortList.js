import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Platform, Image, Switch, TextInput, Alert, ScrollView  } from 'react-native';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { colors, deviceDimensions, fonts } from '../../../constants/variables';
// import { currencies } from '../../constants/currenciesList';
import CurrencyCell from './sortListCell';
import SortableList from '../../../components/sortableList';
import {Languages} from '../../../components/Languages/All_languages'
const isIos = Platform.OS === 'ios' ;

class AllCurrenciesList extends Component {
    constructor(props) {
        super(props);
        Languages.setLanguage(global.code);
        this.state = {
            visible: false,
            searchTxt: '',
            currencies: this.props.data,
            extraData: this.props.data,
        }
    }

    _renderRowSort = ({data, active}) => {
        return <CurrencyCell
            item={data}
            active={active}
        />
    }

    render() {
        const { order = [] } = this.props;
        let CurrencyList = this.state.currencies;
        let currencies = this.state.currencies;
        
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.done} onPress={this.props.onSortDone}>
                    <View style={styles.doneBtn}>
                        <Text style={styles.doneTxt}>
                           {Languages.DONE}
                        </Text>
                    </View>
                </TouchableOpacity>
                <SortableList
                    contentContainerStyle={styles.contentContainer}
                    style={{marginBottom: 98}}
                    order={order}
                    data={CurrencyList}
                    onChangeOrder={this.props.onChangeOrder}
                    renderRow={this._renderRowSort} 
                />
            </View>
        );
    }
}

export default AllCurrenciesList;



const styles = StyleSheet.create({
    popView: {
        flex: 1,
        width: '100%',
        
    },

    popContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0)'
    },

    container: {
        marginTop: isIos ? 24 : 0, 
        flex: 1,
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        alignItems: 'flex-start',
    },

    closeIcon: {
        position: 'absolute',
        top: 6,
        right: 0,
        paddingHorizontal: 15,
        paddingVertical: 5,
    },

    separator: {
        backgroundColor: colors.borderGrey, 
        height: 1,
        width: '100%',
    },

    searchInput: {
        padding: isIos ? 15 : 10, 
        borderBottomColor: colors.borderGrey, 
        borderBottomWidth: 1,
        // width: '90%',
    },

    contentContainer: {
        width: deviceDimensions.width,
    
        ...Platform.select({
          ios: {
            paddingHorizontal: 0,
          },
    
          android: {
            paddingHorizontal: 0,
          }
        })
      },

    done: {
        alignItems:'flex-end', 
        borderRadius: 5,
        width: '100%',
        marginTop: isIos ? -10 : 0,
        marginBottom: 5,
    },

    doneBtn: {
        backgroundColor: colors.lightGrey,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginRight: 10,
        borderRadius: 5,
    },  
    
    doneTxt: {
        color: 'white',
        fontFamily: fonts.nunitoLight
    }
})