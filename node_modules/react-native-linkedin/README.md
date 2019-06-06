<p align="center">
    <img alt="react-native-linkedin" src="https://media.giphy.com/media/l4FGCGPtBn9meI7Pa/giphy.gif" width=200>
</p>

<h3 align="center">
  🔗 React-Native LinkedIn
</h3>
<p align="center">
Simple <strong>LinkedIn</strong> login library for <strong>React-Native</strong> with <i>WebView</i> into a <i>Modal</i>
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/react-native-linkedin"><img src="https://img.shields.io/npm/v/react-native-linkedin.svg?style=flat-square"></a>
  <a href="https://www.npmjs.com/package/react-native-linkedin"><img src="https://img.shields.io/npm/dm/react-native-linkedin.svg?style=flat-square"></a>
  <a href="https://circleci.com/gh/xcarpentier/react-native-linkedin"><img src="https://circleci.com/gh/xcarpentier/react-native-linkedin.svg?style=svg"></a>
  <a href="https://codecov.io/gh/xcarpentier/react-native-linkedin"><img src="https://codecov.io/gh/xcarpentier/react-native-linkedin/coverage.svg"></a>
  <a href="https://greenkeeper.io/"><img src="https://badges.greenkeeper.io/xcarpentier/react-native-linkedin.svg"></a>
</p>

<p align="center">
  <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://exp.host/@xcarpentier/linked-in-login-example">
  <br>
  <a href="https://exp.host/@xcarpentier/linked-in-login-example">Demo on Expo</a>
</p>

<br />



## Benefits

* **Light**: No need to link a native library like others alternatives
* **Simple**: Get the token and the expires, you handle your own login with the access_token
* **Sure**: open-source
* **Almost readable & understandable code**: JavaScript & React

## Installation

```bash
$ yarn add react-native-linkedin
```
## Documentation

### Props

| Name                 | Type                          | Required     | Default                                | Description                                                                     |
| -------------------- | ----------------------------- | ------------ | -------------------------------------- | ------------------------------------------------------------------------------- |
| clientID             | string                        | **required** |                                        | [Your client id](https://www.linkedin.com/developer/apps)                       |
| clientSecret         | string                        | **required** |                                        | [Your client secret](https://www.linkedin.com/developer/apps)                   |
| redirectUri          | string                        | **required** |                                        | [Your redirectUri](https://www.linkedin.com/developer/apps)                     |
| onSuccess            | function                      | **required** |                                        | Function will be call back on success                                           |
| authState            | string                        | optional     | `require('uuid').v4()`                 | The state of auth, to be more secure                                            |
| onError              | function                      | optional     | `console.error(err)`                   | Function will be call back on error                                             |
| onClose              | function                      | optional     |                                        | Function will be call back on close modal                                       |
| onOpen               | function                      | optional     |                                        | Function will be call back on open modal                                        |
| onSignIn             | function                      | optional     |                                        | Function will be call back when the user sign in                                |
| permissions          | array                         | optional     | `['r_basicprofile', 'r_emailaddress']` | The LinkedIn access token permissions                                           |
| renderButton         | function                      | optional     |                                        | Render function for customize LinkedIn button                                   |
| renderClose          | function                      | optional     |                                        | Render function for customize close button                                      |
| linkText             | string                        | optional     | `'Login with LinkedIn'`                | Link label                                                                      |
| containerStyle       | ViewPropTypes.style           | optional     |                                        | Customize container style                                                       |
| wrapperStyle         | ViewPropTypes.style           | optional     |                                        | Customize wrapper style                                                         |
| closeStyle           | ViewPropTypes.style           | optional     |                                        | Customize close style                                                           |
| animationType        | Modal.propTypes.animationType | optional     | `fade`                                 | Customize animationType style: 'none', 'slide' or 'fade'                        |
| shouldGetAccessToken | bool                          | optional     | `true`                                 | Set to false to receive the 'authorization code' rather then the 'access token' |

### Example

```JavaScript
// See ./example folder for details
import React from 'react'
import { StyleSheet, View } from 'react-native'

import LinkedInModal from 'react-native-linkedin'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default class AppContainer extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <LinkedInModal
          clientID="[ Your client id from https://www.linkedin.com/developer/apps ]"
          clientSecret="[ Your client secret from https://www.linkedin.com/developer/apps ]"
          redirectUri="[ Your redirect uri set into https://www.linkedin.com/developer/apps ]"
          onSuccess={token => console.log(token)}
        />
      </View>
    )
  }
}
```

## Security

Please note that you should give your linkedin client id and you secret key to the component.
You should be aware that key can be found if you store it directly to your code.
**I strongly recommand to not declare both on your code but found a way to keep it secret (ie. get it from server, encrypt it, ...)**

## Roadmap & TODOs

* [x] Better style for modal: border, padding, transparency
* [x] Button to close the modal
* [x] Better catch of error into login url
* [x] Add gif example in README
* [x] Publish example to expo
* [ ] Test every line of code
* [ ] Add props or other function to fetch more informations like basic profile information
* [ ] Use Expo WebBrowser when app is in Expo (ie. if `global.__exponent` exist)

[> Propose](https://github.com/xcarpentier/react-native-linkedin/issues/new)

## Contribution

* [@xcapentier](mailto:contact@xaviercarpentier.com) The main author.

**PRs are welcome!**

## FAQ

### Is it supported and tested both on android and iOS?

**YES**

### How to get the basic profile of a user after getting the token?

```javascript
const access_token // from this lib
const baseApi = 'https://api.linkedin.com/v1/people/'
const params = [
  'first-name',
  'last-name',
  // add more fields here
]
const qs = { format: 'json' }

const response = await fetch(
  `${baseApi}~:(${params.join(',')})?${querystring.stringify(qs)}`,
  {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + access_token
    }
  }
)
const payload = await response.json()
```

## Other questions

Feel free to [contact me](mailto:contact@xaviercarpentier.com) or [create an issue](https://github.com/xcarpentier/react-native-linkedin/issues/new)

## Alternatives

* [react-native-linkedin-login](https://www.npmjs.com/package/react-native-linkedin-login)
* [react-native-linkedin-sdk](https://www.npmjs.com/package/react-native-linkedin-sdk)
* [react-native-linkedin-oauth](https://www.npmjs.com/package/react-native-linkedin-oauth)

## Licence

[MIT](https://github.com/xcarpentier/react-native-linkedin/blob/master/LICENSE)

> made with ♥
