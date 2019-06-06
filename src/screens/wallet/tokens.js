import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated, 
  ScrollView,
  Image,

} from 'react-native';
import { colors, dimensions, fonts } from '../../constants/variables';
import Svg,{ Path} from 'react-native-svg';

const headerBg = '#e4e4e4';
const airDropColor = colors.orange;

export default class Tokens extends Component {
  render() {
     
      const { tokens } = this.props
    return (
    <ScrollView style={styles.scrollView}>
    <View style={{marginBottom: 125}}>
    {
        tokens.length && tokens.map((item, index)=> {
            return <TouchableOpacity 
                        key={item.key} 
                        // onPress={() => this.props.navigation.navigate('projectIntro', {name: item.name, image: item.image})} 
                        style={styles.cryptoList}
                    >
                        <View style={styles.listRow}>
                            <View style={styles.cyptoTitle}>
                                <Image style={styles.image} source={item.image}/>
                                <Text style={styles.cyptoTitleTxt}>{item.name}</Text>
                            </View>
                            <View style={{marginRight: 30}}>
                                <Text style={styles.amount}>{item.amount}</Text>
                                <Text style={styles.amountUsd}>≈ {item.amountUsd} USD</Text>
                            </View>
                            
                             <Svg  height="30" width="30" viewBox="0 0 820.877 800.877"  >
                                <Path fill={airDropColor} d="M395.98,792c-156.124,0-283.174-127.051-283.174-283.175c0-150.551,256.79-487.352,267.702-501.576
                                    c7.366-9.665,23.54-9.665,30.944,0c10.912,14.225,267.742,351.025,267.742,501.576C679.194,664.949,552.144,792,395.98,792z
                                    M395.98,51.639c-55.926,75.763-244.202,339.606-244.202,457.187c0,134.65,109.552,244.202,244.202,244.202
                                    c134.689,0,244.242-109.552,244.242-244.202C640.222,391.245,451.944,127.401,395.98,51.639z" />
                                <Path fill={airDropColor} d="M411.179,717.835c-8.262,0-15.939-5.3-18.589-13.602c-3.235-10.249,2.417-21.2,12.666-24.475
                                    c78.023-24.864,138.041-86.714,160.605-165.438c2.963-10.405,13.797-16.446,24.086-13.367
                                    c10.328,2.962,16.33,13.757,13.367,24.085c-26.111,91.312-95.756,163.062-186.211,191.861
                                    C415.116,717.562,413.167,717.835,411.179,717.835z" />
                        </Svg>
                        </View>
                    </TouchableOpacity>
        })
    }
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        height: '100%'
    },

    scrollView: {
        marginBottom: 125,
        height: '100%'
    },  

    cryptoList: {
        borderBottomWidth: 1,
        borderBottomColor: colors.borderGrey,
        marginHorizontal: 10,
        paddingVertical: 5,
        alignItems:"center",
        paddingVertical: 15,
    },

    listRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    cyptoImage: {
        height: 50,
        justifyContent: 'center',
    },

    image: {
        borderRadius: 5,
        resizeMode: 'contain',
        height: 30,
        width: 30,
        marginRight: 10
    },

    cyptoTitle: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row'
    },

    cyptoTitleTxt: {
        fontSize: 18,
        color:'#262626',
        // fontWeight: 'bold',
        fontFamily: fonts.nunitoRegular
    },

    amountUsd: {
        fontFamily: fonts.nunitoLight,
        color: colors.orange,
        fontSize: 12,
        textAlign: 'right',
    },

    amount: {
        textAlign: 'right',
        fontFamily: fonts.nunitoLight,
        fontSize: 16
    }
});
