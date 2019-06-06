/** @format */
import './ReactotronConfig'
import {AppRegistry} from 'react-native';
import App from './src';
import ServerError from './src/components/serverErrorPage'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
