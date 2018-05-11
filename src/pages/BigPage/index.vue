<template>
  <div class="big-page">
    <Background />
    <Header :title="smsTitle" class="header"></Header>
    <v-container fluid column fill-height style="position:absolute;top:0;left:0">
      <v-layout row wrap xs12>
        <v-flex xs12 sm12 md3>
          <v-layout column>
            <v-flex xs6 sm6 md6 elevation-1 style="min-height:240px;">

              <Charts :title="'最近30分钟异常数量2'" :option="barOption" />
              <!-- <BarTopChart /> -->
            </v-flex>
            <v-flex xs6 sm6 md6 elevation-1 style="min-height:240px;">
              <Charts :title="'最近30分钟异常数量2'" :option="barOption2" />
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 sm12 md6>
          <v-layout column>
            <v-flex xs12 sm12 md12>
              <v-layout row wrap style="padding-top:50px">
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
                <v-flex xs12 sm12 md12 elevation-1 style="height: 60%;">
                  <Charts :title="'最近30分钟异常数量2'" :option="last30Option" ref="last30Chart" />
                </v-flex>

                <v-flex xs12 sm12 md12>
                  <v-layout row>
                    <v-flex xs12 sm4 md4 elevation-1 style="min-height:240px;">
                      <Charts :theme="'light'" :title="'月度'" :option="lastMonthOption" ref="lastMonthChart" />
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
          </v-layout>
        </v-flex>
        <v-flex xs12 sm12 md3>
          <!-- <GraphChart /> -->
          <Charts :option="graphOption" />
        </v-flex>
      </v-layout>
    </v-container>
    <v-dialog v-model='dialog' width='800px' dark>
      <v-card>
        <v-card-title class='grey lighten-4 py-4 title'>
          选择一个指标
        </v-card-title>
        <ChartSelectEdit dark/>
        <v-card-actions>
          <v-btn flat color='primary' @click='dialog = false'>取消</v-btn>
          <v-btn flat @click='dialog = false'>确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import moment from "moment";
import echarts from "echarts";
// import Swiper from "swiper";
import LineChart from "@/components/charts/LineChart";
import BarChart from "@/components/charts/BarChart";
import BarVChart from "@/components/charts/BarVChart";
import PieChart from "@/components/charts/PieChart";
// import LiquidChart from "@/components/charts/Liquid";
import TreemapChart from "@/components/charts/TreeMap";
import GraphChart from "@/components/charts/GraphChart";
import Number from "@/components/charts/Number";
import BarTopChart from "@/components/charts/BarTopChart";
import Charts from "@/components/charts/Charts";
import Digit from "@/components/digit";
import Background from "@/components/Background";
import Time from "@/components/Time";
import Title from "@/components/Title";
import config from "@/components/charts/config";

import ChartSelectEdit from "@/pages/Indicator/ChartSelectEdit";
import Header from "@/components/Header";
import $http from "@/$base/http";
import {
  getNow,
  getTodayBegin,
  getWeekBegin,
  getMonthBegin,
  getLastBegin
} from "@/$base/assets/js/DateUtil";
import { ChartService } from "@/services";

// mock
import Mock from "./mockData";

export default {
  name: "BigPage",
  components: {
    Background,
    LineChart,
    BarChart,
    BarVChart,
    PieChart,
    // LiquidChart,
    TreemapChart,
    GraphChart,
    Number,
    Digit,
    Charts,
    BarTopChart,
    Time,
    Title,
    ChartSelectEdit,
    Header
  },
  data: () => ({
    intervalList: [], // 定时器id集合. can delete the util.intervalId.
    util: {
      intervalId: null
    },
    last30Option: {}, // 最近30分钟异常数量
    lastMonthOption: {}, // only line 只有线
    lastWeekOption: {}, // only line 只有线
    lastDayOption: {}, // only line 只有线
    last30IntervalId: null, // 最近30分支的定时ID
    lastMonthsOption: {}, // 最近一个月发生的异常数量.
    graphOption: {}, // 依赖option graph.
    pieOption: {},
    treeMapOption: {},
    riverOption: {},
    barOption: {},
    barOption2: {},
    smsBarOption: {},
    dialog: false,
    dayNums: 0, // 当天异常数量,
    smsTitle: "2018App异常统计",
    totalSum: 0,
    weekSum: 0,
    daySum: 0
  }),
  created: function() {
    this.pieOption = this.genPieOption();
    this.treeMapOption = this.genTreeMapOption();
    this.riverOption = this.genRiver();


    // mock data.

    this.graphOption = this.genGraphOption(Mock.graph)

    this.barOption = this.genBarOption("最近30分钟Top 10 负责人异常数量");
    this.barOption2 = this.genBarOption("最近30分钟Top 10 App异常数量");

    this.smsBarOption = this.genSmsBarOption();
    console.log(`barOption,`, this.barOption);

    const types = [
      {
        name: "Last30",
        chartName: this.$refs.last30Chart,
        uri: "/last30Num",
        params: {}
      },
      {
        name: "LastDay",
        chartName: this.$refs.lastDayChart,
        uri: "/last30Num"
      },
      {
        name: "LastWeek",
        chartName: this.$refs.lastWeekChart,
        uri: "/last30Num"
      },
      {
        name: "LastMonth",
        chartName: this.$refs.lastMonthChart,
        uri: "/last30Num"
      }
    ];
    this.getTrendByDate(types[0].name, types[0].uri, 5000, types[0].chartName) // 最近30分钟 5秒刷新一次
    this.getTrendByDate(
      types[1].name,
      types[1].uri,
      1 * 60 * 1000,
      types[1].chartName
    )// 3分钟刷新月度
    this.getTrendByDate(
      types[2].name,
      types[2].uri,
      3 * 60 * 1000,
      types[2].chartName
    ); // 1分钟刷新日度
    this.getTrendByDate(
      types[3].name,
      types[3].uri,
      5 * 60 * 1000,
      types[3].chartName
    ); // 5分钟刷新周度

    // 总览数字的. this is Mock data.
    this.getDataAll(5000); // 3秒刷新一次数据
  },
  mounted: function() {
    // var mySwiper = new Swiper(".swiper-container", {
    //   autoplay: false,
    //   freeMode: true,
    //   effect: ["fade", "coverflow", "cube"][1],
    //   loop: false,
    //   direction: "horizontal",
    //   navigation: {
    //     nextEl: ".swiper-button-next",
    //     prevEl: ".swiper-button-prev"
    //   }
    // });
  },
  destroyed: function() {
    this.intervalList.forEach((index, item) => {
      console.log("定时器清除,id=", item);
      window.clearInterval(item);
    });
  },
  methods: {
    // 启动定时任务, preboot = 是否先执行一遍再执行定时.
    startInterval(method, intervalTime, isPreboot) {
      if (isPreboot) {
        method();
      }
      const intervalId = window.setInterval(method, intervalTime);
      this.intervalList.push(intervalId);
    },
    // 获取时间段内的趋势数据, 30分钟，日度，周度，月度.
    getTrendByDate(type, uri, intervalTime, chartName) {
      if (type) {
        return this[`get${type}`](uri, intervalTime, chartName);
      }
    },
    // 获取最近30分钟的数据
    getLast30(uri, intervalTime, chartName) {
      const params = {
        beginTime: getLastBegin(30 * 60 * 1000),
        endTime: getNow(),
        metric: "error",
        scale: "m" // 分钟为刻度
      };
      console.log(this.$refs, chartName, this.$refs.last30Chart);
      chartName ? chartName.showLoading() : null;
      this.startInterval(
        () =>
          this.getTrendHandler(
            uri,
            params,
            "last30Option",
            "最近30分钟趋势",
            `最近30分钟的异常数趋势,每${intervalTime / 1000}秒刷新一次`,
            true
          ),
        intervalTime,
        true
      );
    },
    // 最近一个月。
    getLastMonth(uri, intervalTime) {
      const params = {
        beginTime: getMonthBegin(),
        endTime: getNow(),
        metric: "error",
        scale: "d" // 天为刻度
      };

      this.startInterval(
        () =>
          this.getTrendHandler(
            uri,
            params,
            "lastMonthOption",
            "当月异常数",
            `当月发生的异常数量趋势图,每${intervalTime / 1000}秒刷新一次`
          ),
        intervalTime,
        true
      );
    },
    // 最近一周
    getLastWeek(uri, intervalTime) {
      const params = {
        beginTime: getWeekBegin(),
        endTime: getNow(),
        metric: "error",
        scale: "h" // 小时为刻度
      };

      this.startInterval(
        () =>
          this.getTrendHandler(
            uri,
            params,
            "lastWeekOption",
            "本周异常数",
            `本周发生的异常数量趋势图, 每${intervalTime / 1000}秒刷新一次`
          ),
        intervalTime,
        true
      );
    },
    // 最近一天发生的异常数量, 昨天吗?
    getLastDay(uri, intervalTime) {
      const params = {
        beginTime: getTodayBegin(),
        endTime: getNow(),
        metric: "error",
        scale: "m" // 分钟为刻度
      };
      this.startInterval(
        () =>
          this.getTrendHandler(
            uri,
            params,
            "lastDayOption",
            "当天异常数",
            `当天异常数,每${intervalTime / 1000}秒刷新一次`
          ),
        intervalTime,
        true
      );
    },
    /**
     * @param {type} , data()里的变量。
     * @param {needCoord}, 需要坐标轴.
     */
    getTrendHandler(uri, params, type, title, subTitle, needCoord) {
      const res = Mock.last30Data
      const option = this.genLineOption(res, title, subTitle);
        if (!needCoord) {
          option.visualMap = null;
          this[type] = this.removeOptionGrid(option);
        } else {
          this[type] = option;
        }
      // this.getServerData(uri, params).then(res => {
      //   const option = this.genLineOption(res, title, subTitle);
      //   if (!needCoord) {
      //     option.visualMap = null;
      //     this[type] = this.removeOptionGrid(option);
      //   } else {
      //     this[type] = option;
      //   }
      // });
    },
    // 获取总览的数据.
    getDataAll(intervalTime) {
      const uri = `/total`;
      const dayParams = {
        beginTime: getTodayBegin(),
        endTime: getNow(),
        metric: "error"
      };

      const monthParams = {
        beginTime: getMonthBegin(),
        endTime: getNow(),
        metric: "error"
      };

      const weekParams = {
        beginTime: getWeekBegin(),
        endTime: getNow(),
        metric: "error"
      };
      const params = [dayParams, monthParams, weekParams];
      params.forEach(item => {
        this.startInterval(
          () => this.getDataAllHandler(uri, item),
          intervalTime,
          true
        );
      });
    },
    getDataAllHandler(uri, item) {
      this.daySum = Mock.getDaySum()
      this.weekSum = Mock.getWeekSum()
      this.totalSum = Mock.getMonthSum()
      // this.getServerData(uri, item).then(res => {
      //   const { daySum, weekSum, totalSum } = res;
      //   this.daySum = Mock.getDaySum();
      //   this.weekSum = Mock.getWeekSum();
      //   this.totalSum = Mock.getMonthSum();
      // });
    },
    // 去掉x轴,y轴,标线,等等.只保留 lineSeries之类的线》
    removeOptionGrid(option) {
      const replaceOption = Object.assign({}, option);
      replaceOption.xAxis.show = false;
      replaceOption.yAxis.show = false;
      replaceOption.title.subtext = "";
      const series = replaceOption.series;
      if (series.length > 0) {
        series.forEach((item, index) => {
          item.markLine = null;
          item.visualMap = null;
          item.areaStyle = null;
        });
      }
      replaceOption.series = [series[0]];
      return replaceOption;
    },
    // 生成最近30分钟line option
    genLineOption(data, title, subtitle) {
      const x = data.map(item => item.name);
      const y = data.map(item => item.value);
      const option = this.genNoDataLineOption(
        title || "最近30分钟异常数量",
        subtitle || "查看最近的趋势",
        x,
        y
      );
      return option;
    },
    // 获取服务器的数据
    getServerData(uri, params) {
      const url = uri || "http://localhost:8080/api/last30Num";
      return ChartService.get(url, params).then(res => {
        return Promise.resolve(res);
      });
    },
    genTitle(title, subtitle, titleColor, subtitleColor) {
      const optionTitle = {};
      optionTitle.text = title;
      optionTitle.subtext = subtitle;
      optionTitle.textStyle = {};
      optionTitle.textStyle.color = titleColor;
      optionTitle.subtextStyle = {};
      optionTitle.subtextStyle.color = subtitleColor;
      return optionTitle;
    },
    genxAxis(data, type, isShow) {
      const item = {};
      item.show = isShow;
      item.type = type || "category";
      item.data = data || [];
      return item;
    },
    genyAxis(type, isShow) {
      const item = {};
      item.show = isShow;
      item.splitLine = {
        show: false
      };
      item.type = type || "value";
      item.axisTick = {
        show: false
      };
      item.axisLabel = {
        show: true
      };
      item.axisLine = {
        show: true
      };
      return item;
    },
    // line chart的option, 没有数据类型
    genNoDataLineOption(title, subtitle, x, y) {
      const noDataOption = {};
      noDataOption.color = config.color;
      noDataOption.title = this.genTitle(
        title,
        subtitle,
        config.color[1],
        config.color[2]
      );
      // noDataOption.step = true;
      noDataOption.visualMap = {
        show: false,
        outOfRange: {
          color: "red"
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
      };
      // 按数量
      noDataOption.grid = [
        {
          top: "15%",
          left: "5%",
          show: false
        }
      ];
      noDataOption.tooltip = null;
      //  //{
      //   trigger: "axis"
      // };
      noDataOption.axisLabel = {
        color: "rgba(58,253,119,1)" || config.color[1] || "#fff"
      };
      noDataOption.xAxis = this.genxAxis(x, "category", true);
      noDataOption.yAxis = this.genyAxis("value", true);
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
          showSymbol: false,
          z: 12,
          markLine: {
            silent: true,
            data: [
              {
                yAxis: 50,
                lineStyle: {
                  color: config.color[0]
                }
              },
              {
                yAxis: 150,
                lineStyle: {
                  color: config.color[1]
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
                var num = ["#026bb5", "#00c07b", "#f48024"].length;
                return ["#026bb5", "#00c07b", "#f48024"][
                  params.dataIndex % num
                ];
              }
            }
          },
          // areaStyle: null || {
          //   // normal: {
          //   //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //   //     {
          //   //       offset: 0,
          //   //       color: "rgb(0, 0, 0, .8)"
          //   //     },
          //   //     {
          //   //       offset: 1,
          //   //       color: "rgb(0, 0, 0, .1)"
          //   //     }
          //   //   ])
          //   // }
          // },
          data: y
        }
        // {
        //   type: "bar",
        //   data: y,
        //   barWidth: 1
        // }
      ];
      return noDataOption;
    },
    // 模拟数据.
    genDataset() {
      const data = [
        ["分类1", 100, 20, 200, 0.2],
        ["分类2", 250, 220, 500, 0.3],
        ["分类2", 250, 220, 500, 0.3],
        ["分类3", 800, 980, 195, 0.4],
        ["分类3", 801, 781, 185, 0.4],
        ["分类3", 802, 182, 115, 0.4],
        ["分类3", 803, 283, 125, 0.4],
        ["分类3", 804, 484, 165, 0.4]
      ];
      return data;
    },
    genColor(option) {
      return (option.color = ["#026bb5", "#00c07b", "#f48024"]);
    },
    genDataX() {
      const data = this.genDataset();
      const result = [];
      data.forEach(item => {
        result.push(item[0]);
      });
      return result;
    },
    genDataY(index) {
      const data = this.genDataset();
      const result = [];
      data.forEach(item => {
        result.push(item[index] ? item[index] : 0);
      });
      return result;
    },
    // 生成普通line series.
    genLineSeries(name, YDataIndex, mockData) {
      return {
        name: name || "",
        type: "line",
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
        itemStyle: {
          normal: {
            show: true,
            barBorderRadius: 50,
            borderWidth: 2,
            borderColor: function(params) {
              var num = ["#026bb5", "#00c07b", "#f48024"].length;
              return ["#026bb5", "#00c07b", "#f48024"][params.dataIndex % num];
            }
          }
        },
        data: mockData ? mockData : this.genDataY(YDataIndex)
      };
    },
    // 生成普通bar series
    genBarSeries(name, YDataIndex) {
      const img = require("./bug.png");
      return {
        name: name || "",
        type: "pictorialBar" || "bar",
        symbol: "circle",
        symbolRepeat: true,
        symbolSize: [10, 10],
        itemStyle: {
          normal: {
            show: true,
            color: function(params) {
              var num = config.color.length;
              console.log(params, params.dataIndex);
              let topColorIndex = 0;
              if (params.dataIndex >= 7) {
                topColorIndex = params.dataIndex - 7;
              }
              return config.color[params.dataIndex % num];
            }
          }
        },
        label: {
          normal: {
            show: true
          }
        },
        data: this.genDataY(YDataIndex)
      };
    },
    genSmsBarOption(title) {
      // 渠道分类， 提交次数, 成功次数，余量, 成功率
      let option = {};
      option.title = {
        text: title || "短信统计",
        textStyle: {
          color: "#fff"
        }
      };
      this.genColor(option);
      option.yAxis = {
        // show: false,
        type: ["value", "category", "time", "log"][0],
        // position: ['left', 'right'][0],
        data: this.genDataX(),
        splitLine: {
          show: false
        },
        axisLabel: {
          color: "#fff"
        }
      };
      option.xAxis = {
        // show: false,
        type: ["value", "category", "time", "log"][1],
        // position: ['top', 'bottom'][1],
        splitLine: {
          show: false
        },
        axisLabel: {
          color: "#fff"
        },
        data: this.genDataX()
      };
      option.legend = {
        data: ["提交次数", "成功次数"]
      };
      // const lineSeries1 = this.genLineSeries('提交次数', 1);
      // const lineSeries2 = this.genLineSeries('成功次数', 2);
      const barSeries = this.genBarSeries("提交次数", 1);
      const barSeries1 = this.genBarSeries("成功次数", 2);
      console.log(barSeries);
      // const lineSeries3 = this.genLineSeries(3);
      option.series = [barSeries, barSeries1];
      return option;
    },

    genBarOption(title) {
      let option = {};
      option.title = {
        text: title || "Top10 APP异常",
        textStyle: {
          color: config.color[1]
        }
      };
      option.color = config.blue || config.color;
      option.yAxis = {
        // show:false,
        type: ["value", "category", "time", "log"][1],
        inverse: true,
        inside: true,
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        },
        data: Mock.lastTop10.x,
        axisLabel: {
          color: function(value, index) {
            var num = config.blue.length;
            let topColorIndex = 0;
            topColorIndex = index % num;
            return config.blue[topColorIndex];
          },
          // rotate: -20,
          fontWeight: 200,
          fontSize: 12
        }
      };
      option.grid = {
        left: "3%",
        right: "3%",
        bottom: "3%",
        top: "3%",
        containLabel: true
      };
      option.xAxis = {
        show: false,
        type: "value",
        position: ["top", "bottom"][0],
        splitLine: {
          show: false
        },
        axisLabel: {
          color: "#fff"
        }
      };
      const barSeries = {
        name: "",
        type: "pictorialBar" || "bar",
        symbol: "circle",
        symbolRepeat: true,
        symbolSize: [8, 8],
        barGap: 0,
        z: 10,
        itemStyle: {
          normal: {
            show: true,
            color: function(params) {
              var num = config.blue.length;
              let topColorIndex = 0;
              // if (params.dataIndex >= 3) {
              //   topColorIndex = params.dataIndex - 3;
              // } else {
              topColorIndex = params.dataIndex % num;
              // }
              return config.blue[topColorIndex];
            }
          }
        },
        label: {
          normal: {
            position: "right",
            show: true
          }
        },
        data: Mock.lastTop10.y
      };
      const bgBarSeries = Object.assign({}, barSeries);
      // 纹理
      var piePane =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAKElEQVQ4jWP8//8/AwXgPxMluhkYGBhGDRg1YNQAKhnAwsDAQFF+BgBtSwUd6uvSywAAAABJRU5ErkJggg==";
      var piePatternImg = new Image();
      piePatternImg.src = piePane;
      bgBarSeries.z = 5;
      bgBarSeries.barGap = "-100%";
      bgBarSeries.itemStyle = {
        opacity: 1,
        normal: {
          color: "rgba(0,0,0,1)"
        }
      };
      bgBarSeries.data = Mock.lastTop10.allY;
      const lineSeries = {
        name: "",
        type: "line",
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
        showSymbol: false,
        z: 12,
        itemStyle: {
          normal: {
            show: true,
            barBorderRadius: 50,
            borderWidth: 1,
            borderColor: config.blue[8]
          }
        },
        data: Mock.lastTop10.y
      };

      option.series = [barSeries, bgBarSeries, lineSeries];
      return option;
    },
    genRiver() {
      return {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
            lineStyle: {
              color: "rgba(0,0,0,0.2)",
              width: 1,
              type: "solid"
            }
          }
        },

        legend: {
          data: ["DQ", "TY", "SS", "QG", "SY", "DD"]
        },

        singleAxis: {
          top: 50,
          bottom: 50,
          axisTick: {},
          axisLabel: {},
          type: "time",
          axisPointer: {
            animation: true,
            label: {
              show: true
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              opacity: 0.2
            }
          }
        },

        series: [
          {
            type: "themeRiver",
            itemStyle: {
              emphasis: {
                shadowBlur: 20,
                shadowColor: "rgba(0, 0, 0, 0.8)"
              }
            },
            data: [
              ["2015/11/08", 10, "DQ"],
              ["2015/11/09", 15, "DQ"],
              ["2015/11/10", 35, "DQ"],
              // ['2015/11/11',38,'DQ'],['2015/11/12',22,'DQ'],['2015/11/13',16,'DQ'],
              ["2015/11/14", 7, "DQ"],
              ["2015/11/15", 2, "DQ"],
              ["2015/11/16", 17, "DQ"],
              ["2015/11/17", 33, "DQ"],
              ["2015/11/18", 40, "DQ"],
              ["2015/11/19", 32, "DQ"],
              ["2015/11/20", 26, "DQ"],
              ["2015/11/21", 35, "DQ"],
              ["2015/11/22", 40, "DQ"],
              ["2015/11/23", 32, "DQ"],
              ["2015/11/24", 26, "DQ"],
              ["2015/11/25", 22, "DQ"],
              // ['2015/11/26',16,'DQ'],['2015/11/27',22,'DQ'],['2015/11/28',10,'DQ'],
              ["2015/11/08", 35, "TY"],
              ["2015/11/09", 36, "TY"],
              ["2015/11/10", 37, "TY"],
              ["2015/11/11", 22, "TY"],
              ["2015/11/12", 24, "TY"],
              ["2015/11/13", 26, "TY"],
              ["2015/11/14", 34, "TY"],
              ["2015/11/15", 21, "TY"],
              ["2015/11/16", 18, "TY"],
              ["2015/11/17", 45, "TY"],
              ["2015/11/18", 32, "TY"],
              ["2015/11/19", 35, "TY"],
              ["2015/11/20", 30, "TY"],
              ["2015/11/21", 28, "TY"],
              ["2015/11/22", 27, "TY"],
              ["2015/11/23", 26, "TY"],
              ["2015/11/24", 15, "TY"],
              ["2015/11/25", 30, "TY"],
              ["2015/11/26", 35, "TY"],
              ["2015/11/27", 42, "TY"],
              ["2015/11/28", 42, "TY"],
              ["2015/11/08", 21, "SS"],
              ["2015/11/09", 25, "SS"],
              ["2015/11/10", 27, "SS"],
              ["2015/11/11", 23, "SS"],
              ["2015/11/12", 24, "SS"],
              ["2015/11/13", 21, "SS"],
              ["2015/11/14", 35, "SS"],
              ["2015/11/15", 39, "SS"],
              ["2015/11/16", 40, "SS"],
              ["2015/11/17", 36, "SS"],
              ["2015/11/18", 33, "SS"],
              ["2015/11/19", 43, "SS"],
              ["2015/11/20", 40, "SS"],
              ["2015/11/21", 34, "SS"],
              ["2015/11/22", 28, "SS"],
              // ['2015/11/23',26,'SS'],['2015/11/24',37,'SS'],['2015/11/25',41,'SS'],
              // ['2015/11/26',46,'SS'],['2015/11/27',47,'SS'],['2015/11/28',41,'SS'],
              // ['2015/11/08',10,'QG'],['2015/11/09',15,'QG'],['2015/11/10',35,'QG'],
              // ['2015/11/11',38,'QG'],['2015/11/12',22,'QG'],['2015/11/13',16,'QG'],
              ["2015/11/14", 7, "QG"],
              ["2015/11/15", 2, "QG"],
              ["2015/11/16", 17, "QG"],
              ["2015/11/17", 33, "QG"],
              ["2015/11/18", 40, "QG"],
              ["2015/11/19", 32, "QG"],
              ["2015/11/20", 26, "QG"],
              ["2015/11/21", 35, "QG"],
              ["2015/11/22", 40, "QG"],
              ["2015/11/23", 32, "QG"],
              ["2015/11/24", 26, "QG"],
              ["2015/11/25", 22, "QG"],
              ["2015/11/26", 16, "QG"],
              ["2015/11/27", 22, "QG"],
              ["2015/11/28", 10, "QG"],
              ["2015/11/08", 10, "SY"],
              ["2015/11/09", 15, "SY"],
              ["2015/11/10", 35, "SY"],
              ["2015/11/11", 38, "SY"],
              ["2015/11/12", 22, "SY"],
              ["2015/11/13", 16, "SY"],
              ["2015/11/14", 7, "SY"],
              ["2015/11/15", 2, "SY"],
              ["2015/11/16", 17, "SY"],
              ["2015/11/17", 33, "SY"],
              ["2015/11/18", 40, "SY"],
              ["2015/11/19", 32, "SY"],
              ["2015/11/20", 26, "SY"],
              ["2015/11/21", 35, "SY"],
              ["2015/11/22", 4, "SY"],
              ["2015/11/23", 32, "SY"],
              ["2015/11/24", 26, "SY"],
              ["2015/11/25", 22, "SY"],
              ["2015/11/26", 16, "SY"],
              ["2015/11/27", 22, "SY"],
              ["2015/11/28", 10, "SY"],
              ["2015/11/08", 10, "DD"],
              ["2015/11/09", 15, "DD"],
              ["2015/11/10", 35, "DD"],
              ["2015/11/11", 38, "DD"],
              ["2015/11/12", 22, "DD"],
              ["2015/11/13", 16, "DD"],
              ["2015/11/14", 7, "DD"],
              ["2015/11/15", 2, "DD"],
              ["2015/11/16", 17, "DD"],
              ["2015/11/17", 33, "DD"],
              ["2015/11/18", 4, "DD"],
              ["2015/11/19", 32, "DD"],
              ["2015/11/20", 26, "DD"],
              ["2015/11/21", 35, "DD"],
              ["2015/11/22", 40, "DD"],
              ["2015/11/23", 32, "DD"],
              ["2015/11/24", 26, "DD"],
              ["2015/11/25", 22, "DD"],
              ["2015/11/26", 16, "DD"],
              ["2015/11/27", 22, "DD"],
              ["2015/11/28", 10, "DD"]
            ]
          }
        ]
      };
    },
    genTreeMapOption() {
      return {
        color: ["#026bb5", "#00c07b", "#f48024"],
        series: [
          {
            type: "treemap",
            label: {
              fontSize: 20
            },
            data: [
              {
                name: "我来贷", // First tree
                value: 10
              },
              {
                name: "小戴",
                value: 20
              },
              {
                name: "小戴2",
                value: 5
              },
              {
                name: "小戴3",
                value: 4
              },
              {
                name: "小戴3",
                value: 80
              },
              {
                name: "小戴3",
                value: 76
              }
            ]
          }
        ]
      };
    },
    genPieOption() {
      return {
        title: {
          text: "异常占比",
          subtext: "App",
          x: "center"
        },
        legend: {
          x: "center",
          y: "bottom",
          data: [
            "rose1",
            "rose2",
            "rose3",
            "rose4",
            "rose5",
            "rose6",
            "rose7",
            "rose8"
          ]
        },
        color: ["#026bb5", "#00c07b", "#f48024"],
        calculable: true,
        series: [
          {
            name: "面积模式",
            type: "pie",
            radius: [30, 110],
            roseType: "area",
            data: [
              {
                value: 10,
                name: "我来贷"
              },
              {
                value: 5,
                name: "H5 Staff"
              },
              {
                value: 15,
                name: "ANdroid"
              },
              {
                value: 25,
                name: "IOS"
              }
            ]
          }
        ]
      };
    },

    genGraphOption (data) {
      console.log('data', data)
      const node = this.convertResult2Nodes(data)
      const link = this.convertResult2Links(data)
      const series = this.genGraphSeries(node, link)
      const option = {}
      option.title = this.genTitle('APP和Class依赖图', 'APP和Class的依赖,异常数量多的节点面积大')
      option.series = [series]
      return option
    },
    genGraphSeries(data, links) {
      const series = {};
      series.name = "Classs异常依赖";
      series.type = "graph";
      series.layout = ["force", "none"][0];
      series.coordinateSystem = null;
      series.force = {
        initLayout: "circular",
        repulsion: 440,
        gravity: 0.4,
        edgeLength: 280
      };
      series.itemStyle = {
        color: function(params) {
          return config.blue[params.dataIndex % config.color.length];
        }
      };
      series.data = data;
      series.links = links;
      series.categories = [
        {
          name: "class"
        },
        {
          name: "app"
        }
      ];
      series.focusNodeAdjacency = true;
      series.symbol = [
        "circle",
        "rect",
        "roundRect",
        "triangle",
        "diamond",
        "pin",
        "arrow"
      ][3];
      series.roam = true;
      series.markPoint = {
        symbol: "pin"
      };
      series.label = {
        normal: {
          show: true,
          position: "top",
          textStyle: {
            fontSize: 14
          }
        }
      };
      series.lineStyle = {
        normal: {
          color: "source",
          curveness: 0
          //type: "solid"
        }
      };
      return series;
    },
    convertResult2Links (data) {
      const result = data || []
      const links = []
      for (let i = 0; i < result.length; i++ ) {
        const item = result[i]
        links.push({source: item.appName, target: item.classNames})
      }
      return links
    },
    convertResult2Nodes (data) {
      const result = data || []
      const nodes = []
      for (var i = 0; i < data.length; i++) {
        console.log(data)
        const nodeTpl = this.initNodesTemplate()
        nodeTpl.name = data[i].appName
        nodeTpl.category = 'app'
        nodeTpl.value = data[i].num
        nodeTpl.symbolSize = data[i].num * 5
        nodes.push(nodeTpl)

        const nodeTpl2 = this.initNodesTemplate()
        nodeTpl2.name = data[i].classNames
        nodeTpl2.category = 'class'
        nodeTpl2.value = data[i].num
        nodeTpl2.symbolSize = data[i].num * 5
        const index = nodes.findIndex(item => item.name === data[i].classNames)
        if (index < 0)
          nodes.push(nodeTpl2)
      }
      return nodes
    },

    // node节点的初始模板对象.
    initNodesTemplate () {
      const nodes = {}
      nodes.name = ""
      nodes.symbol = [
                "circle",
                "rect",
                "roundRect",
                "triangle",
                "diamond",
                "pin",
                "arrow"
              ][0]
      nodes.symbolSize = 1 // 24 个异常
      nodes.category = ''
      nodes.draggable = true
      nodes.value = 0
      return nodes
    },
  }
};
</script>

<style lang="less">
@import "./BigPage.less";
// @import "./../../../node_modules/swiper/dist/css/swiper.min.css";
// .swiper-container {
//   width: 100%;
//   height: 100%;
//   .swiper-wrapper {
//     width: 100%;
//     height: 100%;
//     .swiper-slide {
//       width: 100%;
//       height: 100%;
//     }
//   }
// }
</style>
