import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ToastAndroid, Platform } from 'react-native';
import FacebookLogin from './fbBtn';
import IosToast from '../customToast';
 
export default class LoginScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      user: null,
    };
  }

  showToast = (message) => {
    if(Platform.OS === 'ios'){
        this.refs.iosToast.show(message);
    }else{
        ToastAndroid.show(message, ToastAndroid.SHORT);
    }
}

  render() {
    return (
      <View style={styles.container}>
       <IosToast positionValue={160} ref="iosToast"/>
      <FacebookLogin 
          onLogin={
            (result) => {
              if (result.message) {
                alert('error: ' + result.message)
                //alert("Login error: " + result.error);
              } else if (result.isCancelled) {
                this.showToast("Cancelled");
              } else {
                  this.props.onLogin(result.profile.name)
              }
            }
          }
          onLogout={this.props.onLogout}
      />
     
    </View>
  );
}
}


const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#F5FCFF',
  marginHorizontal: 15,
},

});