<template>
  <div class="pie">
      <div class="pie-chart" ref="pieChart"></div>
  </div>
</template>
<script>
import ChartRender from './chart'

export default {
  name: 'PieChart',
  props: ['title'],
  mounted: function () {
    const chartRender = new ChartRender()
    console.log(chartRender, this.$refs.pieChart)
    const chartInstance = chartRender.init(this.$refs.pieChart)
    const options = chartRender.getDemoOptions('pie2')
    options.title.text = this.title || ''
    options.title.textStyle.fontSize = 12
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
