<template>
  <div class="chart-wrapper" ref="chartContainer">
    <div class="chart" ref="chart" v-if="!this.option">{{msg}}</div>
  </div>
</template>

<script>
import echarts from 'echarts'
import macarons from 'echarts/theme/macarons'
const EVENTS = [
  'click',
  'dbclick',
  'mousedown',
  'mousemove',
  'mouseup',
  'mouseover',
  'mouseout'
]
export default {
  name: 'Charts',
  props: {
    option: Object,
    initOption: Object,
    theme: [String, Object],
    render: [String, Object],
    group: String,
    autoResize: Boolean,
    watchShallow: Boolean
  },
  data: () => ({
    chartInstance: null,
    selfOption: this.option,
    msg: ''
  }),
  watch: {
    option: function (val, oldVal) {
      console.log('watch option', this.chartInstance, val, oldVal)
      const newOption = Object.assign({}, val)
      if (this.chartInstance) {
        this.chartInstance.setOption(newOption)
        this.chartInstance.resize()
      } else {
        this.init()
      }
    },
    group (group) {
      this.chartInstance.group = group
      echarts.connect(group)
    }
  },
  // 清楚echart instance
  destroyed: function () {
    if (this.chartInstance) {
      echarts.dispose(this.chartInstance)
      this.chartInstance = null
    }
  },
  created: function () {
    this.selfOption = this.option
  },
  mounted: function () {
    if (this.option) {
      console.log('初始化chart', this.option, this.group, this.theme, this.render)
      this.$nextTick(() => {
        this.init()
      })
    }
  },

  beforeDestroy: function () {
    this.dispose()
    this.chartInstance = null
  },

  methods: {
    init () {
      if (this.chartInstance) {
        return
      }
      const render = this.render ? this.render : 'svg'
      const theme = this.theme || macarons
      let chart = echarts.init(this.$refs.chartContainer, theme, {renderer: render})
      this.chartInstance = chart
      this.chartInstance.setOption(this.option)

      if (this.group) {
        this.connect()
      }
      EVENTS.forEach(event => {
        this.chartInstance.on(event, params => {
          this.$emit(event, params)
        })
      })
    },
    resize () {
      // window.addEventListener('resize', this.handleResize)
    },
    handleResize () {
      this.chartInstance.resize()
    },

    showLoading (params) {
      this.delegateMethod('showLoading', params)
    },

    hideLoading () {
      this.delegateMethod('hideLoading')
    },

    dispose () {
      this.delegateMethod('dispose')
    },

    connect () {
      this.delegateWarn()
      this.setProperties('group', this.group)
      echarts.connect(this.group)
    },

    setProperties (name, value) {
      this.delegateWarn()
      this.chartInstance[name] = value
    },

    delegateMethod (name, ...args) {
      this.delegateWarn()
      return this.chartInstance[name](...args)
    },

    delegateWarn () {
      if (!this.chartInstance) {
        console.warn(`cannot invoke [${name}] method before the chart instance is initialized, Set props [option] first`, this)
        return false
      }
    }
  }
}
</script>

<style lang="less">
.chart-wrapper {
  width: 100%;
  height: 100%;
  position:relative;
  .chart {
    width: 100%;
    height: 100%;
  }
}
.chart-wrapper div:first-child {
  width: 100%;
  height: 100%;
}
</style>
