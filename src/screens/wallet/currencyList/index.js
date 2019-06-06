import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Platform, Image, Switch, TextInput, Alert  } from 'react-native';
import PopView from '../../../components/popView';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { colors, deviceDimensions, dimensions } from '../../../constants/variables';
import CurrencyCell from './currencyCell';
import SortableList from '../../../components/sortableList';
import { POST, GET } from '../../../utils/api/Request';
import { ENDPOINTS, USER_DATA, ACCESS_TOKEN, USER_ID, CURRENCIES } from '../../../constants/api';
import { getAsyncStorage, setAsyncStorage } from '../../../utils/asyncStorage';
import IosToast from '../../../components/customToast';
import Loader from '../../../components/loader';
import {Languages} from '../../../components/Languages/All_languages'
import { showNotification} from '../../../utils/showNotification'
const isIos = Platform.OS === 'ios' ;

class AllCurrenciesList extends Component {
    constructor(props) {
        super(props);
        Languages.setLanguage(global.code);
        this.state = {
            visible: false,
            loading: false,
            searchTxt: '',
            currencies: this.props.data,
            extraData: this.props.data,
            allCurrencies: [],
            curreciesFetching: true,
            userData: {},
            order: [],
        }
    }

    showToast(message) {   
		if(Platform.OS === 'ios'){
			this.refs.iosToast.show(message);
		}else{
			ToastAndroid.show(message, ToastAndroid.SHORT);
		}
    }
    
    getListOrder = (data) => {
		let order = [];
		data.sort((a, b) => a.symbol.localeCompare(b.symbol))
		data.map((item, index) => {
			order.push(index)
        })
        this.props.onChangeOrder(order);
		return order;
    }
    
    onChangeOrder = (order) => {
        this.setState({order})
        this.props.onChangeOrder(order);
    }

    onToggleSelect = (value, symbol) => {
        let currencies = this.state.allCurrencies;
        let item = {};
        let index = null;
        currencies.map((c, i)=> {
            if(c.symbol === symbol){
                item = currencies[i];
                index = i;
            }
        })
        let isAdded = currencies[index].isAdded
        this.onAdd(value, index, 'cancel')
        // let curr = currencies[index]
        console.log('isadded', isAdded, item ) 

        if(value){
            if(isAdded !== undefined && !isAdded){
                Alert.alert(
                    // Languages.formatString(Languages.WOULD_YOU_LIKE,item.sortName),
                    `would you like to create a ${item.sortName} wallet?`,
                    '',
                    [
                      {text: 'Add', onPress: () => this.onCreate(value, index)},
                      {text: 'Cancel', onPress: () => this.onAdd(!value, index, 'cancel'), style: 'cancel'},
                    ],
                    { cancelable: false }
                )
            }else{
                this.onAdd(value, index)
            }
        }else{
            this.onAdd(value, index)
        }
    }

    onAdd = (value, index, type = 'add') => {
        const currencies = this.state.allCurrencies;
        currencies[index].selected = value;
        console.log('isadded in', value, type)
        if((currencies[index].isAdded !== undefined) && (type === 'add')){
            currencies[index].isAdded = true;
        }
        this.setState({extraData: currencies})
    }

    onCreate = (value, index) => {
        this.onAdd(value, index);
        const currencies = this.state.allCurrencies;
        const { userData } = this.state;
        this.setState({loading: true})
        const currency = currencies[index] && currencies[index].symbol;
        console.log('oncreate', currency)
        const config = {
            headers: {Authorization: 'bearer ' + userData[ACCESS_TOKEN]},
            data: {userId: userData[USER_ID], currency}
        }
        POST(ENDPOINTS.CREATE_WALLET_ACCOUNT, config)
            .then(res => {
                this.showToast(Languages.CURRENCY_ADDID)
                this.setState({loading: false})
            })
            .catch(error => {
                console.log('error on add currency', error)
                this.setState({loading: false})
                this.showToast(Languages.CION_IS_CURRENT)
                this.removeCurrency(index);
                console.log(error.data)
                showNotification(error.response);
            })
    }

    removeCurrency = (index) => {
        const currencies = this.state.allCurrencies;
        currencies[index].selected = false;
        currencies[index].isAdded = false;

        this.setState({extraData: currencies})
    }

    _renderRowSort = ({data, active}) => {
        return <CurrencyCell
            item={data}
            active={active}
            onToggleSelect = {this.onToggleSelect}
        />
    }

    componentWillMount(){
        const { allCurrencies } = this.state;
        if(allCurrencies.length){
            return null;
        }
        getAsyncStorage(USER_DATA).then(data => {
            const userData = JSON.parse(data)
            this.setState({userData})
            const config = {
				headers: {Authorization: 'bearer ' + userData[ACCESS_TOKEN]},
            }
            console.log('currencieslist config', config)
            GET(ENDPOINTS.GET_CURRENCIES, config)
                .then(res => {
                    this.onGetCurrencies(res)
                })
                .catch(error => {
                    this.setState({curreciesFetching: false})
                    console.log(error)
                    showNotification(error.response);
                })
        })
    }

    onGetCurrencies = (res) => {
        const { selected } = this.props;
        let selectedCurrency = selected.map(c => c.symbol)
        console.log('currencieslist res', selectedCurrency)
        
        let currencies = res.data
        let allCurrencies = [];
        if(currencies.length){
            currencies.map(c => {
                if(selectedCurrency.indexOf(c.symbol) !== -1){
                    c.selected = true
                    c.isAdded = true
                }else{
                    c.isAdded = false
                }
                allCurrencies.push(c)
            })
        }
        this.setState({curreciesFetching: false, allCurrencies, order: this.getListOrder(allCurrencies)})
            setAsyncStorage(CURRENCIES, JSON.stringify(currencies))
    }

    render() {
        const { loading, data, selected } = this.props;
        const { allCurrencies, curreciesFetching, order = [] } = this.state;

        let CurrencyList = allCurrencies;
        if(this.state.searchTxt){
            CurrencyList = allCurrencies.filter((item) => {
                return !item.name.indexOf(this.state.searchTxt)
            })
        }

        return (
            <PopView 
                visible={this.props.visible} 
                onRequestClose={() => this.props.onRequestClose(false)}
                style={styles.popView}
                containerStyle={styles.popContainer}
            >

                <View style={styles.container}>
                    <IosToast positionValue={160} ref="iosToast"/>
                    <View>
                        <TextInput value={this.state.searchTxt} onChangeText={(text) => this.setState({searchTxt: text})} style={styles.searchInput} placeholder="Search"/>
                        <TouchableOpacity 
                            onPress={() => this.props.onRequestClose(false)} 
                            activeOpacity={0.6} 
                            style={styles.closeIcon}
                        >
                            <MaterialCommunityIconsIcon name="close" size={25} color="black"/>
                        </TouchableOpacity>

                       {!curreciesFetching ?  <SortableList
                            contentContainerStyle={styles.contentContainer}
                            style={{marginBottom: 98}}
                            order={order}
                            data={CurrencyList}
                            // onChangeOrder={this.onChangeOrder}
                            renderRow={this._renderRowSort} 
                        />: <Loader/>}
                    </View> 
                </View>
            </PopView>
        );
    }
}

export default AllCurrenciesList;



const styles = StyleSheet.create({
    popView: {
        // flex: 1,
        width: '100%',
        margin: 0,
        padding: 0,
        height: '100%',
        // marginTop: -20
    },

    popContainer: {
        // backgroundColor: 'rgba(0, 0, 0, 0)'
    },

    container: {
        marginTop: isIos ? dimensions.topSpace : 0, 
        flex: 1,
        backgroundColor: 'white',
        width: '100%',
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
})