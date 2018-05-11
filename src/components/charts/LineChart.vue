<template>
  <div class="line" ref="chartContainer">
    <div class="line-chart" ref="lineChart"></div>
  </div>
</template>

<script>
/**
 * Line图表,
 *
 * 可配置项:
 * 1. 同比, 环比, 再增加个grid.
 * 2.
 *
 */
import ChartRender from './chart'
import echarts from 'echarts'
export default {
  name: 'LineChart',
  props: ['option', 'title', 'interval'],
  data: () => ({
    chartOption: this.option,
    chartInstance: null
  }),
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    option (newOption, oldOption) {
      console.log(
        `新的${newOption},旧的${oldOption},是否一样${newOption === oldOption}`
      )
      if (this.chartInstance) {
        this.chartInstance.setOption(newOption)
      }
    }
  },
  mounted: function () {
    // const { width, height } = this.$refs.chartContainer.getBoundingClientRect()
    const chartRender = new ChartRender()
    const renderDom = this.$refs.chartContainer
    console.log('renderDom',
      renderDom,
      renderDom.getBoundingClientRect()
    )
    this.chartInstance = echarts.init(renderDom)
    let options = null
    if (this.option) {
      options = this.option
    } else {
      options = chartRender.getDemoLineOptions()
    }
    if (this.title) {
      options.title.text = this.title
    }
    this.chartInstance.setOption(options)
    // })

    this.$refs.lineChart.addEventListener('resize', this.resize)
  },

  destroyed: function () {
    this.$refs.lineChart.removeEventListener('resize')
  },

  methods: {
    resize () {
      console.log('大小改变了')
      const rect = {
        width: this.$refs.chartContainer.getBoundingClientRect().width,
        height: this.$refs.chartContainer.getBoundingClientRect().height
      }
      this.chartInstance.resize(rect)
    }
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
