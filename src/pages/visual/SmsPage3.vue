<template>
  <v-container fill-height pa-2 class="sms-page2">
    <v-layout row wrap fill-height v-if="!isBig">
      <v-flex xs12 sm12 md12 xl12 lg12 row style="padding-bottom:4px">
        <v-toolbar height="36">
          <v-toolbar-items>
            <v-btn flat> <v-icon color="primary">add</v-icon>添加图表 </v-btn>
            <v-btn flat> <v-icon color="amber">refresh</v-icon>刷新图表数据 </v-btn>
            <v-btn flat> <v-icon color="success">save</v-icon>保存 </v-btn>
            <v-btn flat> <v-icon color="red">print</v-icon> 打印</v-btn>
            <v-btn flat> <v-icon color="deep-orange">import_export</v-icon>导出到excel </v-btn>
            <v-btn flat> <v-icon color="purple">email</v-icon>其他</v-btn>
            <v-btn flat> <v-icon color="teal">share</v-icon>分享</v-btn>
            <v-btn flat>
              <v-switch
                class="d-inline-flex"
                :label="switch2 ? '允许钻取' : '关闭钻取'"
                v-model="switch2"
                color="info"
                style="width:120px"
                hide-details
              >
              </v-switch>
            </v-btn>
            <v-btn flat>
              <v-switch
                class="d-inline-flex"
                :label="switch1 ? '启动关联' : '关闭关联'"
                v-model="switch1"
                color="success"
                style="width:120px"
                hide-details
              >
              </v-switch>
            </v-btn>
          </v-toolbar-items>
          <v-spacer></v-spacer>
        </v-toolbar>
      </v-flex>
      <v-flex xs12 sm12 md12 xl12 lg12 row d-inline-flex style="padding-bottom:4px">
        <v-layout row wrap>
          <v-flex xs12 sm6 md2 lg2 xl2 d-inline-flex justify-center align-center >
            <label>来源渠道</label>
          </v-flex>
          <v-flex xs12 sm6 md2 lg2 xl2 >
            <v-text-field solo  label="请输入来源渠道" />
          </v-flex>
          <v-flex  xs12 sm6 md2 lg2 xl2 d-inline-flex justify-center align-center>
            <label>来源渠道</label>
          </v-flex>
          <v-flex xs12 sm6 md2 lg2 xl2 >
            <v-text-field solo  label="请输入来源渠道" />
          </v-flex>
          <v-flex  xs12 sm6 md2 lg2 xl2 d-inline-flex justify-center align-center>
            <label>来源渠道</label>
          </v-flex>
          <v-flex xs12 sm6 md2 lg2 xl2 >
            <v-text-field solo  label="请输入来源渠道" />
          </v-flex>
      <v-divider/>
          <v-flex xs12 sm6 md4 lg4 xl4 >
            <v-btn color="primary">查询</v-btn>
            <v-btn >重置</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 sm12 md6 xl4 lg4>
         <ChartPanel
          v-on:drill="handleDrill"
          :title="'统计渠道&次数'" :option="smsAnaOption" height="300" style="width:100%;height:300px">
         </ChartPanel>
      </v-flex>
      <v-flex xs12 sm12 md6 xl4 lg4>
         <ChartPanel :title="'统计渠道&次数'"  :theme="'light'"  :option="smsAnaOption" height="300" style="width:100%;height:300px">
         </ChartPanel>
      </v-flex>
      <v-flex xs12 sm12 md6 xl4 lg4>
         <ChartPanel :title="'统计渠道&次数'"   :theme="'light'"  :option="smsAnaOption" height="300" style="width:100%;height:300px">
         </ChartPanel>
      </v-flex>
      <v-flex xs12 sm12 md6 xl8 lg8>
         <ChartPanel :title="'统计渠道&次数'"   :theme="'light'"  :option="smsAnaOption" height="300" style="width:100%;height:300px">
         </ChartPanel>
      </v-flex>
      <v-flex xs12 sm12 md6 xl4 lg4>
         <ChartPanel :title="'统计渠道&次数'"   :theme="'light'"  :option="smsAnaOption" height="300" style="width:100%;height:300px">
         </ChartPanel>
      </v-flex>
      <v-flex xs12 sm12 md6 xl4 lg4>
         <ChartPanel :title="'统计渠道&次数'"  :theme="'light'"  :option="smsAnaOption" height="300" style="width:100%;height:300px">
         </ChartPanel>
      </v-flex>
      <v-flex xs12 sm12 md6 xl4 lg4>
         <ChartPanel :title="'统计渠道&次数'" :theme="'light'"  :option="smsAnaOption" height="300" style="width:100%;height:300px">
         </ChartPanel>
      </v-flex>
      <v-flex xs12 sm12 md6 xl4 lg4>
         <ChartPanel :title="'统计渠道&次数'" :theme="'light'"  :option="smsAnaOption" height="300" style="width:100%;height:300px">
         </ChartPanel>
      </v-flex>
    </v-layout>

    <v-layout row wrap fill-height v-if="isBig">
       <v-flex xs12 sm12 md12 xl12 lg12 fill-height>
         <ChartPanel
          v-on:onBig="isBig = !isBig"
          :title="'统计渠道&次数'" :group="'g1'" :theme="'light'"  :option="smsAnaOption" style="width:100%;height:100%">
         </ChartPanel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable */
import echarts from 'echarts'
import Charts from "@/components/charts/Charts"
import ChartPanel from "@/components/panel/ChartPanel"
import config from '@/components/charts/config'
import { ChartService } from '@/services'
import ChartOption from '@/$base/utils/ChartOption'
import Stat from '@/$base/assets/js/Stat'
// temp 暂时放在这里，后面移除
import OptionUtil from '@/pages/BigPage/OptionUtil'
import Mock from '@/pages/BigPage/mockData'
import list from './smsAna'
export default {
  name: "SmsPage3",
  components: {
    Charts,
    ChartPanel
  },
  data() {
    return {
      switch2: true,
      switch1: true,
      isBig: false,
      model: null,
      smsTitle: "2018短信统计",
      smsAnaOption: null,  // 渠道&次数option
      loption: null, // 余量
      headers: [
          { text: '日期',value:'date'},
          { text: '来源渠道',align: 'left',sortable: false,value: 'sourceChannel'},
          { text: '发送渠道',value: 'sendChannel'},
          { text: '提交次数', value: 'allNum' },
          { text: '成功次数', value: 'sucNum' },
          { text: '失败次数', value: 'failNum' },
          { text: '成功率', value: 'sucRate' },
        ],
        items: [ ]
    }
  },
  created: function () {
  },
  mounted: function () {

    console.log('SmsPage init')
    const res = Mock.sms
    this.items = res
    const option = new ChartOption()
    const xData = res.map((item) => item.date)
    const yData = res.map((item) => item.allNum)
    const yData2 = res.map(item => item.failNum)
    const yData4 = res.map(item => item.sucNum)
    const yData3 = res.map(item => item.sucRate)
    option
      // .setBackground()
      .setTitle('渠道', '按渠道统计次数', false, {color:config.titleColor})
      .setGrid({containLabel: true, top: '20%', left: '4%', right: '4%', bottom: '4%'})
      .setXAxis(xData)
      .setYAxis('value', '提交次数')
      .setYAxis('value', '成功次数')
      .setYAxis('value', '失败次数')
      .setYAxis('value', '成功率')
      .setYAxis('value', 'MA提交次数')
      .setLegend(['提交次数', '成功次数', '失败次数', '成功率'])
      .addSeries(yData, 'line', '提交次数')
      .addSeries(yData4, 'line', '成功次数', 1)
      // .addSeries(yData2, 'bar', '失败次数', 2)
      .addSeries(yData3, 'line', '成功率', 3)
      .addSeries(new Stat().getMA(8, yData), 'line', 'MA提交次数')
      console.log('ma', yData, new Stat().getMA(5, yData))
    this.smsAnaOption = option
    console.log('option,', option.toString())
    const loption = new ChartOption(config)
    loption
      .setBackground()
      .setTitle('余量', '按渠道显示短信余量', false,  {color: config.titleColor})
      .setGrid({containLabel: true, top: '20%', left: '4%', right: '4%', bottom: '4%'})
      .setXAxis(xData)
      .setYAxis('value', '提交次数')
      .setYAxis('value', '失败次数')
      .addSeries(yData, 'line')
      .addSeries(yData2, 'line', 1)
    this.loption = loption
    // this.smsAnaOption = OptionUtil.genLineOption(res, '渠道', '按渠道统计次数')

  },
  methods: {
    handleDrill () {
      this.$router.push({path: '/main/visual/smsPage2'})
    },
    getSmsAna () {
      return ChartService.getSmsAna()
        .then( res => {
          const { list } = res
          this.items = list
          return Promise.resolve(list)
        })
    },
    getOption (list) {
      console.log(list)
      const x = list.map(item => item.date)
      const y = list.map(item => item.allNum)
      const y2 = list.map(item => item.failNum)
      const option = new ChartOption()
      const series = option.generateSeries('line', y)
      const series2 = option.generateSeries('line', y2)
      option
        // .setTitle('渠道', '按渠道统计次数', false, false)
        .setXAxis(x,'category')
        .setYAxis()
        .setGrid()
        .initSeries()
        .addSeries(series)
        .addSeries(series2)

      this.smsAnaOption = option || this.genNoDataLineOption('渠道', '按渠道统计次数', x, y)
    },
    // line chart的option, 没有数据类型
    genNoDataLineOption(title, subtitle, x, y) {
      const noDataOption = {}
      noDataOption.color = config.color
      noDataOption.title = this.genTitle(
        title,
        subtitle,
        config.color[1],
        config.color[2]
      )
      // noDataOption.step = true
      noDataOption.visualMap = {
        show: false,
        outOfRange: {
          color: "rgba(52,83,145,.8)"
        },
        // 分段
        pieces: [
          {
            gt: 0,
            lte: 50,
            color: config.color[1]
          },
          {
            gt: 50,
            lte: 100,
            color: config.color[0]
          },
          {
            gt: 100,
            lte: 300,
            color: config.color[2]
          }
        ]
      }
      // 按数量
      noDataOption.grid = [
        {
          top: "20%",
          show: false
        }
      ]
      noDataOption.tooltip = null
      //  //{
      //   trigger: "axis"
      // }
      noDataOption.axisLabel = {
        // color: "#fff"
      }
      noDataOption.xAxis = this.genxAxis(x, "category", true)
      noDataOption.yAxis = this.genyAxis("value", true)
      noDataOption.series = [
        {
          name: name || "",
          type: "line",
          smooth: true,
          smoothMonotone: "y",
          symbol: [
            "circle",
            "rect",
            "roundRect",
            "triangle",
            "diamond",
            "pin",
            "arrow"
          ][5],
          symbolSize: 12,
          showSymbol: true,
          z: 12,
          markLine: {
            silent: true,
            data: [
              {
                yAxis: 50,
                lineStyle: {
                  color: config.color[1]
                }
              },
              {
                yAxis: 100,
                lineStyle: {
                  color: config.color[0]
                }
              },
              {
                yAxis: 300,
                lineStyle: {
                  color: config.color[2]
                }
              }
            ]
          },
          itemStyle: {
            normal: {
              show: true,
              barBorderRadius: 50,
              borderWidth: 2,
              borderColor: function(params) {
                var num = ["#026bb5", "#00c07b", "#f48024"].length
                return ["#026bb5", "#00c07b", "#f48024"][
                  params.dataIndex % num
                ]
              }
            }
          },
          areaStyle: {
            // normal: {
            //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //     {
            //       offset: 0,
            //       color: "rgb(0, 0, 0, .8)"
            //     },
            //     {
            //       offset: 1,
            //       color: "rgb(0, 0, 0, .1)"
            //     }
            //   ])
            // }
          },
          data: y
        },
        {
          type: "bar",
          data: y,
          barWidth: 1
        }
      ]
      return noDataOption
    },
  }
}
</script>

<style lang="less">
@import "./SmsPage2.less";
</style>
