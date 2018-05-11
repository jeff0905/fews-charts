<template>
  <div class="pie">
      <div class="pie-chart" ref="pieSms4Chart"></div>
  </div>
</template>
<script>
import ChartRender from './chart'

export default {
  name: 'PieSms4Chart',
  mounted: function () {
    const chartRender = new ChartRender()
    const chartInstance = chartRender.init(this.$refs.pieSms4Chart)
    const options = chartRender.getDemoOptions('pieSms4')
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
