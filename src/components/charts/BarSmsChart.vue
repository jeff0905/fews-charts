<template>
  <div class="bar">
      <div class="bar-chart" ref="barSmsChart"></div>
  </div>
</template>
<script>
import ChartRender from './chart'

export default {
  name: 'BarSmsChart',
  mounted: function () {
    const chartRender = new ChartRender()
    const chartInstance = chartRender.init(this.$refs.barSmsChart)
    const options = chartRender.getDemoOptions('barSms')
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
