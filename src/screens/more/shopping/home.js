import React from "react";
import { View, Image, Text, StyleSheet, Dimensions, TouchableOpacity, TouchableWithoutFeedback, ScrollView, SafeAreaView } from "react-native";
import { colors } from "../../../constants/variables";
import { shoppingData } from "./data";

import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import FeatherIcons from 'react-native-vector-icons/dist/Feather';

const {height, width} = Dimensions.get('window');
const cardWidth = width / 2 - 15;

class CategoryDetail extends React.Component {
  render() {
    const title = this.props.navigation.getParam('title', 'Mobiles')
    return (
      <SafeAreaView style={styles.container}>
       <View style={styles.header}>
            {/* <View style={styles.headerBackTitle}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <FeatherIcons style={styles.backIcon} name="chevron-left" size={30} color={colors.lightGrey}/>
                </TouchableOpacity>
                <Text style={styles.titleTxt}>{title}</Text>
            </View> */}
            <View style={styles.headerIcons}>
                <MaterialIcons style={styles.searchIcon} name="search" size={25} color={colors.lightGrey}/>
                <FeatherIcons style={styles.cartIcon} name="shopping-cart" size={25} color={colors.lightGrey}/>
            </View>
        </View>
        <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dealsContent}>
            <View style={styles.content}>
                {shoppingData.products.map((item, index)=> {
                    return <TouchableWithoutFeedback key={item.key} onPress={() => this.props.navigation.navigate('detail', {data: item})}>
                                <View style={[styles.item, (index+1)%2 === 0 ? {marginRight: 10} : {marginHorizontal: 10}]}>
                                    <View>
                                        <Image resizeMode="contain" source={item.image} style={styles.itemImage}/>
                                    <View style={styles.rating}>
                                        <MaterialIcons style={styles.cartIcon} name="star" size={16} color="#F18264"/>
                                        <Text style={styles.ratingTxt}>4.4</Text>
                                        <Text style={styles.reviewTxt}>(123 Reviews)</Text>
                                    </View>
                                    </View>
                                    <View style={styles.productDetail}>
                                        <Text numberOfLines={2} style={styles.nameTxt}>{item.name}</Text>
                                        <Text style={styles.price}>{item.price}</Text>
                                        <View style={styles.devider}/>
                                        <View style={styles.pin}>
                                            <MaterialCommunityIcons style={styles.cartIcon} name="pin" size={16} color="grey"/>
                                            <Text style={{color: 'grey', marginTop: -5, fontSize: 16}}>some txt</Text>
                                        </View>
                                    </View>
                                </View>
                        </TouchableWithoutFeedback>
                })}
                
            </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
    container: {
        // marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        // marginBottom: 100,
    },
    header: {
        borderBottomColor: colors.borderGrey,
        borderBottomWidth: 1,
        backgroundColor: 'white', 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0.2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        padding: 10,
        width: '100%',
    },

    backIcon: {
        paddingRight: 10
    },

    headerBackTitle: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    titleTxt: {
        fontSize: 18,
        color: 'grey',
    },
    
    headerIcons: {
        flexDirection: 'row',
    },
    
    searchIcon: {
        marginRight: 10,
    },
    
    cartIcon: {
        marginRight: 0,
    },
    
    content: {
        paddingTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

   item: {
        width: cardWidth,
        backgroundColor: 'white',
        marginBottom: 10,
    },

    productDetail: {
        // padding: 5
    },

    rating: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        width: '100%',
    },

    ratingTxt: {
        color: '#F18264',
        fontSize: 16,
        paddingHorizontal: 5,
    },

    reviewTxt: {
        color: 'grey',
        fontSize: 16,
    },

    nameTxt: {
        fontSize: 18,
        color: 'grey',
        paddingVertical: 10,
        paddingLeft: 5
    },

    itemImage: {
        height: 238,
        width: cardWidth,
        marginTop: - 5,
    },

    price: {
        paddingVertical: 5,
        fontSize: 16,
        paddingLeft: 5
    },

    devider: {
        borderBottomColor: colors.borderGrey,
        borderBottomWidth: 1,
        paddingVertical: 5
    },

    pin: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 10,
    },

    dealsContent: {
        // paddingHorizontal: 10
    },

    deals: {
        flexDirection: 'row',
    }
})
export default CategoryDetail;
