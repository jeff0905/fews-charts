<template>
  <div class="barTop">
      <div class="barTop-chart" ref="barTopChart"></div>
  </div>
</template>
<script>
import ChartRender from './chart'
import $http from '@/$base/http'

export default {
  name: 'BarTopChart',
  mounted: function () {
    const chartRender = new ChartRender()
    const chartInstance = chartRender.init(this.$refs.barTopChart)
    const options = chartRender.getDemoOptions('barTop')
    chartInstance.setOption(options)
    // 异步动态加载数据
    chartInstance.showLoading()
    const _this = this
    this.timeId = setInterval(() => {
      $http.get('http://localhost:8080/api/top10').then(function (res) {
        chartInstance.hideLoading()
        const dataArr = res.data
        const name = dataArr.map(_this.getName)
        const value = dataArr.map(_this.getValue)
        // console.log('每3000毫秒更新一次数据')
        chartInstance.setOption({
          yAxis: {
            data: name
          },
          series: [{
            data: value
          }]
        })
      })
    }, 3000)
  },
  methods: {
    getName (currentValue) {
      return currentValue.name
    },
    getValue (currentValue) {
      return currentValue.value
    }
  },
  destroyed: function () {
    clearInterval(this.timeId)
  }
}
</script>

<style lang="less">
.barTop {
  width: 100%;
  height: 100%;
  .barTop-chart {
    width: 100%;
    height: 100%;
    padding: 10px;
  }
}
</style>
