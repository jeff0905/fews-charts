/**
 * 重构http服务,
 * 1: 有一个最小的服务。
 * 2: 其他所有的复杂，自定义服务，以最小服务为基础来扩展。
 */
import axios from 'axios'

import { Config } from 'HttpConfig';
const $http = {
  interceptors: {
    request: (fn, err) => {
      axios.interceptors.request.use(fn, err)
    },
    response: (fn, err) => {
      axios.interceptors.response.use(fn,err)
    }
  },
  // 所有的请求都调用该方法。
  request: (url, params, method) => {
    const requestConfig = {}
    requestConfig.timeout = Config.timeout
    requestConfig.baseURL = Config.baseURL
    requestConfig.method = method || 'GET'
    requestConfig.headers = Config.headers || {}

    method === 'GET'
    ?
      requestConfig.params = params || {}
    :
      requestConfig.data = params || {}
  },
  get: (url, params) => {
    return this.request(url,params, 'GET');
  },
  post: (url, params) => {
    return this.request(url,params, 'POST');
  },
  put: (url, params) => {
    return this.request(url,params, 'PUT');
  },
  delete: (url, params) => {
    return this.request(url,params, 'DELETE');
  },
  // upload...
}

export default $http;
