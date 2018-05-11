<template>
  <div class="scatter">
      <div class="scatter-chart" ref="scatterSizeChart"></div>
  </div>
</template>
<script>
import ChartRender from './chart'

export default {
  name: 'ScatterSizeChart',
  mounted: function () {
    const chartRender = new ChartRender()
    const chartInstance = chartRender.init(this.$refs.scatterSizeChart)
    const options = chartRender.getDemoOptions('scatterSize')
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
