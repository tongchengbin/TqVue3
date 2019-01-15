import axios from 'axios'
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'
import {promised} from "q";
import store from "../store";
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api的base_url
  timeout: 5000 // request timeout
});

service.interceptors.request.use(config => {
  if (getToken()) {
    config.headers['Content-Type'] ='application/json;charset=UTF-8';
    config.headers['Authorization'] = getToken()
  }
  console.log("请求拦截");
    console.log(config);
  return config
},error => {
  Promise.reject(error)
});

service.interceptors.response.use((response) => {
  return response
}, function(error) {
  switch (error.response.status) {
    case 302:
      window.location = '/login';
      break;
    case 404:
        Message({
            message: '资源不存在',
            type: 'error',
            duration: 5 * 1000
        });
        return Promise.reject(error);
      case 403:
          Message({
              message: '认证过期',
              type: 'error',
              duration: 5 * 1000
          });
          store.dispatch('LogOut')
  }
  return Promise.reject(error)
});
export default service
