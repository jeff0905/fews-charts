/**
 * 图表数据的获取
 */
import $http from '@/$base/http'
import Config from '@/$base/config'

const { baseURL, uri } = Config

const ChartService = {}

ChartService.get = function (url, params) {
  return $http.get(url, params)
    .then(res => {
      const { data } = res
      return Promise.resolve(data)
    })
}

// 获取短信统计数据.
ChartService.getSmsAna = function (params) {
  const url = `${baseURL}${uri.SMSANA}`
  return ChartService.get(url, params)
}

export default ChartService
