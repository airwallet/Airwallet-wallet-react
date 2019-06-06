import React, { Component, } from "react"
import {
  StyleSheet,
  View,} from "react-native";
import LinkedInModal from 'react-native-linkedin'
import RoundButton from '../roundButton';
import FontAwesomeIcon from 'react-native-vector-icons/dist/FontAwesome';
import {getAsyncStorage,setAsyncStorage} from '../../utils/asyncStorage'
import {Languages} from '../Languages/All_languages'
const Constants = {
  LINKEDIN_CLIENT_KEY: "814ewfjh04zvm9",
  LINKEDIN_SECRET: "FxEPuJGdUBJFzVq7",
  REDIRECT_URL : "https://apiairwallet.com/social/linkedin-redirect",
}
     
const LINKEDIN_TOKAN="LINKEDIN_TOKAN_ID"
 
export default class LinkedinButton extends Component {
   state = {
          isLoggedIn: false,
          access_token: undefined,
          expires_in: undefined,
          payload:[],
    }
    
  componentWillMount()
  {
       Languages.setLanguage(global.code);
    try{
          if(this.state.access_token==undefined) 
          {
            getAsyncStorage(LINKEDIN_TOKAN).then(status => {
              this.setState({access_token:status})
            })
        
          console.log("my-token",getAsyncStorage(LINKEDIN_TOKAN))
          } 
          else{
            console.log("my-token",getAsyncStorage(LINKEDIN_TOKAN))
            console.log("my-token state",this.state.access_token)
          }
        }
    catch(e)
    {
      console.log('getAsyncStorage',e)
          }
    }
  
//     async getShare() {
//       const access_token="AQVTneCAYU9soUuLmXd12YMNHODat2oRit_mvGxsrInQUdy7CbIpq0b5qXMmN6etzq9cod3Zaly9fy_ExbOJLz-nAPfJmF3_G2KBqXImQf4GO51MA_bFHy5Duk2FQ1P60rpDi7bjTtY1VsqqGl_GWMZroUp42rbLzAibOUCEA5nKgYJMmN09dqDMXo_eug-SX-3Wl5sjc-j0JtBqbJTUTOcLqGinA6LbwEj8R6yd8oifpWjF223xK3OLVoBHhdWrMXdmfEaeNw1GqQN_n2iwDW2wSFr1nQ2Ze7PoKwBx8SXEgM_g0oPy4v8mrvQYgVdFdP6Oz1hs7aBtnP1PGHyHggYcRp9dJQ";
//       try{
        
//             this.setState({access_token:access_token})
//             setAsyncStorage(LINKEDIN_TOKAN,access_token)
//       }catch(e)
//       {
//         console.log('setAsyncStorage',e)
//       }
      
//     this.setState({ refreshing: true })
//     const baseApi = 'https://api.linkedin.com/v1/companies/5376815/is-company-share-enabled?'
//     const qs = { format: 'json' }
   
//     const response = await fetch(`https://api.linkedin.com/v1/companies/5376815/is-company-share-enabled?`, {
//           method: 'Post',
//           headers: {
//                 Authorization: 'Bearer ' + access_token,
                
//           },
//     })
    
//     const payload = await response.json()
//     this.setState({ ...payload, refreshing: false })
//     console.log("payload 2",payload);
// }
 
// // ------------
async getUser({ access_token }) {
      try{
            this.setState({access_token:access_token})
            setAsyncStorage(LINKEDIN_TOKAN,access_token)
      }catch(e)
      {
        console.log('setAsyncStorage',e)
      }
      
    this.setState({ refreshing: true })
    const baseApi = 'https://api.linkedin.com/v1/people/'
    const qs = { format: 'json' }
    const params = [
      'first-name',
      'last-name',
      'picture-urls::(original)',
      'headline',
      'email-address',
    ]
    const response = await fetch(`${baseApi}~:(${params.join(',')})?format=json`, {
          method: 'GET',
          headers: {
                Authorization: 'Bearer ' + access_token,
          },
    })
    
    const payload = await response.json()
    this.setState({ ...payload, refreshing: false })
    console.log("payload ",payload);
}
 
getLinkinButton=()=>
{
  return (
    <RoundButton 
         disabled = { true }
        style={{backgroundColor: '#4875B4'}}
        title={Languages.LINK_YOUR_LINKEDIN}
        icon={<FontAwesomeIcon style={styles.icon} name="linkedin" size={15} color="white" />}
    />
)
}

  render() {
 
    const { access_token } = this.state
      // const { emailAddress, pictureUrls, refreshing, firstName, lastName, headline } = this.state
    return (

     <View>
        {(access_token!=undefined)
          ?    <RoundButton 
                disabled = { true }
                onPress={()=>this.getShare()}
                style={{backgroundColor: '#4875B4'}}
                title={Languages.LINKEDIN_ACCOUNT_LINKED}
                icon={<FontAwesomeIcon style={styles.icon} name="linkedin" size={15} color="white" />}
              />
          :
               <LinkedInModal
                clientID={Constants.LINKEDIN_CLIENT_KEY}   // Your client id from https://www.linkedin.com/developer/apps
                clientSecret={Constants.LINKEDIN_SECRET}  // Your client secret from https://www.linkedin.com/developer/apps 
                redirectUri={ Constants.REDIRECT_URL}   //Your redirect uri set into https://www.linkedin.com/developer/apps
                onSuccess={ (data)=>this.getUser(data) }
                onError={(e)=>console.log("Linkin_login_Error ",e)}
                renderButton={this.getLinkinButton}
                />
       }
        {/* <RoundButton 
                
                onPress={()=>this.getShare()}
                style={{backgroundColor: '#4875B4'}}
                title={Languages.LINKEDIN_ACCOUNT_LINKED}
                icon={<FontAwesomeIcon style={styles.icon} name="linkedin" size={15} color="white" />}
              /> */}
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
 




       
      

