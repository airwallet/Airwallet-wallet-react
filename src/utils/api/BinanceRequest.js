import axios from 'axios';
import { BINANCE_BASE_URL } from '../../constants/api';


/**
 * @method Request
 * @param {object} configs
 *
 * @return {promise}
 */

const BinanceRequest = (configs = {}) => {
  const baseUrl = BINANCE_BASE_URL;
  
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

export const GET = (path, configs = {}) => BinanceRequest({ ...configs, path, method: 'GET' });
export const POST = (path, configs = {}) => BinanceRequest({ ...configs, path, method: 'POST' });
export const PATCH = (path, configs = {}) => BinanceRequest({ ...configs, path, method: 'PATCH' });

export default BinanceRequest;
