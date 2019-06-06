import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MainApp from './app';
import { Provider } from 'react-redux';
import store from './store';
import NetNotification from './components/netNotification';

class App extends Component{
  render() {
    return (
        <Provider store={store}>
          <View style={styles.container}>
            <MainApp/>
             <NetNotification/>  
          </View>
        </Provider>
    )
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  }
})
 