/**
 * TODO: addheader方法需要重新提取.
 * TODO: 不需要注入token header的请求.
 * TODO: 获取到token的请求.
 * TODO: header头部: 只有登录成功之后才需要注入的header和 登录之前需要注入的header.
 * @desp ,将业务中的 header, request 请求，response响应的部分抽离出来.
 * 1. move the const variable to the HttpConfig.js
 * 2. move the biz code to the **.js
 * 3. move the MESSAGE to the other file.
 * 4. import the ErrorHelper object... like the alert , prompt, confirm components
 *            should be invoked by the components model.
 */
/* eslint-disable */
import axios from 'axios'
import Config from './../config'
/**
 * TODO: move to the config.js
 * remove the code to config.js
 * 排除改变http 请求header中属性值的 请求URI  排除不需要拦截的请求.
* */

/**
 *
 * 拦截器.request中除了登录注册之外注入token.  excludeURL
 * 请求拦截:
 *      1. loading........, 排除不需要拦截的请求.
 *      2. 注入token等属性到header里。
 *
 */

const interceptor = {
  reqNum: 0,
  reqInterSuccess: (config) => {
    return config
  },

  reqInterFail: (error) => {
    Promise.reject(error)
  },

  // 拦截错误code, 并且注入token 到local里.
  responseInterSuccess: (response) => {
    return response
  },

  // code = 999
  responseInterFail: (...args) => {
    return Promise.reject(args)
  },
}

const request = (url, params, method, ...type) => {
  console.log(Config.baseURL)
  const p = {}
  p.method = method
  p.baseURL = Config.baseURL // move to config.js
  p.url = url
  p.timeout = 10000
  p.headers = {
    'X-Requested-With': 'XMLHttpRequest',
  }


  if (method === 'GET') {
    p.params = params
  } else {
    p.data = params
  }

  // TODO: remove the code, need  all interfaces to adapter payload or form-data or www-urlencode......
  if (type && type[0] && type[0].headers) {
    const newHeaders = Object.assign({}, p.headers, type[0].headers)
    p.headers = newHeaders
    p.params = params
  }
  console.log(p.headers)
  return axios(p)
}

const upload = (url, form, method, ...type) => {
  const req = {}
  req.method = method
  req.baseURL = Config.env.saash5 || ''
  req.url = url

  req.timeout = 10000
  req.headers = {
    // 'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Type': 'multipart/form-data',
    'X-User-Id': '100015',
    'X-Org-Id': '126845145646',
  }
  req.data = form
  return axios(req)
}

const api = {
  get: (url, params, ...type) => request(url, params, 'GET', ...type),
  post: (url, params, ...type) => request(url, params, 'POST', ...type),
  put: (url, params, ...type) => request(url, params, 'PUT', ...type),
  delete: (url, params, ...type) => request(url, params, 'DELETE', ...type),
  upload: (url, form, ...type) => upload(url, form, 'POST', ...type),
}

axios.interceptors.request.use(interceptor.reqInterSuccess, interceptor.reqInterFail)
axios.interceptors.response.use(interceptor.responseInterSuccess, interceptor.responseInterFail)

export default api
