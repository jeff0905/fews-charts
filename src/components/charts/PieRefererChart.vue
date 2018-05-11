<template>
  <div class="pie">
      <div class="pie-chart" ref="pieRefererChart"></div>
  </div>
</template>
<script>
import ChartRender from './chart'

export default {
  name: 'PieRefererChart',
  mounted: function () {
    const chartRender = new ChartRender()
    const chartInstance = chartRender.init(this.$refs.pieRefererChart)
    const options = chartRender.getDemoOptions('pieReferer')
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
