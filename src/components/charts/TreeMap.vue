<template>
  <div class="chart-treemap">
    <div class="treemap" ref="treemap" />
  </div>
</template>

<script>
/* eslint-disable */
  import ChartRender from './chart'
  const options = {
    title: {
      text: '当天异常情况',
      subtext: '2017/05',
      left: 'leafDepth'
    },
    tooltip: {
      formatter: '{b}:<br />异常数： {c}件'
    },
    color: ['rgb(100,200,300)'],
    series: [{
      // name: '异常',
      type: 'treemap',
      // visibleMin: 100,
      data: [ // 注意，最外层是一个数组，而非从某个根节点开始。
        {
          value: 1000,
          children: [{
            value: 400, // value字段的值，对应到面积大小。
            // 也可以是数组，如 [2323, 43, 55]，则数组第一项对应到面积大小。
            // 数组其他项可以用于额外的视觉映射，详情参见 series-treemp.levels。
            id: 'someid-1', // id 不是必须设置的。
            // 但是如果想使用 API 来改变某个节点，需要用 id 来定位。
            name: '我来带',
            label: { // 此节点特殊的 label 定义（如果需要的话）。
              // ...         // label的格式参见 series-treemap.label。
            },
            itemStyle: { // 此节点特殊的 itemStyle 定义（如果需要的话）。
              // ...         // label的格式参见 series-treemap.itemStyle。
            }
          }, {
            value: 300,
            id: 'someid-2',
            name: '我来带h5'

          }, {
            value: 200,
            id: 'someid-3',
            name: 'staff H5'

          }, {
            value: 100,
            id: 'someid-4',
            name: 'jdd h5'
          }]
        },
      ],
      leafDepth: 2,
      levels: [{
        itemStyle: {
          normal: {
            borderColor: '#fff',
            borderWidth: 0,
            gapWidth: 1
          }
        }
      }, {
        colorSaturation: [0.3, 0.6],
        itemStyle: {
          normal: {
            borderColorSaturation: 0.7,
            gapWidth: 1,
            borderWidth: 0
          }
        }
      }, {
        colorSaturation: [0.3, 0.5],
        itemStyle: {
          normal: {
            borderColorSaturation: 0.6,
            gapWidth: 1
          }
        }
      }, {
        colorSaturation: [0.3, 0.5]
      }]
    }]
  };
  export default {
    name: 'TreemapChart',
    mounted: function() {
      const chartRender = new ChartRender()
      console.log(chartRender, this.$refs.treemap)
      const chartInstance = chartRender.init(this.$refs.treemap)
      chartInstance.setOption(options)
    }
  }
</script>

<style lang="less" scoped>
  .chart-treemap {
    width: 100%;
    height: 100%;
    .treemap {
      width: 100%;
      height: 100%;
    }
  }
</style>


