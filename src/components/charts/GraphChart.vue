<template>
  <div class="graph-chart">
    <div class="graph" ref="graph" />
  </div>
</template>

<script>
/* eslint-disable */
import echarts from "echarts";
import config from "./config";
import { ChartService } from '@/services'
let invokeNum = 0; // 调用次数
const app = [
  "简单贷",
  "我来贷",
  "闪电贷H5",
  "我来贷IOS",
  "我来带Android",
  "2我来带Android",
  "3我来带Android",
  "我4来带Android"
];
const classNames = [
  "SMSClass",
  "PayClass",
  "ApplicationClass",
  "lenderClass",
  "repayClass",
  "logClass"
];
export default {
  name: "GraphChart",
  props: ["props", "title"],
  data: () => ({
    chartInstance: null,
    intervalId: null
  }),
  mounted: function() {
    // 初始化 graph chart.
    this.chartInstance = echarts.init(this.$refs.graph, "light");

    // 初始化 ajax数据
    const uri = 'http://localhost:8080/api/graph'
    ChartService.get(uri, {})
      .then(res => {
        const option = this.initOptionByAjax(res)
        console.log('ajax option', option)
        this.chartInstance.setOption(option)
      })
    // const option = this.initOption();
    // // timeline, 5秒刷新一次.
    // this.timelineOption = {
    //   baseOption: option,
    //   options: []
    // };
    // this.chartInstance.setOption(this.timelineOption);
    // this.invokeNum = 0;
    // this.intervalId = window.setInterval(() => {
    //   const responseOption = this.invokeByTimer(this.timelineOption);
    //   this.chartInstance.setOption(responseOption);
    // }, 3000);
  },

  destroyed: function() {
    window.clearInterval(this.intervalId);
  },

  methods: {
    initOptionByAjax (data) {
      const nodes = this.initNodesByAjax(data)
      const links = this.initLinksByAjax(data)

      const option = this.mergeOption()
      const series = this.mergeSeries(nodes, links)
      const title = this.mergeTitle('APP和Class依赖图', 'APP和Class的依赖,异常数量多的节点面积大')
      option.title = title
      option.series = [series]
      return option
    },
    // graph nodes.
    initNodesByAjax (data) {
      const result = data || []
      const nodes = []
      for (var i = 0; i < data.length; i++) {
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
    // graph links
    initLinksByAjax (data) {
      const result = data || []
      const links = []
      for (let i = 0; i < result.length; i++ ) {
        const item = result[i]
        links.push({source: item.appName, target: item.classNames})
      }
      return links
    },
    // 定时调用.
    invokeByTimer(timelineOption) {
      console.log("开始定时调用", timelineOption);
      timelineOption.baseOption.series[0].data = this.demoData();
      timelineOption.options.push({ series: [] });
      this.invokeNum = this.invokeNum + 1;
      return Object.assign({}, timelineOption);
    },
    demoLink() {
      const links = [];
      for (let i = 0; i < app.length; i++) {
        const source = app[i];
        for (let j = 0; j < classNames.length; j++) {
          const target = classNames[j];
          links.push({
            source,
            target
          });
        }
      }
      return links;
    },
    // 创建graph 图的节点.
    demoData() {
      const data = [];
      for (let i = 0; i < app.length; i++) {
        data.push({
          name: i < 8 ? app[i] : app[i] + i,
          symbol: [
            "circle",
            "rect",
            "roundRect",
            "triangle",
            "diamond",
            "pin",
            "arrow"
          ][5],
          symbolSize: 20, // 24 个异常
          category: "App",
          draggable: "true",
          value: 9,
          x: 150 + i * 2,
          y: 60 * i + 20
        });
      }
      for (let j = 0; j < classNames.length; j++) {
        j > 3
          ? data.push({
              name: classNames[j],
              symbol: [
                "circle",
                "rect",
                "roundRect",
                "triangle",
                "diamond",
                "pin",
                "arrow"
              ][0],
              symbolSize: j * 5, // 24 个异常
              category: "Class",
              draggable: "true",
              value: j,
              x: 650,
              y: 50 * j
            })
          : null;
      }
      return data;
    },

    mergeSeries (data, links) {
      const series = {}
      series.name= "Classs异常依赖",
      series.type= "graph",
      series.layout= ["force", "none"][0],
      series.coordinateSystem= null,
            // layout: 'circular',
            // symbolSize: 12,
            // edgeSymbol: ['none', 'arrow'],
            // edgeSymbolSize: 5,
            // layout: 'force',
      series.force = {
              initLayout: "circular",
              repulsion: 440,
              gravity: 0.4,
              edgeLength: 280
            },
      series.itemStyle = {
              color: function(params) {
                return config.color[params.dataIndex % config.color.length];
              }
            }
      series.data= data
      series.links= links
      series.categories= [{ name: "class" }, { name: "app" }]
      series.focusNodeAdjacency = true
      series.symbol= [
              "circle",
              "rect",
              "roundRect",
              "triangle",
              "diamond",
              "pin",
              "arrow"
            ][3]
      series.roam= true
      series.markPoint= {
              symbol: "pin"
            }
      series.label= {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  fontSize: 14
                }
              }
            }
      series.lineStyle= {
              normal: {
                color: "source",
                curveness: 0
                //type: "solid"
              }
            }
      return series;
    },

    mergeOption () {
      const option = {}

      return option
    },
    mergeTitle (text, subText) {
      const title = {}
      title.text = text
      title.textStyle = {
        color: config.color[1]
      }
      title.subtext = subText
      title.subtextStyle = {
        color: config.color[2]
      }
      return title
    },
    initOption() {
      const option = {};
      return {
        // backgroundColor: 'rgba(0,0,0,.5)',
        color: config.color,
        title: {
          text: "异常依赖图",
          subtext: "APP和class的依赖,异常数量多的节点面积大",
          textStyle: {
            color: ["#026bb5", "#00c07b", "#f48024"][0],
            fontSize: 18
          },
          subtextStyle: {
            color: ["#026bb5", "#00c07b", "#f48024"][2]
          },
          top: "top",
          left: "left"
        },
        animationDuration: 3000,
        animationEasingUpdate: "quinticInOut",
        // nodeScaleRatio: 1.6,
        series: [
          {
            name: "Classs异常依赖",
            type: "graph",
            layout: ["force", "none"][0],
            coordinateSystem: null,
            force: {
              initLayout: "circular",
              repulsion: 440,
              gravity: 0.4,
              edgeLength: 280
            },
            itemStyle: {
              color: function(params) {
                return config.color[params.dataIndex % config.color.length];
              }
            },
            data: this.demoData(),
            links: this.demoLink(),
            categories: [{ name: "class" }, { name: "app" }],
            focusNodeAdjacency: true,
            symbol: [
              "circle",
              "rect",
              "roundRect",
              "triangle",
              "diamond",
              "pin",
              "arrow"
            ][3],
            roam: true,
            markPoint: {
              symbol: "pin"
            },
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  fontSize: 14
                }
              }
            },
            lineStyle: {
              normal: {
                color: "source",
                curveness: 0
                //type: "solid"
              }
            }
          }
        ]
      };
    }
  }
};
</script>

<style lang="less">
.graph-chart {
  width: 100%;
  height: 100%;
  .graph {
    width: 100%;
    height: 100%;
  }
}
</style>
