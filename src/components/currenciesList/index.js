import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Platform, Image, Switch, TextInput, Alert  } from 'react-native';
import PopView from '../popView';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { colors, deviceDimensions, dimensions } from '../../constants/variables';
// import { currencies } from '../../constants/currenciesList';
import CurrencyCell from './currencyCell';
import SortableList from '../sortableList';
import { POST } from '../../utils/api/Request';
import { ENDPOINTS, USER_DATA, ACCESS_TOKEN, USER_ID } from '../../constants/api';
import { getAsyncStorage } from '../../utils/asyncStorage';
import IosToast from '../../components/customToast';
import Loader from '../loader';
import {Languages} from '../Languages/All_languages'
const isIos = Platform.OS === 'ios' ;

class AllCurrenciesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            loading: false,
            searchTxt: '',
            currencies: this.props.data,
            extraData: this.props.data,
            allCurrencies: []
        }
        Languages.setLanguage(global.code);
    }

    showToast(message) {   
		if(Platform.OS === 'ios'){
			this.refs.iosToast.show(message);
		}else{
			ToastAndroid.show(message, ToastAndroid.SHORT);
		}
	}

    onToggleSelect = (value, key) => {
        let currencies = this.props.data;
        let item = {};
        let index = null;
        currencies.map((c, i)=> {
            if(c.key === key){
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
                    Languages.formatString(Languages.WOULD_YOU_LIKE,item.sortName),
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
        const currencies = this.props.data;
        currencies[index].selected = value;
        console.log('isadded in', value, type)
        if((currencies[index].isAdded !== undefined) && (type === 'add')){
            currencies[index].isAdded = true;
        }
        this.setState({extraData: currencies})
    }

    onCreate = (value, index) => {
        this.onAdd(value, index);
        const currencies = this.props.data;
        this.setState({loading: true})
        const currency = currencies[index] && currencies[index].sortName;
        console.log('oncreate', currency)
        getAsyncStorage(USER_DATA).then(data => {
            let userData = JSON.parse(data)
            const config = {
                headers: {Authorization: 'bearer ' + userData[ACCESS_TOKEN]},
                data: {userId: userData[USER_ID], currency}
            }
            POST(ENDPOINTS.CREATE_WALLET_ACCOUNT, config)
                .then(res => {
                    this.setState({loading: false})
                })
                .catch(error => {
                    this.setState({loading: false})
                    this.showToast(Languages.CION_IS_CURRENT)
                    this.removeCurrency(index);
                    console.log(error.data)
                })
            })
    }

    removeCurrency = (index) => {
        const currencies = this.props.data;
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

    // componentWillMount(){
    //     getAsyncStorage(USER_DATA).then(data => {
    //         const config = {
	// 			headers: {Authorization: 'bearer ' + userData[ACCESS_TOKEN]},
	// 			params: {userId: userData[USER_ID]}
	// 		}
    //         getCurrencies = () => {
    //             this.setState({curreciesFetching: true})
    //             GET(ENDPOINTS.GET_CURRENCIES, config)
    //                 .then(res => {
    //                     console.log('all Currencies', res)
    //                     this.setState({curreciesFetching: false, allCurrencies: res.data})
    //                     let currencies = res.data
    //                     setAsyncStorage(CURRENCIES, JSON.stringify(currencies))
    //                 })
    //                 .catch(error => {
    //                     this.setState({curreciesFetching: false})
    //                     console.log(error)
    //                 })
    //         }
    //     })
    // }

    render() {
        const { order = [], loading, data } = this.props;
      
        let CurrencyList = data;
        if(this.state.searchTxt){
            CurrencyList = currencies.filter((item) => {
                return !item.name.indexOf(this.state.searchTxt)
            })
        }

       console.log('currencies', data)

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
                        <TextInput value={this.state.searchTxt} onChangeText={(text) => this.setState({searchTxt: text})} style={styles.searchInput} placeholder={Languages.SEARCH}/>
                        <TouchableOpacity 
                            onPress={() => this.props.onRequestClose(false)} 
                            activeOpacity={0.6} 
                            style={styles.closeIcon}
                        >
                            <MaterialCommunityIconsIcon name="close" size={25} color="black"/>
                        </TouchableOpacity>

                       {!loading ?  <SortableList
                            contentContainerStyle={styles.contentContainer}
                            style={{marginBottom: 98}}
                            order={order}
                            data={CurrencyList}
                            onChangeOrder={this.props.onChangeOrder}
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