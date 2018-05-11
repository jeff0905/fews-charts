<template>
  <div class="bar">
      <div class="bar-chart" ref="barSms2Chart"></div>
  </div>
</template>
<script>
import ChartRender from './chart'

export default {
  name: 'BarSms2Chart',
  props: ['itemData'],
  mounted: function () {
    const chartRender = new ChartRender()
    const chartInstance = chartRender.init(this.$refs.barSms2Chart)
    const options = chartRender.getDemoOptions('barSms2')
    chartInstance.setOption(options)
    console.log(this.itemData)
    const dataAcount = this.itemData.account.map(this.getAcountName)
    const dataRest = this.itemData.account.map(this.getRestName)
    const dataSuc = this.itemData.account.map(this.getSucName)
    const dataFail = this.itemData.account.map(this.getFailName)
    chartInstance.setOption({
      title: {
        text: `${this.itemData.channel}短信余量&消耗`
      },
      xAxis: {
        data: dataAcount
      },
      series: [
        {
          name: '短信余量',
          data: dataRest
        },
        {
          name: '发送成功',
          data: dataSuc
        },
        {
          name: '发送失败',
          data: dataFail
        }
      ]
    })
  },
  methods: {
    getAcountName (currentValue) {
      return currentValue.value
    },
    getRestName (currentValue) {
      return currentValue.restName
    },
    getSucName (currentValue) {
      return currentValue.sucName
    },
    getFailName (currentValue) {
      return currentValue.failName
    }
  }
}
</script>

<style lang="less">
.bar {
  width: 100%;
  height: 100%;
  .bar-chart {
    width: 100%;
    height: 100%;
    padding: 10px;
  }
}
</style>
