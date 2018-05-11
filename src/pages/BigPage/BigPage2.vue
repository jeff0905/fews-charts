<template>

  <div class="big-page t2">
    <Header :title="'APP异常数'" xs12 class="header" dark style="backgrond-color:rgba(0,0,0,1)"></Header>
    <v-container fluid column fill-height style="position:absolute;top:0;left:0;padding-top:50px;padding-left:0;padding-right:0;padding-bottom:0">

      <v-layout  row wrap xs12>
        <v-flex xs12 sm12 md3 order-xs2 order-md1 order-lg1 order-xl1>
          <v-layout column>
            <v-flex  xs6 sm6 md6 elevation-1 style="min-height:240px;">
              <Charts :option="barOption"  style="min-height:440px" class="chart"/>
            </v-flex>
            <v-flex xs6 sm6 md6 elevation-1 style="min-height:240px;">
              <Charts :option="barOption"  style="min-height:440px" class="chart"/>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex xs12 sm12 md6  order-xs1  order-md2 order-lg2 order-xl2>
            <v-layout row wrap >
                  <v-flex xs12 sm12 md4 elevation-1>
                    <div class="num">
                      <Digit v-bind:number="daySum" />
                    </div>
                    <div class="title">当天异常数量</div>
                  </v-flex>
                  <v-flex xs12 sm12 md4 elevation-1>
                    <div class="num">
                      <Digit v-bind:number="weekSum" :color="'green'" type="'mide'" />
                    </div>
                    <div class="title">本周异常数量</div>
                  </v-flex>
                  <v-flex xs12 sm12 md4 elevation-1>
                    <div class="num">
                      <Digit v-bind:number="totalSum" :color="'red'" type="'mide'" />
                    </div>
                    <div class="title">本月总异常数量</div>
                  </v-flex>
                  <v-flex xs12 sm12 md12 elevation-1  style="min-height:440px;">
                    <Charts :title="'最近30分钟异常数量2'" :option="last30Option" ref="last30Chart"/>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-layout row>
                      <v-flex xs12 sm4 md4 elevation-1  style="min-height:240px;">
                        <Charts :theme="'light'" :title="'月度'" :option="lastMonthOption" ref="lastMonthChart"/>
                      </v-flex>
                      <v-flex xs12 sm4 md4 elevation-1 style="min-height:240px;">
                        <Charts :theme="'light'" :title="'周度'" :option="lastWeekOption" ref="lastWeekChart" />
                      </v-flex>
                      <v-flex xs12 sm4 md4 elevation-1 style="min-height:240px;">
                        <Charts :theme="'light'" :title="'日度'" :option="lastDayOption" ref="lastDayChart" />
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
        </v-flex>

        <v-flex xs12 sm12 md3  order-xs3 >
          <v-layout row wrap>
            <v-flex xs12 sm12 md12 >
              <Charts :option="graphOption" :render="'canvas'" style="min-height:240px;"/>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import Charts from '@/components/charts/Charts'
import Digit from '@/components/digit'
import Header from '@/components/Header'
import Mock from './mockData'
import {
  getNow,
  getTodayBegin,
  getWeekBegin,
  getMonthBegin,
  getLastBegin
} from '@/$base/assets/js/DateUtil'
import OptionUtil from './OptionUtil'
import { ChartService } from '@/services'

export default {
  name: 'BigPage2',
  components: {
    Charts,
    Digit,
    Header
  },
  data () {
    return {
      intervalList: [], // 定时器id集合. can delete the util.intervalId.
      last30Option: {}, // 最近30分钟异常数量
      lastMonthOption: {}, // only line 只有线
      lastWeekOption: {}, // only line 只有线
      lastDayOption: {}, // only line 只有线
      last30IntervalId: null, // 最近30分支的定时ID
      lastMonthsOption: {}, // 最近一个月发生的异常数量.
      graphOption: {}, // 依赖option graph.
      barOption: {},
      barOption2: {},
      totalSum: 0,
      weekSum: 0,
      daySum: 0
    }
  },
  created: function () {
    this.barOption = OptionUtil.genBarOption('最近30分钟Top 10 负责人异常数量')
    this.barOption2 = OptionUtil.genBarOption('最近30分钟Top 10 App异常数量')
    console.log('barOption', JSON.stringify(this.barOption))
    this.graphOption = OptionUtil.genGraphOption()
    console.log('graphOption', this.graphOption)
    const types = [
      {
        name: 'Last30',
        chartName: this.$refs.last30Chart,
        uri: '/last30Num',
        params: {}
      },
      {
        name: 'LastDay',
        chartName: this.$refs.lastDayChart,
        uri: '/last30Num'
      },
      {
        name: 'LastWeek',
        chartName: this.$refs.lastWeekChart,
        uri: '/last30Num'
      },
      {
        name: 'LastMonth',
        chartName: this.$refs.lastMonthChart,
        uri: '/last30Num'
      }
    ]
    this.getTrendByDate(types[0].name, types[0].uri, 5000, types[0].chartName) // 最近30分钟 5秒刷新一次
    this.getTrendByDate(
      types[1].name,
      types[1].uri,
      1 * 60 * 1000,
      types[1].chartName
    ) // 3分钟刷新月度
    this.getTrendByDate(
      types[2].name,
      types[2].uri,
      3 * 60 * 1000,
      types[2].chartName
    ) // 1分钟刷新日度
    this.getTrendByDate(
      types[3].name,
      types[3].uri,
      5 * 60 * 1000,
      types[3].chartName
    ) // 5分钟刷新周度

    // 总览数字的. this is Mock data.
    this.getDataAll(5000) // 3秒刷新一次数据
  },
  destroyed: function () {
    this.intervalList.forEach((index, item) => {
      console.log('定时器清除,id', item)
      window.clearInterval(item)
    })
  },
  methods: {
    // 启动定时任务, preboot = 是否先执行一遍再执行定时.
    startInterval (method, intervalTime, isPreboot) {
      if (isPreboot) {
        method()
      }
      const intervalId = window.setInterval(method, intervalTime)
      this.intervalList.push(intervalId)
    },
    // 获取时间段内的趋势数据, 30分钟，日度，周度，月度.
    getTrendByDate (type, uri, intervalTime, chartName) {
      if (type) {
        return this[`get${type}`](uri, intervalTime, chartName)
      }
    },
    // 获取最近30分钟的数据
    getLast30 (uri, intervalTime, chartName) {
      const params = {
        beginTime: getLastBegin(30 * 60 * 1000),
        endTime: getNow(),
        metric: 'error',
        scale: 'm' // 分钟为刻度
      }
      console.log(this.$refs, chartName, this.$refs.last30Chart)
      // chartName ? chartName.showLoading() : null
      this.startInterval(
        () =>
          this.getTrendHandler(
            uri,
            params,
            'last30Option',
            '最近30分钟趋势',
            `最近30分钟的异常数趋势,每${intervalTime / 1000}秒刷新一次`,
            true
          ),
        intervalTime,
        true
      )
    },
    // 最近一个月。
    getLastMonth (uri, intervalTime) {
      const params = {
        beginTime: getMonthBegin(),
        endTime: getNow(),
        metric: 'error',
        scale: 'd' // 天为刻度
      }

      this.startInterval(
        () =>
          this.getTrendHandler(
            uri,
            params,
            'lastMonthOption',
            '当月异常数',
            `当月发生的异常数量趋势图,每${intervalTime / 1000}秒刷新一次`
          ),
        intervalTime,
        true
      )
    },
    // 最近一周
    getLastWeek (uri, intervalTime) {
      const params = {
        beginTime: getWeekBegin(),
        endTime: getNow(),
        metric: 'error',
        scale: 'h' // 小时为刻度
      }

      this.startInterval(
        () =>
          this.getTrendHandler(
            uri,
            params,
            'lastWeekOption',
            '本周异常数',
            `本周发生的异常数量趋势图, 每${intervalTime / 1000}秒刷新一次`
          ),
        intervalTime,
        true
      )
    },
    // 最近一天发生的异常数量, 昨天吗?
    getLastDay (uri, intervalTime) {
      const params = {
        beginTime: getTodayBegin(),
        endTime: getNow(),
        metric: 'error',
        scale: 'm' // 分钟为刻度
      }
      this.startInterval(
        () =>
          this.getTrendHandler(
            uri,
            params,
            'lastDayOption',
            '当天异常数',
            `当天异常数,每${intervalTime / 1000}秒刷新一次`
          ),
        intervalTime,
        true
      )
    },
    /**
     * @param {type} , data()里的变量。
     * @param {needCoord}, 需要坐标轴.
     */
    getTrendHandler (uri, params, type, title, subTitle, needCoord) {
      const res = Mock.last30Data
      const option = OptionUtil.genLineOption(res, title, subTitle)
      if (!needCoord) {
        option.visualMap = null
        this[type] = OptionUtil.removeOptionGrid(option)
      } else {
        this[type] = option
      }
    },

    // 获取总览的数据.
    getDataAll (intervalTime) {
      const uri = `/total`
      const dayParams = {
        beginTime: getTodayBegin(),
        endTime: getNow(),
        metric: 'error'
      }

      const monthParams = {
        beginTime: getMonthBegin(),
        endTime: getNow(),
        metric: 'error'
      }

      const weekParams = {
        beginTime: getWeekBegin(),
        endTime: getNow(),
        metric: 'error'
      }
      const params = [dayParams, monthParams, weekParams]
      params.forEach(item => {
        this.startInterval(
          () => this.getDataAllHandler(uri, item),
          intervalTime,
          true
        )
      })
    },
    getDataAllHandler (uri, item) {
      this.daySum = Mock.getDaySum()
      this.weekSum = Mock.getWeekSum()
      this.totalSum = Mock.getMonthSum()
      // this.getServerData(uri, item).then(res => {
      //   // const { daySum, weekSum, totalSum } = res
      //   this.daySum = Mock.getDaySum()
      //   this.weekSum = Mock.getWeekSum()
      //   this.totalSum = Mock.getMonthSum()
      // })
    },
    // 获取服务器的数据
    getServerData (uri, params) {
      const url = uri || 'http://localhost:8080/api/last30Num'
      return ChartService.get(url, params).then(res => {
        return Promise.resolve(res)
      })
    }
  }
}
</script>
<style lang="less">
.chart {
  min-height:240px
}
.t2 {
  .header, .flex {
    background-color: rgba(0,0,0,1)
  }
}
@media (min-width: 0){
  .flex.order-xs1 .layout {
    padding-top: 0;
  }
}

</style>
