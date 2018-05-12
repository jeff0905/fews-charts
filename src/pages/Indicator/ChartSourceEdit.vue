<template>
  <div class="chart-source-edit">
    <v-container fill-height fluid pa-0>
      <v-layout row>
        <v-flex xs8 sm8 md8 xl8 lg8>
        <v-layout column>
          <v-flex d-inline-flex xs12 sm12 md12 xl12 lg12  style="width:100%;height:50px;">
              <div class="d-inline-flex  align-center justify-center" style="width: 160px">
                <label>选择指标</label>
              </div>
              <div class="d-inline-flex">
                <v-select
                  label="选择指标"
                  :items="dataSource"
                  item-text="iname"
                  item-value="iuri"
                  v-model="selectedDataSource"
                  v-on:input="handleSelectSource"
                  dense
                  single-line
                  autocomplete
                  hide-details
                  :max-height="40"
                />
              </div>
              <div class="d-inline-flex  align-center justify-center" style="width: 160px">
                  <v-btn v-on:click="queryData()"> 执行</v-btn>
              </div>
          </v-flex>

        <v-flex justify-center d-inline-flex xs12 sm12 md12 xl12 lg12  style="width:100%;height:50px;">
            <div class="d-inline-flex  align-center justify-center" style="width: 160px">
              <label>类目轴选择</label>
            </div>
            <v-text-field class="mx-2" v-model="optionMap.xaxisName" label="对应的列名" single-line style="width:100px;"/>
            <v-text-field class="mx-2" v-model="optionMap.xaxisLabel" lable="显示的列名" single-line  style="width:140px;"/>
            <div class="d-inline-flex align-center justify-center" style="width: 80px">
              <v-btn small>
                <v-icon>add</v-icon>
                添加
              </v-btn>
            </div>
        </v-flex>

        <v-flex d-inline-flex xs12 sm12 md12 xl12 lg12  style="width:100%;height:50px;">
            <div  class="d-inline-flex  align-center justify-center"  style="width: 160px">
              值轴选择
            </div>
            <v-text-field class="mx-2" v-model="optionMap.yaxisName" label="对应的列名" single-line  style="width:100px;"/>
            <v-text-field class="mx-2" v-model="optionMap.yaxisLabel" lable="显示的列名" single-line style="width:140px;"/>
            <div class="d-inline-flex align-center justify-center" style="width: 80px">
              <v-btn small>
                <v-icon>add</v-icon>
                添加
              </v-btn>
            </div>
        </v-flex>

        <v-flex >
          <v-layout row>
            <v-flex d-inline-flex class="d-inline-flex  align-center justify-center" style="width: 160px">
              <label>是否加入同比</label>
            </v-flex>
            <v-flex d-inline-flex xs8 xm8 md8 xl8 align-center justify-center>
              <v-checkbox :label="`加入同比`" style="height:30px"></v-checkbox>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex>
          <v-layout row>
            <v-flex d-inline-flex class="d-inline-flex  align-center justify-center" style="width: 160px">
              <label>是否加入环比</label>
            </v-flex>
            <v-flex d-inline-flex xs8 xm8 md8 xl8 align-center justify-center>
              <v-checkbox :label="`加入环比`" style="height:30px"></v-checkbox>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex>
          <v-layout row wrap justify-space-around>
            <v-btn>重置</v-btn>
            <v-btn>执行数据源数据查看图表效果</v-btn>
            <v-btn @click="renderChart()">确定</v-btn>
          </v-layout>
        </v-flex>
      </v-layout>
        </v-flex>
        <v-flex xs4 sm4 md4 xl4 lg4>
            <HotTable root="hot-example" :settings="hotSettings" :rowHeaders="true" allowInsertRow />
        </v-flex>
      </v-layout>
      

    </v-container>
  </div>
</template>

<script>
import HotTable from '@handsontable/vue'
import $http from '@/$base/http'
import config from '@/$base/config'
export default {
  name: 'ChartSourceEdit',
  components: {
    HotTable
  },
  data: () => ({
    dataSource: [
      {iname: '最近30分钟', iuri: `${config.baseURL}${config.uri.LAST}`}
    ], // 数据源
    selectedDataSource: {}, // 选择的数据源
    hotSettings: {
      data: [
        ['sample', 'data', 'abc', 'dddd', 'my', 'jeff', 'sasdf'],
        ['sample', 'data', 'abc', 'dddd', 'my', 'jeff', 'sasdf'],
        ['sample', 'data', 'abc', 'dddd', 'my', 'jeff', 'sasdf'],
        ['sample', 'data', 'abc', 'dddd', 'my', 'jeff', 'sasdf'],
        ['sample', 'data', 'abc', 'dddd', 'my', 'jeff', 'sasdf']
      ],
      colHeaders: ['简单贷', '闪电贷', 'Team', 'Status'],
      rowHeaders: true,
      readOnly: false,
      width: 600,
      height: 400,
      minRows: 40,
      minCols: 10
    },
    // 数据和chart的映射
    optionMap: {
      xaxisName: '',  // 获取数据的key
      xaxisLabel: '', // 显示在图表的数据
      yaxisName: '',
      yaxisLabel: ''
    }
  }),
  mounted: function () {
    // this.initDataSources()
  },
  methods: {
    initDataSources: function () {
      const datas = localStorage.getItem('dataSources')
      this.dataSource = datas ? JSON.parse(datas) : []
    },

    // 选择 数据源事件
    handleSelectSource () {
      console.log(this.selectedDataSource)
    },

    // 选择数据源之后，执行

    queryData () {
      const uri = this.selectedDataSource || ''
      console.log('uri', uri)
      if (uri === '') {
        return
      }
      return $http.get(uri, {})
        .then( res => {
          console.log('res', res)
          const { data } = res
          let headers = []
          let datas = []
          // 是否是数组
          if (this.isArray(data)) {
            // header.
            headers = this.getHeaders(data)
            datas = this.convertList(data)
          }
          this.hotSettings.colHeaders = headers
          this.hotSettings.data = datas
          // this.$emit('renderData', this.hotSettings)
        })
    },

    renderChart () {
      // this.
      this.$emit('renderChart', { hotSettings: this.hotSettings, optionMap: this.optionMap })
    },
    // 获取到数组的key, key -> header
    getHeaders (list) {
      if (list && list.length === 0) {
        return
      }
      const result = []
      const item = list[0]
      Object.keys(item).forEach(key => {
        console.log('数组的Item的key ', key)
        result.push(key)
      })
      return result
    },

    // 将JSON结果转换为二位数组. [[1,2,3,4], [2,3,4,4]]
    convertList (list) {
      if (list && list.length ===0) {
        return
      }
      const result = []
      for (let i = 0; i < list.length; i++) {
        const rows = []
        const col = []
        const rowItem = list[i]
        Object.keys(rowItem).forEach(key => {
          rows.push(rowItem[key])
        })
        result.push(rows)
      }
      return result
    },

    isArray (item) {
      return Object.prototype.toString.call(item) === '[object Array]'
    }
  }
}
</script>

<style lang="less">
@import "./ChartSourceEdit.less";
</style>
