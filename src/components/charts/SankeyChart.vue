
<template>
  <div class="sankey">
      <div class="sankey-chart" ref="SankeyChart"></div>
  </div>
</template>
<script>
import ChartRender from './chart'

export default {
  name: 'SankeyChart',
  mounted: function () {
    const chartRender = new ChartRender()
    const chartInstance = chartRender.init(this.$refs.SankeyChart)
    const options = chartRender.getSankeyChartOptions()
    chartInstance.setOption(options)
  }
}
</script>

<style lang="less">
.sankey {
  width: 100%;
  height: 100%;
  .sankey-chart {
    width: 100%;
    height: 100%;
  }
}
</style>
