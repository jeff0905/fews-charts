<template>
    <v-container fluid class="apm-error-report" fill-height>
      <v-layout row wrap  align-content-start>
        <!-- 导航 -->
        <v-flex d-inline-flex xs12 sm12 md12 xl12 lg12 elevation-2 style="height:40px;">
          <v-breadcrumbs divider="/">
            <v-breadcrumbs-item
              v-for="item in items"
              :key="item.text"
              :disabled="item.disabled"
            >
              {{ item.text }}
            </v-breadcrumbs-item>
          </v-breadcrumbs>
        </v-flex>

        <!-- 查询区域 -->
        <v-flex  my-2 xs12 sm12 md12 xl12 lg12 elevation-2 style="min-height:80px">
          <v-layout row wrap align-content-start>
            <v-flex d-inline-flex xs12 sm12 md12 xl12 lg12>
                  <!-- <v-btn-toggles>
                    <v-btn flat >Last 30m</v-btn>
                    <v-btn flat>1h</v-btn>
                    <v-btn flat>4h</v-btn>
                    <v-btn flat>7h</v-btn>
                    <v-btn flat>1d</v-btn>
                    <v-btn flat>5d</v-btn>
                  </v-btn-toggles> -->
            </v-flex>
            <v-flex d-inline-flex xs12 sm12 md1 xl1 lg1 my-2 class="justify-content-end align-center" style="height:34px">
              <label >App名称</label>
            </v-flex>
            <v-flex d-inline-flex  xs12 sm12 md2 xl2 lg2 my-2  justify-center align-end  style="height:34px">
              <v-text-field clearable color="grey" single-line hide-details label="请输入app的名称" />
            </v-flex>
            <v-flex d-inline-flex xs12 sm12 md1 xl1 lg1  my-2 class="justify-content-end align-center" style="height:34px">
              <label >开始日期</label>
            </v-flex>
            <v-flex d-inline-flex  xs12 sm12 md2 xl2 lg2 my-2  justify-center align-end  style="height:34px">
              <v-text-field clearable color="grey" single-line hide-details label="请选择开始日期" />
            </v-flex>
            <v-flex d-inline-flex xs12 sm12 md1 xl1 lg1  my-2 class="justify-content-end align-center" style="height:34px">
              <label >结束日期</label>
            </v-flex>
            <v-flex d-inline-flex  xs12 sm12 md2 xl2 lg2  my-2 justify-center align-end  style="height:34px">
              <v-text-field clearable color="grey" single-line hide-details label="请选择结束日期" />
            </v-flex>
            <v-flex d-inline-flex  xs12 sm12 md2 xl2 lg2  my-2 text-xs-center justify-center align-center  style="height:34px">
              <v-btn  color="primary">查询</v-btn>
              <v-btn >重置</v-btn>
              <v-btn >开始监控</v-btn>
            </v-flex>
          </v-layout>

        </v-flex>

        <!-- 图表区域 -->
        <v-flex xs12 sm12 md12 xl12 lg12  elevation-2 style="height:600px">
          <v-layout row wrap>
            <v-flex xs12 sm12 md8 xl8 lg8>
              <Charts :option="mainOption" :theme="'light'"  style="height:600px"/>
            </v-flex>
            <v-flex xs12 sm12 md4 xl4 lg4>
              <v-layout column>
                <v-flex xs12 sm12 md6 xl6 lg6>
                  <Charts :option="subOption" />
                </v-flex>
                <v-flex xs12 sm12 md6 xl6 lg6>
                  <Charts :option="subOption1" />
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12 sm12 md8 xl8 lg8 style="height:200px">
              <Charts :option="mainMAOption" />
            </v-flex>
          </v-layout>
        </v-flex>
        <!-- table 数据区域 -->
        <v-flex xs12 sm12 md12 xl12 lg12 elevation-2 my-2>
          <v-layout row wrap  align-content-start>
            <v-flex d-inline-flex md2 color="grey"  class="grey white--text justify-center align-center" style="height:34px">
              标记
            </v-flex>
            <v-flex d-inline-flex md2   class="grey white--text justify-center align-center" style="height:34px">
              标记
            </v-flex>
            <v-flex d-inline-flex md4   class="grey white--text justify-center align-center" style="height:34px">
              标记
            </v-flex>
            <v-flex  d-inline-flex md2   class="grey white--text justify-center align-center" style="height:34px">
              发生时间
            </v-flex>
            <v-flex  d-inline-flex md2   class="grey white--text justify-center align-center" style="height:34px">
              耗时
            </v-flex>

            <template v-for="item in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]">
              <v-flex d-inline-flex md2  class="justify-center align-center" style="height:34px"  :key="`col1-${item}`">
                标记{{item}}
              </v-flex>
              <v-flex d-inline-flex md2   class="justify-center align-center" style="height:34px"  :key="`col2-${item}`">
                标记{{item}}
              </v-flex>
              <v-flex d-inline-flex md4   class="justify-center align-center" style="height:34px" :key="`col3-${item}`">
                标记{{item}}
              </v-flex>
              <v-flex  d-inline-flex md2   class="justify-center align-center" style="height:34px" :key="`col4-${item}`">
                发生时间{{item}}
              </v-flex>
              <v-flex  d-inline-flex md2   class="justify-center align-center" style="height:34px" :key="`col5-${item}`">
                耗时{{item}}
              </v-flex>
            </template>

          </v-layout>
        </v-flex>
      </v-layout>

    </v-container>
</template>
<script>
import Charts from '@/components/charts/Charts'
import ChartOption from '@/$base/utils/ChartOption'
import Stat from '@/$base/assets/js/Stat'
import Mock from './mockData'
export default {
  name: 'ApplicationInspector',
  components: {
    Charts
  },
  data: () => (
    {
      mainOption: {},
      subOption: {},
      subOption1: {},
      mainMAOption: {},
      items: [
        {
          text: 'Dashboard',
          disabled: false
        },
        {
          text: '应用异常分析',
          disabled: false
        }
      ]
    }
  ),
  mounted: function () {
    this.mainOption = this.genMainOption()
    this.subOption = this.genSubOption()
    this.subOption1 = this.genSubOption1()
    this.mainMAOption = this.genMaOption()
  },
  methods: {
    genMainOption () {
      const res = Mock.last30Data
      const max = res.map(item => item.max)
      const min = res.map(item => item.min)
      const avg = res.map(item => item.avg)
      const all = res.map(item => item.value)
      const label = res.map(item => item.name)
      const maxName = res.map(item => item.maxName)
      const minName = res.map(item => item.minName)

      const option = new ChartOption()
      const option1 = new ChartOption()
      const dashLine = {normal:{type:'dotted'}}
      option
        .setLegend(['数量'])
        .setGrid({top: '4%', height: '56%', left: '4%', show: true, containLabel: true})
        .setGrid({top: '60%', height: '20%', left: '4%',  containLabel: true})
        .setGrid({top: '80%', height: '20%', left: '4%',  containLabel: true})
        .setXAxis(label, 'category', true, {key: 'gridIndex', value: 0}, {key: 'splitLine', value: {show: true}})
        .setXAxis(label, 'category', true, {key: 'gridIndex', value: 1}, {key: 'splitLine', value: {show: true}})
        .setXAxis(label, 'category', true, {key: 'gridIndex', value: 2}, {key: 'splitLine', value: {show: true}})
        .setYAxis('value', '数量', true, {key: 'gridIndex', value: 0}, {key: 'splitLine', value: {show: true}})
        .setYAxis('value', '数量', true, {key: 'gridIndex', value: 1}, {key: 'splitLine', value: {show: true}})
        .setYAxis('value', '数量', true, {key: 'gridIndex', value: 2}, {key: 'splitLine', value: {show: true}})
        // .addSeries(max, 'line', '数量', 0 , { key: 'lineStyle', value: dashLine} )
        // .addSeries(min, 'line', '最小数量', 0)
        // .addSeries(avg, 'line', '平均数量', 0)
        .addSeries(all, 'line', '总数量', 0, { key: 'xAxisIndex', value: 0}, { key: 'yAxisIndex', value: 0})
        .addSeries(all, 'line', '总数量', 0, { key: 'xAxisIndex', value: 1}, { key: 'yAxisIndex', value: 1})
        .addSeries(all, 'line', '总数量', 0, { key: 'xAxisIndex', value: 2}, { key: 'yAxisIndex', value: 2})
      return option
    },
    genMaOption () {
      const res = Mock.last30Data
      const all = res.map(item => item.value)
      const label = res.map(item => item.name)
      const stat = new Stat()
      const ma5 = stat.getMA(1, all)
      const ma10 = stat.getMA(20, all)
      const option = new ChartOption()
      option.setXAxis(label)
        .setYAxis()
        .setLegend(['5平均', '20平均'])
        .addSeries(ma5, 'line', '5平均', 0 )
        .addSeries(ma10, 'line', '20平均', 0)
      return option
    },
    genSubOption () {
      const res = Mock.apps
      const name = res.map(item => item.name)
      const list = res.map(item => item.value)
      const option = new ChartOption()
      option.setXAxis(name)
        .setYAxis()
        .addSeries(list, 'bar')
      return option
    },
    genSubOption1 () {
      const option = new ChartOption()
      option.setXAxis(['a', 'b', 'c'])
        .setYAxis()
        .addSeries([15, 20, 9], 'pie')
      return option
    }
  }
}
</script>
<style lang="less" scoped>

</style>
