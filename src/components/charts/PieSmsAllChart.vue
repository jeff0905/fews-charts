<template>
  <div class="pie">
      <div class="pie-chart" ref="pieSmsAllChart"></div>
  </div>
</template>
<script>
import ChartRender from './chart'

export default {
  name: 'PieSmsAllChart',
  mounted: function () {
    const chartRender = new ChartRender()
    const chartInstance = chartRender.init(this.$refs.pieSmsAllChart)
    const options = chartRender.getDemoOptions('pieSmsAll')
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
    padding: 10px;
  }
}
</style>
