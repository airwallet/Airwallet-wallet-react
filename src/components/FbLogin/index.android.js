import React, { Component } from 'react';
import {View,Text,StyleSheet,NativeModules,TouchableHighlight,} from 'react-native';
import RoundButton from '../roundButton';
import FontAwesomeIcon from 'react-native-vector-icons/dist/FontAwesome';
import FBSDK, { LoginManager, AccessToken } from 'react-native-fbsdk';
import { setAsyncStorage, getAsyncStorage } from '../../utils/asyncStorage';
import { FBTOKEN } from '../../constants/api';
import {Languages} from '../../components/Languages/All_languages'

export default class LoginButton extends Component {
  constructor(){
    super();
    this.state = {
      loggedIn: false
    }
    Languages.setLanguage(global.code);
  }

  componentWillMount(){
    getAsyncStorage(FBTOKEN).then(token => {
      if(token)
        this.setState({loggedIn: true})
    })
  }

  _fbAuth(){
    LoginManager.logInWithReadPermissions(['public_profile']).then(function(result){
        if(result.isCancelled){
            
        }else {
          AccessToken.getCurrentAccessToken().then(
            (data) => {
              const fbToken = data.accessToken ? data.accessToken.toString() : '';
              setAsyncStorage(FBTOKEN, fbToken)
              if(fbToken)
                this.setState({loggedIn: true})
            }
          )
          this.props.onLogin(result.profile.name)
        }
    }, function(error){
        alert(Languages.AN_ERROR_OCCURED+' '+ error)
    })
}
 
  render(){
    const { loggedIn } = this.state;
    const title = loggedIn ?  Languages.FACEBOOK_ACCOUNT_LINKED : Languages.LINK_YOUR_FACEBOOK;
    return (
        <RoundButton 
            disabled = {loggedIn}
            onPress={() => this._fbAuth()}
            style={{backgroundColor: '#3b5998'}}
            title={title}
            icon={<FontAwesomeIcon name="facebook" size={15} color="white" />}
        />
    )
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    alignItems: 'center',
    height: 45,
    backgroundColor: '#3B5998',
  },
  whiteText: {
    color: 'white'
  }
});