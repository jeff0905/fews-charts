<template>
  <div class="bar">
      <div class="bar-chart" ref="barChart"></div>
  </div>
</template>
<script>
import ChartRender from './chart'

export default {
  name: 'BarChart',
  mounted: function () {
    const chartRender = new ChartRender()
    console.log(chartRender, this.$refs.barChart)
    const chartInstance = chartRender.init(this.$refs.barChart)
    const options = chartRender.getDemoOptions('bar')
    console.log(options)
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
