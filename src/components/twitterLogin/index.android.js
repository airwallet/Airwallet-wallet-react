import React, { Component } from "react"
import {
  AppRegistry,
  Button,
  StyleSheet,
  Text,
  View,
  Alert,
  NativeModules,
  TouchableOpacity } from "react-native";

import RoundButton from '../roundButton';
import FontAwesomeIcon from 'react-native-vector-icons/dist/FontAwesome';
import {Languages} from '../Languages/All_languages'
const { RNTwitterSignIn } = NativeModules

const Constants = {
  //Dev Parse keys
  TWITTER_COMSUMER_KEY: "qWPj1TXbreMX1SsDvdiQTaF7Y",
  TWITTER_CONSUMER_SECRET: "4t0cRfGWXZvySIa5sS0M38AnT8a8B8hwcX2lZiaStSWStD4B4Z"
}

export default class TwitterButton extends Component {
  state = {
    isLoggedIn: false
  }
  componentWillMount()
  {
       Languages.setLanguage(global.code);
  }
  _twitterSignIn = () => {
    RNTwitterSignIn.init(Constants.TWITTER_COMSUMER_KEY, Constants.TWITTER_CONSUMER_SECRET)
    RNTwitterSignIn.logIn()
      .then(loginData => {
        // console.log(loginData)
        const { authToken, authTokenSecret, name } = loginData
        this.props.onLogin(name)
        if (authToken && authTokenSecret) {
          this.setState({
            isLoggedIn: true
          })
        }
      })
      .catch(error => {
        console.log(error)
      }
    )
  }

  handleLogout = () => {
    RNTwitterSignIn.logOut()
    this.props.onLogout();
    this.setState({
      isLoggedIn: false
    })
  }

  render() {
    const { isLoggedIn } = this.state
    return (
        <RoundButton 
            onPress={this._twitterSignIn}
            style={{backgroundColor: '#4ab3f4'}}
            title={Languages. LINK_YOUR_TWITTER}
            icon={<FontAwesomeIcon style={styles.icon} name="twitter" size={15} color="white" />}
        />
    )
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1b95e0',
    color: 'white',
    width: 200,
    height: 50
  }
})