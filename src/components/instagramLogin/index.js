import React, { Component } from "react"
import {
  StyleSheet,
  View, } from "react-native";

import RoundButton from '../roundButton';
import FontAwesomeIcon from 'react-native-vector-icons/dist/FontAwesome';
import InstagramLogin from 'react-native-instagram-login'
import { setAsyncStorage, getAsyncStorage } from "../../utils/asyncStorage";
import { INSTA_TOKEN } from '../../constants/api';
import {Languages} from '../Languages/All_languages'
const Constants = {
  CLIENT_ID: "06000f3b455d442bb6055de8501bc19d",
  REDIRECT_URL: "https://apiairwallet.com"
}

export default class InstagramButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false
    }
    Languages.setLanguage(global.code);
}
  

  componentWillMount(){
    getAsyncStorage(INSTA_TOKEN).then(token => {
      if(token)
        this.setState({isLoggedIn: true})
    })
  }

  onLoginSuccess = (token) => {
    this.setState({isLoggedIn: true})
    setAsyncStorage(INSTA_TOKEN, token)
  }

  showLoginModal = () => {
    this.instagramLogin.show()
  }

  render() {
    const { isLoggedIn } = this.state;
    const title = isLoggedIn ? Languages.INSTA_ACCOUNT_LINKED : Languages.YOUR_INSTA_LINK;
    return (
      <View>
        <RoundButton 
          disabled = {isLoggedIn}
          onPress={this.showLoginModal}
          style={{backgroundColor: '#b83281'}}
          title={title}
          icon={<FontAwesomeIcon style={styles.icon} name="instagram" size={15} color="white" />}
        />
        <InstagramLogin
          ref= {ref => this.instagramLogin= ref}
          clientId={Constants.CLIENT_ID}
          scopes={['public_content']}
          onLoginSuccess={this.onLoginSuccess}
          onLoginFailure={() => {}}
          redirectUrl = {Constants.REDIRECT_URL}
        />
    </View>
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