import * as React from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';
import {TabView,
  TabBar,
  SceneMap,
} from 'react-native-tab-view';
import AllTransaction from './allTransaction'
import Widthdrawal from './withdrawal';
import Deposit from './deposit'
import { fonts, colors } from '../../../constants/variables';


export default class SwipTab extends React.Component{
  static title = 'Custom indicator';
  static backgroundColor = 'red';

  state = {
    index: 0,
    routes: [
      {
        key: 'ALL',
        color: "#585757",
      },
      {
        key: 'WITHDRAWAL',
        color: "#585757",
      },
      {
        key: 'DEPOSIT',
        color: "#585757",
      },
    ],
  };

  _handleIndexChange = index =>
    this.setState({
      index,
    });


_renderTabName = ({route}) => {
  const {index, routes} = this.state;
  var active = route.key === routes[index].key ? true : false;

 return <View style={[styles.tab, {backgroundColor: active ? colors.orange : colors.lightGrey}]}>
    <Text style={styles.tabTxt}>{route.key}</Text>
  </View>
};

  _renderTabBar = props => (
    <TabBar
      {...props}
      renderLabel={this._renderTabName}
      style={styles.tabbar}
      renderIndicator={() => {}}
      tabStyle={styles.tabStyle}
      labelStyle={{margin: 0}}
      pressOpacity = {0.6}
    />
  );

  _renderScene = SceneMap({
    ALL: AllTransaction,
    WITHDRAWAL: Widthdrawal,
    DEPOSIT: Deposit,
  });

  render() {
    return (
      <TabView
        style={[this.props.style, {flex: 1}]}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderTabBar={this._renderTabBar}
        tabBarPosition="top"
        onIndexChange={this._handleIndexChange}
      />
    );
  }
}

const styles = StyleSheet.create({
  tabbar: {
    backgroundColor: 'white',
    overflow: 'hidden',
    shadowColor: 'white',
    elevation: 0,
    paddingHorizontal: 6,
    opacity: 1,
  },

  tabStyle:{
    padding: 0, 
    opacity: 1, 
    marginHorizontal: 5,
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.8,
  },

  tab: {
    backgroundColor: '#262626', 
    paddingVertical: 7, 
    paddingHorizontal: 15, 
    borderRadius: 50, 
    width: '100%', 
    justifyContent: 'center', 
    alignItems: 'center', 
  },

  tabTxt: {
    color:'white', 
    fontSize: 10,
    fontFamily: fonts.nunitoRegular
  }
});