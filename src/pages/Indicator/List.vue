<template>
  <v-container class="indicator-list" fill-height pa-4>
    <v-layout  row wrap height="40px" width="100%">
      <v-flex xs12 sm8 md8 lg8 xl8>
        <v-text-field label="输入指标名称" />
      </v-flex>
      <v-flex  xs4 sm4 md4 lg4 xl4 >
        <v-btn primary>
          <v-icon>search</v-icon>
          查询指标
        </v-btn>
        <v-btn primary>
          <v-icon>add</v-icon>
          新增指标
        </v-btn>
      </v-flex>

      <v-flex
        v-if="list.length > 0"
        v-for="(item, index) in list"
        :key="index"
        xs12 sm12 md6 lg6 xl4 class="indicator-item"
      >
        <Charts :option="item" :theme="'light'" />
      </v-flex>
      <v-flex xs12 sm12 md6 lg6 xl4 class="indicator-item">
        <ChartPanel v-on:onShowData="showData()"/>
      </v-flex>
      <v-flex xs12 sm12 md6 lg6 xl4 class="indicator-item">
        this is chart
      </v-flex>
      <v-flex xs12 sm12 md6 lg6 xl4 class="indicator-item">
        this is chart
      </v-flex>
      <v-flex xs12 sm12 md6 lg6 xl4 class="indicator-item">
        this is chart
      </v-flex>
      <v-flex xs12 sm12 md6 lg6 xl4 class="indicator-item">
        this is chart
      </v-flex>
      <v-flex xs12 sm12 md6 lg6 xl4 class="indicator-item">
        this is chart
      </v-flex>
      <v-flex xs12 sm12 md6 lg6 xl4 class="indicator-item">
        this is chart
      </v-flex>
      <v-flex xs12 sm12 md6 lg6 xl4 class="indicator-item">
        this is chart
      </v-flex>
      <v-flex xs12 sm12 md6 lg6 xl4 class="indicator-item">
        this is chart
      </v-flex>
      <v-flex xs12 sm12 md6 lg6 xl4 class="indicator-item">
        this is chart
      </v-flex>
      <v-flex xs12 sm12 md6 lg6 xl4 class="indicator-item">
        this is chart
      </v-flex>
    </v-layout>

     <v-dialog v-model="tableDialog" max-width="500px">
       <HotTables root="hot-example" :rowHeaders="true" allowInsertRow />
     </v-dialog>
  </v-container>
</template>
<script>
import Charts from '@/components/charts/Charts'
import HotTables from '@/components/Table/HotTables'
import ChartPanel from '@/components/panel/ChartPanel'
import ChartOption from '@/$base/utils/ChartOption'
import OptionTemplate from '@/$base/utils/OptionTemplate'
import Mock from '@/pages/BigPage/mockData'
export default {
  name: 'IndicatorList',
  components: {
    Charts,
    ChartPanel,
    HotTables
  },
  data: () => ({
    tableDialog: false,
    list: []
  }),
  created: function () {
    this.genMockList()
    // 1. 获取到保存的list列表.
    [{
      interfaceAddr: '',
      params: {
        beginTime: '',
        endTime: '',
        metric: 'error'
      },
      result: {
        name: '',
        value: ''
      },
      optionTemplate: '{title:${name}}'
    }]
    // 2. 根据接口, 根据option模板, 拼出最终option.

  },
  methods: {
    genMockList () {
      const res = Mock.last30Data
      const name = res.map(item => item.name)
      const value = res.map(item => item.value)
      const option = this.genLine(name, value, 'line')
      this.list.push(option)
      this.list.push(option)
      console.log(this.list)
    },
    genLine (name, data, type) {
      const option = new ChartOption()
      option.setXAxis(name)
        .setYAxis()
        .setGrid()
        .addSeries(data, 'line')
      return option
    },
    showData () {
      this.tableDialog = !this.tableDialog
    }
  }
}
</script>
<style lang="less">
.indicator-item {
  min-height: 200px;
  border: 1px solid #ddd;
}
</style>
