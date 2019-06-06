import axios from 'axios';
import { Environment } from '../../config/environment';
import { getAsyncStorage} from '../asyncStorage';
import { ACCESS_TOKEN } from '../../constants/api'


/**
 * @method Request
 * @param {object} configs
 *
 * @return {promise}
 */

const Request = (configs = {}) => {
  const baseUrl = configs.baseUrl ? configs.baseUrl : Environment.BASE_URL;
  
  const url = baseUrl + configs.path;
  const defaultHeaders = {
    'Content-Type': 'application/json',
  }

  const headers = { ...defaultHeaders, ...configs.headers};
  configs = { ...configs, headers, url };
  console.log('configs', configs)
  return axios(configs);
};

// Request.interceptors.response.use(response => {
//   return response;
// }, error => {

// if (error.response.status === 401) {
//   // create logout call on
// }

// return Promise.reject(error);
// });

export const GET = (path, configs = {}) => Request({ ...configs, path, method: 'GET' });
export const POST = (path, configs = {}) => Request({ ...configs, path, method: 'POST' });
export const PATCH = (path, configs = {}) => Request({ ...configs, path, method: 'PATCH' });
export const PUT = (path, configs = {}) => Request({ ...configs, path, method: 'PUT' });
export const DELETE = (path, configs = {}) => Request({ ...configs, path, method: 'DELETE' });

export default Request;
