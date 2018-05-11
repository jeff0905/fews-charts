<template>
  <div class="bar">
      <div class="bar-chart" ref="barSmsFailChart"></div>
  </div>
</template>
<script>
import ChartRender from './chart'

export default {
  name: 'BarSmsFailChart',
  mounted: function () {
    const chartRender = new ChartRender()
    const chartInstance = chartRender.init(this.$refs.barSmsFailChart)
    const options = chartRender.getDemoOptions('barSmsFail')
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
