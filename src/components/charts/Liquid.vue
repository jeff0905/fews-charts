
<template>
  <div class="liquid" ref="liquid">
      <div class="liquid-chart" ref="liquidChart"></div>
  </div>
</template>
<script>
/* eslint-disable */
/**
 * liquid图表,
 *
 * 可配置项:
 * 1. 同比, 环比, 再增加个grid.
 * 2.
 *
 */
import 'echarts-liquidfill'
import ChartRender from './chart'

export default {
  name: 'LiquidChart',
  props: ['option'],
  data: () => ({
    chartOption: this.option,
    chartInstance : null
  }),
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    option(newOption, oldOption) {
      console.log(`新的${newOption},旧的${oldOption},是否一样${newOption == oldOption}`)
      this.chartInstance.setOption(newOption);
    }
  },
  mounted: function () {
    const chartRender = new ChartRender()
    console.log(chartRender, this.$refs.liquidChart, this.$refs.liquidChart.getBoundingClientRect())
    this.chartInstance = chartRender.init(this.$refs.liquid)
    let options = {
      series: [{
          type: 'liquidFill',
          data: [0.6, 0.5, 0.4, 0.3],
          outline: {
              show: false
          },
          label: {
            position: ['0%', '20%'],
            formatter: function() {
                return 'bug率';
            },
            fontSize: 20,
            color: '#D94854'
          }
      }]
    };
    if (this.option) {
      options = this.option;
    }
    console.log(options)
    this.chartInstance.setOption(options);

    window.addEventListener('resize', this.resize);
  },
  methods: {
    resize() {
      console.log('大小改变了');
      const rect = {
        width: this.$refs.liquid.getBoundingClientRect().width,
        height:this.$refs.liquid.getBoundingClientRect().height
      }
      this.chartInstance.resize(rect)
    }
  }
}
</script>

<style lang="less">
.liquid {
  width: 100%;
  height: 100%;
  .liquid-chart {
    width: 100%;
    height: 100%;
    padding: 10px;
  }
}
</style>
