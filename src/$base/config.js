/**
 * 配置
 */
const config = {
  env: 'dev',
  baseURL: 'http://localhost:8080/api',

  uri: {
    LAST: '/thisMonthNum',
    SMSANA: '/smsAna',
    TOP10: '/welab-skyeye/v1/top/{dimension}',
  }
}

export default config
