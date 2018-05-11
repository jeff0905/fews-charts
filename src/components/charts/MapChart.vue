<template>
  <div class="map">
      <div class="map-chart" ref="mapChart"></div>
  </div>
</template>
<script>
import ChartRender from './chart'
export default {
  name: 'MapChart',
  mounted: function () {
    const chartRender = new ChartRender()
    console.log(chartRender, this.$refs.mapChart)
    const chartInstance = chartRender.init(this.$refs.mapChart)
    const options = chartRender.getDemoOptions('map')
    console.log(options)
    chartInstance.setOption(options)
  }
}
</script>

<style lang="less">
.map {
  width: 100%;
  height: 100%;
  .map-chart {
    width: 100%;
    height: 100%;
    padding: 10px;
  }
}
</style>
