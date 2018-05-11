<template>
  <div class="pie">
      <div class="pie-chart" ref="pieNestedChart"></div>
  </div>
</template>
<script>
import ChartRender from './chart'

export default {
  name: 'PieNestedChart',
  mounted: function () {
    const chartRender = new ChartRender()
    const chartInstance = chartRender.init(this.$refs.pieNestedChart)
    const options = chartRender.getDemoOptions('pieNested')
    chartInstance.setOption(options)
  }
}
</script>

<style lang="less">
.pie {
  width: 100%;
  height: 100%;
  .pie-chart {
    width: 100%;
    height: 100%;
  }
}
</style>
