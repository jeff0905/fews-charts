
<template>
  <div class="line2">
      <div class="line2-chart" ref="Line2Chart"></div>
  </div>
</template>
<script>
import ChartRender from './chart'

export default {
  name: 'Line2Chart',
  mounted: function () {
    const chartRender = new ChartRender()
    const chartInstance = chartRender.init(this.$refs.Line2Chart)
    const options = chartRender.getLine2ChartOptions()
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
