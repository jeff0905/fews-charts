<template>
  <div class="pie">
      <div class="pie-chart" ref="pieSmsChart"></div>
  </div>
</template>
<script>
import ChartRender from './chart'

export default {
  name: 'PieSmsChart',
  mounted: function () {
    const chartRender = new ChartRender()
    const chartInstance = chartRender.init(this.$refs.pieSmsChart)
    const options = chartRender.getDemoOptions('pieSms')
    chartInstance.setOption(options)
  },
  methods: {
    requestFullScreen (el) {
      var de = el
      if (de.requestFullscreen) {
        de.requestFullscreen()
      } else if (de.mozRequestFullScreen) {
        de.mozRequestFullScreen()
      } else if (de.webkitRequestFullScreen) {
        de.webkitRequestFullScreen()
      }
    },
    exitFullscreen (el) {
      var de = el
      if (de.exitFullscreen) {
        de.exitFullscreen()
      } else if (de.mozCancelFullScreen) {
        de.mozCancelFullScreen()
      } else if (de.webkitCancelFullScreen) {
        de.webkitCancelFullScreen()
      }
    }
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
