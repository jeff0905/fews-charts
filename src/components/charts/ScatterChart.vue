<template>
  <div class="scatter">
      <div class="scatter-chart" ref="scatterChart"></div>
  </div>
</template>
<script>
import ChartRender from './chart'

export default {
  name: 'ScatterChart',
  mounted: function () {
    const chartRender = new ChartRender()
    console.log(chartRender, this.$refs.scatterChart)
    const chartInstance = chartRender.init(this.$refs.scatterChart)
    const options = chartRender.getDemoOptions('scatter')
    console.log(options)
    chartInstance.setOption(options)
  }
}
</script>

<style lang="less">
.scatter {
  width: 100%;
  height: 100%;
  .scatter-chart {
    width: 100%;
    height: 100%;
    padding: 10px;
  }
}
</style>
