<template>
  <v-container fill-height pa-0 class="sms-page2">
    <v-layout row wrap fill-height>
      <v-flex xs12 sm12 md12 xl12 lg12 row  style="padding-bottom:4px">
         <v-toolbar height="36">
          <v-toolbar-items>
            <v-btn flat>
              <v-icon color="success">grid_on</v-icon>
              图表混合模式
            </v-btn>
            <v-btn  flat>
              <v-icon color="purple">show_chart</v-icon>
              图表模式
            </v-btn>
          </v-toolbar-items>
          <v-spacer></v-spacer>
        </v-toolbar>
      </v-flex>
      <v-flex xs12 sm12 md12 xl12 lg12>
         <v-layout row wrap pa-2>
           <!-- <v-flex xs12 sm3 md3 xl1 lg2 >
             <v-subheader  class="justify-end">来源渠道</v-subheader>
           </v-flex> -->
           <v-flex xs12 sm3 md3 xl1 lg2 >
              <v-select
                :items="states"
                v-model="e1"
                label="Select"
                solo
                autocomplete
                prepend-icon="map"
                hide-details
              ></v-select>
           </v-flex>
           <v-flex xs12 sm3 md3 xl2 lg2>
              <v-text-field solo  label="请输入来源渠道" />
           </v-flex>
           <!-- <v-flex xs12 sm3 md3 xl1 lg2>
             <v-subheader  class="justify-end">发送渠道</v-subheader>
           </v-flex> -->
           <v-flex xs12 sm3 md3 xl2 lg2>
              <v-text-field solo   label="发送渠道" />
           </v-flex>
           <!-- <v-flex xs12 sm3 md3 xl1 lg2>
             <v-subheader  class="justify-end">开始时间</v-subheader>
           </v-flex> -->
           <v-flex xs12 sm3 md3 xl2 lg2>
              <v-text-field  solo  label="开始时间" />
           </v-flex>
           <!-- <v-flex xs12 sm3 md3 xl1 lg2>
             <v-subheader  class="justify-end">结束时间</v-subheader>
           </v-flex> -->
           <v-flex xs12 sm3 md3 xl2 lg2>
              <v-text-field  solo  label="结束时间" height="32"/>
           </v-flex>
           <v-flex xs12 sm3 md3 xl2 lg2 >
             <v-btn class="justify-start"  color="primary">
                查询
                <!-- <v-icon>date_range</v-icon> -->
              </v-btn>
              <v-btn >
                重置
                <!-- <v-icon>refresh</v-icon> -->
              </v-btn>
           </v-flex>
         </v-layout>
      </v-flex>
      <v-flex xs12 sm12 md12 xl12 lg12>
        <v-tabs dark color="blue" v-model="model">
          <v-tab> 统计渠道&次数</v-tab>
          <v-tab> 短信余量</v-tab>
        </v-tabs>
        <v-tabs-items v-model="model">
          <v-tab-item style="width:100%; min-height:800px" lazy>
            <ChartPanel :title="'统计渠道&次数'" :theme="'light'"  :option="smsAnaOption" height="300" style="width:100%;height:300px">
            </ChartPanel>
            <v-data-table :headers="headers" :items="items" hide-actions class="elevation-1">
              <template slot="headers"  slot-scope="props">
                <tr>
                  <th
                    v-for="header in props.headers"
                    :key="header.text"
                  >
                    <v-icon small>arrow_upward</v-icon>
                    {{ header.text }}
                  </th>
                </tr>
              </template>
              <template slot="items" slot-scope="props">
                <tr>
                  <td>{{ props.item.date }}</td>
                  <td>{{ props.item.sourceChannel }}</td>
                  <td class="">{{ props.item.sendChannel }}</td>
                  <td class="">{{ props.item.allNum }}</td>
                  <td class="">{{ props.item.sucNum }}</td>
                  <td class="">{{ props.item.failNum }}</td>
                  <td class="">{{ props.item.sucRate }}</td>
                </tr>
              </template>
            </v-data-table>
          </v-tab-item>
            <v-tab-item  style="width:100%; min-height:800px" lazy>
            <ChartPanel :title="'短信余量统计'" :theme="'light'" :option="loption" height="300" style="width:100%;height:300px">
              <!-- <LineChart slot="chart" /> -->
            </ChartPanel>
            <v-data-table :headers="headers" :items="items" hide-actions class="elevation-1">
              <template slot="headers"  slot-scope="props">
                <tr>
                  <th
                    v-for="header in props.headers"
                    :key="header.text"
                  >
                    <v-icon small>arrow_upward</v-icon>
                    {{ header.text }}
                  </th>
                </tr>
              </template>
              <template slot="items" slot-scope="props">
                <tr>
                  <td>{{ props.item.date }}</td>
                  <td>{{ props.item.sourceChannel }}</td>
                  <td class="">{{ props.item.sendChannel }}</td>
                  <td class="">{{ props.item.allNum }}</td>
                  <td class="">{{ props.item.sucNum }}</td>
                  <td class="">{{ props.item.failNum }}</td>
                  <td class="">{{ props.item.sucRate }}</td>
                </tr>
              </template>
            </v-data-table>
          </v-tab-item>
        </v-tabs-items>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable */
import Charts from "@/components/charts/Charts"
import ChartPanel from "@/components/panel/ChartPanel"
import config from '@/components/charts/config'
import { ChartService } from '@/services'
import ChartOption from '@/$base/utils/ChartOption'

// temp 暂时放在这里，后面移除
import OptionUtil from '@/pages/BigPage/OptionUtil'
import Mock from '@/pages/BigPage/mockData'
import list from './smsAna'
export default {
  name: "SmsPage2",
  components: {
    Charts,
    ChartPanel
  },
  data() {
    return {
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
      items: [ ],
      states: [
        'Alabama', 'Alaska', 'American Samoa', 'Arizona',
        'Arkansas', 'California', 'Colorado', 'Connecticut',
        'Delaware', 'District of Columbia', 'Federated States of Micronesia',
        'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho',
        'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
        'Louisiana', 'Maine', 'Marshall Islands', 'Maryland',
        'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
        'Missouri', 'Montana', 'Nebraska', 'Nevada',
        'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
        'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio',
        'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico',
        'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
        'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia',
        'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
      ]
    }
  },
  created: function () {
  },
  mounted: function () {

    console.log('SmsPage init')
    const res = Mock.sms
    this.items = res
    const option = new ChartOption(config)
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
      .setLegend(['提交次数', '成功次数', '失败次数', '成功率'])
      .addSeries(yData, 'line', '提交次数')
      .addSeries(yData4, 'line', '成功次数', 1)
      .addSeries(yData2, 'bar', '失败次数', 2)
      .addSeries(yData3, 'line', '成功率', 3)
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
