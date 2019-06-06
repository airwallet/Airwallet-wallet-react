import React from "react";
import { View, Image, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import { colors } from "../../../constants/variables";
import { shoppingData } from "./data";

import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import FeatherIcons from 'react-native-vector-icons/dist/Feather';

const {height, width} = Dimensions.get('window');
const cardWidth = width / 2 - 15;

class ProductDetail extends React.Component {
  render() {
      const data = this.props.navigation.getParam('data', {});
      let { name, image, price, key } = data;

      name = name.substring(0, 20) + '...';
    return (
      <SafeAreaView style={styles.container}>
       <View style={styles.header}>
            <View style={styles.headerBackTitle}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <FeatherIcons style={styles.backIcon} name="chevron-left" size={30} color={colors.lightGrey}/>
                </TouchableOpacity>
                <Text numberOfLines={1} style={styles.titleTxt}>{name}</Text>
            </View>
            <View style={styles.headerIcons}>
                <MaterialIcons style={styles.searchIcon} name="search" size={25} color={colors.lightGrey}/>
                <FeatherIcons style={styles.cartIcon} name="shopping-cart" size={25} color={colors.lightGrey}/>
            </View>
        </View>
        {/* <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dealsContent}> */}
            <View style={styles.content}>
                <View style={styles.itemImage}>
                    {/* <Image source={image} style={styles.image} /> */}
                </View>
            </View>
        {/* </ScrollView> */}
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
    container: {
        // marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        // marginBottom: 20,
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
        // alignItems: 'sp',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 10,
        width: '100%',
        marginTop: 5
    },

    backIcon: {
        paddingRight: 10
    },

    headerBackTitle: {
        flexDirection: 'row',
        alignItems: 'center',
    },


})
export default ProductDetail;
