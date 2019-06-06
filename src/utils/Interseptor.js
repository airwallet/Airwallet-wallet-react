import axios from 'axios';

export default {
  setupInterceptors: (store) => {

      axios.interceptors.response.use(response => {
        return response;
      }, error => {

      if (error.response.status === 401) {
        // create logout call on
      }

      return Promise.reject(error);
    });
  },
};
