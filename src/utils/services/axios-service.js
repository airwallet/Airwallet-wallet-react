import axios from 'axios';

import { RootURL } from '../../constants/endpoint-constants';

// Set default params and headers for axios
axios.defaults.baseURL = RootURL;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common.Accept = 'application/json';

const AxiosService = (function () {
  let AuthorizationToken = null;

  function addHeaders(userConfig) {
    const globalHeaders = {};

    // You can set global headers here
    if (AuthorizationToken) {
      globalHeaders.Authorization = AuthorizationToken;
    }

    const { params, headers, ...restConfigs } = userConfig;
    const { filter, ...restParams } = params || {};

    // Return extended config
    return {
      ...restConfigs,
      headers: {
        ...globalHeaders,
        ...headers,
      },
      params: {
        ...restParams,
        // filter: JSON.stringify(filter || {}),
      },
    };
  }

  // Set authorization token
  function setAuthorizationToken(token) {
    AuthorizationToken = `Bearer ${token}`;
  }

  // GET method
  function get(endPoint, userConfig = {}) {
    return axios.get(endPoint, addHeaders(userConfig));
  }

  // POST method
  function post(endPoint, params = {}, userConfig = {}) {
    return axios.post(endPoint, params, addHeaders(userConfig));
  }

  // PUT method
  function put(endPoint, params = {}, userConfig = {}) {
    return axios.put(endPoint, params, addHeaders(userConfig));
  }

  // DELETE method
  function remove(endPoint, params = {}, userConfig = {}) {
    return axios.delete(endPoint, addHeaders(userConfig));
  }

  return {
    setAuthorizationToken,
    get,
    post,
    put,
    remove,
  };
});

export default AxiosService();
