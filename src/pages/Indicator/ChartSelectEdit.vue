<template>
 <v-container fluid grid-list-sm>
          <v-layout row wrap>
            <v-flex xs3 xl1 md2 sm2 lg1 v-for='chartIcon in chartIcons' class='icon-chart' :key='chartIcon.name' >
              <div @click='emitOnSelect(chartIcon)' draggable ref='dragItem'>
                <img :src='chartIcon.svg' alt=''>
                    <!-- <input type='checkbox' name='scatter'> -->
                <h5>
                  <div>{{chartIcon.name}}</div>
                </h5>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
</template>
<script>
// import $ from 'jquery'
// require('jquery-ui/ui/widgets/draggable')
export default {
  name: 'ChartSelectEdit',
  data: () => ({
    // remove to the config.js
    chartIcons: [
      {
        svg: 'http://echarts.baidu.com/images/builder/chart/bar.svg',
        name: '柱状图 ',
        type: 'bar'
      },
      {
        svg: 'http://echarts.baidu.com/images/builder/chart/line.svg',
        name: '折线图',
        type: 'line'
      },
      {
        svg: 'http://echarts.baidu.com/images/builder/chart/pie.svg',
        name: '饼图 ',
        type: 'pie'
      },
      {
        svg: 'http://echarts.baidu.com/images/builder/chart/scatter.svg',
        name: '散点图 ',
        type: 'scatter'
      },
      {
        svg: 'http://echarts.baidu.com/images/builder/chart/tree.svg',
        name: '树图 ',
        type: 'tree'
      },
      {
        svg: 'http://echarts.baidu.com/images/builder/chart/treemap.svg',
        name: '矩形树图 '
      },
      {
        svg: 'http://echarts.baidu.com/images/builder/chart/map.svg',
        name: '地图  '
      },
      {
        svg: 'http://echarts.baidu.com/images/builder/chart/lines.svg',
        name: '线图  '
      },
      {
        svg: 'http://echarts.baidu.com/images/builder/chart/sankey.svg',
        name: '桑吉图',
        type: 'sankey'
      },
      {
        svg: 'http://echarts.baidu.com/images/builder/chart/funnel.svg',
        name: '漏斗图',
        type: 'funnel'
      }
    ]
  }),
  mounted: function () {

  },
  methods: {
    emitOnSelect: function (item) {
      this.$emit('onSelect', item)
    }
  }
}
</script>
<style lang='less'>
// icon-chart
.icon-chart {
  border: 1px solid rgba(41, 60, 85, 0.6);
  display: inline-block;
  vertical-align: top;
  // margin: 10px 10px;
  text-align: center;
  width: 60px;
  border: 2px solid transparent;
  cursor: pointer;
  -webkit-transition: all 0.4s;
  transition: all 0.4s;
  &:hover {
    box-shadow: 2px 2px 2px #293c55, -2px -2px 2px #293c55;
  }
  img {
    margin-top: 5px;
    width: 80px;
    height: 80px;
    padding: 5px 10px;
  }
  .h5 {
    color: #000;
    font-weight: normal;
    margin: 5px 0;
    padding: 0;
    line-height: 10px;
    position: relative;
  }
}
</style>
