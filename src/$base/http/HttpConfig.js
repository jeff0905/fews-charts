/**
 *
 *
 * BaseUrl,
 * timeout,
 * headers: 请求头部.,X-User-Mobile
 * 发送请求的格式(默认),
 * 接受请求的格式(默认http).
 */

// import list from './HeaderList';
export const initConfig = (...args) => {
  // headers..
};

const COMMON_ERROR = {
  '404': '',
  '500': ''
}
export const MESSAGE = {
  SERVER_ERROR: '服务器异常',
  RESULT_ERROR: '出错了',
};

export default {
  timeout: 5000, // 5秒超时,
  baseURL: '',   // baseUrl
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  }
}
