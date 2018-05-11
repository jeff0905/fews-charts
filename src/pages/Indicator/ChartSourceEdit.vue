<template>
  <div class="chart-source-edit">
    <HotTable root="hot-example" :settings="hotSettings" :rowHeaders="true" allowInsertRow />
    <v-container fill-height fluid>
      <v-layout column>
        <v-flex>
          <v-layout row wrap justify-space-around>
            <v-flex xs3 xm3 md3 xl3 align-center>
              指标选择
            </v-flex>
            <v-flex xs8 xm8 md8 xl8>
              <v-select label="选择指标"
                :items="dataSource"
                item-text="name"
                item-value="uri"
                v-model="selectedDataSource"
                v-on:input="handleSelectSource"
                single-line
              />
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex>
          <v-layout row wrap justify-space-around>
            <v-flex xs3 xm3 md3 xl3 align-center>
              时间区间
            </v-flex>
            <v-flex xs8 xm8 md8 xl8>
              <!-- <v-menu ref="menu" lazy :close-on-content-click="false" v-model="menu" transition="scale-transition" offset-y full-width :nudge-right="40" max-width="290px" min-width="290px" :return-value.sync="date">
                <v-text-field slot="activator" label="开始日期" v-model="date" prepend-icon="event" readonly></v-text-field>
                <v-date-picker :first-day-of-week="0" locale="zh-cn" v-model="picker">
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="menu = false">取消</v-btn>
                  <v-btn flat color="primary" @click="$refs.menu.save(date)">确定</v-btn>
                </v-date-picker>
              </v-menu> -->
              <!-- <v-menu ref="menu" lazy :close-on-content-click="false" v-model="menu" transition="scale-transition" offset-y full-width :nudge-right="40" max-width="290px" min-width="290px" :return-value.sync="date">
                <v-text-field slot="activator" label="结束日期" v-model="date" prepend-icon="event" readonly></v-text-field>
                <v-date-picker :first-day-of-week="0" locale="zh-cn" v-model="picker">
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="menu = false">取消</v-btn>
                  <v-btn flat color="primary" @click="$refs.menu.save(date)">确定</v-btn>
                </v-date-picker>
              </v-menu> -->
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex>
          <v-layout row wrap justify-space-around>
            <v-flex xs3 xm3 md3 xl3 align-center>
              是否加入同比
            </v-flex>
            <v-flex xs8 xm8 md8 xl8>
              <v-checkbox :label="`加入同比`"></v-checkbox>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex>
          <v-layout row wrap justify-space-around>
            <v-flex xs3 xm3 md3 xl3 align-center>
              是否加入环比
            </v-flex>
            <v-flex xs8 xm8 md8 xl8>
              <v-checkbox :label="`加入环比`"></v-checkbox>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex>
          <v-layout row wrap justify-space-around>
            <v-btn>重置</v-btn>
            <v-btn>确定</v-btn>
          </v-layout>
        </v-flex>
      </v-layout>

    </v-container>
  </div>
</template>

<script>
import HotTable from '@handsontable/vue'
import $http from '@/$base/http'
export default {
  name: 'ChartSourceEdit',
  components: {
    HotTable
  },
  data: () => ({
    selectedDataSource: '', // 选择的数据源
    dataSource: [], // 数据源
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
    }
  }),
  mounted: function () {
    this.initDataSources()
  },
  methods: {
    initDataSources: function () {
      const datas = localStorage.getItem('dataSources')
      this.dataSource = datas ? JSON.parse(datas) : []
    },

    // 选择 数据源事件
    handleSelectSource () {
      console.log(this.selectedDataSource)
      const uri = this.selectedDataSource || ''
      if (uri !== '') {
        $http.get(uri, {})
          .then(res => {
            console.log('res', res)
          })
      }
    }
  }
}
</script>

<style lang="less">
@import "./ChartSourceEdit.less";
</style>
