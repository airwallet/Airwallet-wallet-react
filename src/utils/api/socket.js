import SocketIOClient from 'socket.io-client';
import { Environment } from '../../config/environment';
import { USER_DATA, ACCESS_TOKEN } from '../../constants/api';
import { getAsyncStorage } from '../asyncStorage';

module.exports = {
  createSocket() {

   return getAsyncStorage(USER_DATA).then(data => {
      let userData = JSON.parse(data)
      const token = userData && userData[ACCESS_TOKEN];
      let socket = SocketIOClient(Environment.BASE_URL, {
        query: `user_token=${token}`,
        secure: true,
        jsonp: false,
        transports: ['websocket']
      });
      // console.log('socket open', socket.open())
      console.log('socket', socket)

      global.socket = socket;
      return ;
    })
  }
}


