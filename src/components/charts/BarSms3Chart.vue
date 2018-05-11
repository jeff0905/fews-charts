<template>
  <div class="bar">
      <div class="bar-chart" ref="barSms3Chart"></div>
  </div>
</template>
<script>
import ChartRender from './chart'

export default {
  name: 'BarSms3Chart',
  mounted: function () {
    const chartRender = new ChartRender()
    const chartInstance = chartRender.init(this.$refs.barSms3Chart)
    const options = chartRender.getDemoOptions('barSms3')
    chartInstance.setOption(options)
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
