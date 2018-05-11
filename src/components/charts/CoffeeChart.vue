
<template>
  <div class="line">
      <div class="line-chart" ref="CoffeeChart"></div>
  </div>
</template>
<script>
import ChartRender from './chart'

export default {
  name: 'CoffeeChart',
  mounted: function () {
    const chartRender = new ChartRender()
    const chartInstance = chartRender.init(this.$refs.CoffeeChart)
    const options = chartRender.getCoffeeChartOptions()
    chartInstance.setOption(options)
  }
}
</script>

<style lang="less">
.line {
  width: 100%;
  height: 100%;
  .line-chart {
    width: 100%;
    height: 100%;
  }
}
</style>
