
<template>
  <div class="line2">
      <div class="line2-chart" ref="LineAndBarChart"></div>
  </div>
</template>
<script>
import ChartRender from './chart'

export default {
  name: 'LineAndBarChart',
  mounted: function () {
    const chartRender = new ChartRender()
    const chartInstance = chartRender.init(this.$refs.LineAndBarChart)
    const options = chartRender.getLineAndBarChartOptions()
    chartInstance.setOption(options)
  }
}
</script>

<style lang="less">
.line2 {
  width: 100%;
  height: 100%;
  .line2-chart {
    width: 100%;
    height: 100%;
  }
}
</style>
