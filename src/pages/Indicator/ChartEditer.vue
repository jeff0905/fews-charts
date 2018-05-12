<template>
  <div class="chart-edit">
            <!-- 导航 -->
    <v-flex d-inline-flex xs12 sm12 md12 xl12 lg12 elevation-2 style="width:100%;height:40px;">
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
    <v-flex  my-2 xs12 sm12 md12 xl12 lg12 elevation-2 style="min-height:40px">
          <v-layout row wrap align-content-start>
            <v-flex d-inline-flex xs12 sm12 md1 xl1 lg1 my-2 class="justify-content-end align-center" style="height:34px">
              <label >指标名称</label>
            </v-flex>
            <v-flex d-inline-flex  xs12 sm12 md2 xl2 lg2 my-2  justify-center align-end  style="height:34px">
              <v-text-field clearable color="grey" single-line hide-details label="请输入指标名称" />
            </v-flex>
            <v-flex d-inline-flex  xs12 sm12 md2 xl2 lg2  my-2 text-xs-center justify-center align-center  style="height:34px">
              <v-btn  color="primary">保存</v-btn>
              <v-btn >重置</v-btn>
            </v-flex>
      </v-layout>

    </v-flex>
    <v-container fill-height fluid pa-0>
      <v-layout column style="height:800px">
        <v-flex dark pa-1 style="position:relative;height:300px">
          <!-- <BackGrid style="position:absolute;top:0;left:0;right:0;bottom:0"/> -->
          <!-- <Panel class="dragPanel" ref="dragPanel" :selected="true" style="width:550px;height:300px"> -->
            <Charts slot="chart" ref="dragDemos" v-bind:option="selectedOption" />
          <!-- </Panel> -->
        </v-flex>
        <v-flex style="height:500px">
          <v-tabs dark fill-height style="height:100%">
            <v-tabs-slider></v-tabs-slider>
            <v-tab>选择指标</v-tab>
            <v-tab>数据源</v-tab>
            <v-tab>参数调整</v-tab>
            <v-tab>查看配置生成的代码</v-tab>
            <v-tabs-items fill-height>
              <v-tab-item fill-height>
                <ChartSelectEdit v-on:onSelect="handleSelect" ref="dragItems"/>
              </v-tab-item>
              <v-tab-item fill-height>
                <ChartSourceEdit v-on:renderChart="renderChart"/>
              </v-tab-item>
              <v-tab-item fill-height>
                <ChartParamEdit :option="selectedOption" v-on:setOption="changeOption"/>
              </v-tab-item>
              <v-tab-item fill-height>
                <textarea  ref="code" >
                </textarea>
              </v-tab-item>
            </v-tabs-items>
          </v-tabs>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
/* eslint-disable */
import OptionTemplate from '@/$base/utils/OptionTemplate' // 指标option 模板.
import Option from './Option'
import LineChart from "@/components/charts/LineChart";
import BarChart from "@/components/charts/BarChart";
import PieChart from "@/components/charts/PieChart";
import Charts from "@/components/charts/Charts";
import ChartRender from "@/components/charts/chart";

import ChartSourceEdit from "@/pages/Indicator/ChartSourceEdit";
import ChartParamEdit from "@/pages/Indicator/ChartParamEdit";
import ChartSelectEdit from "@/pages/Indicator/ChartSelectEdit";
import { Photoshop, Chrome } from "vue-color";

import BackGrid from '@/components/Background/grid'
import Panel from '@/components/panel/Panel'
import $ from 'jquery'
require('jquery-ui/ui/widgets/draggable')

export default {
  name: "ChartEditer",
  components: {
    LineChart,
    BarChart,
    PieChart,
    Charts,
    Photoshop,
    Chrome,
    ChartSourceEdit,
    ChartParamEdit,
    ChartSelectEdit,
    BackGrid,
    Panel
  },
  data: () => ({
    editTab: "editTab",
    dialog: {
      colorDialog: false
    },
    // 导航面包屑.
    items: [
       {
          text: '指标库',
          disabled: false
        },
        {
          text: '新增修改指标(适合编辑一个指标)',
          disabled: false
        }
    ],
    selectedChartType: null, // 选择的指标类型
    selectedOption: {},
    setOption: {},
    seter: {
      title: {
        text: "",
        subtext: "",
        textStyle: {
          color: "rgba(0,0,0,1)"
        },
        subtextStyle: {}
      } //标题
    }
  }),

  created: function() {
    // this.setOption = new ChartRender().getDemoOptions("line");
    // console.log("this.setOption", this.setOption);
  },

  mounted: function () {
    const self = this
    // panel 拖动
    const items = this.$refs.dragPanel.$vnode.elm

    console.log('items', items)
    // panel下的resize 标签 拖动
    const resizerContainer = items.children[0].children
    for (let i = 0; i < resizerContainer.length; i++) {
      console.log(resizerContainer[i])
      const resizer = resizerContainer[i]
      const dragResizer = $(resizer).draggable({
        start: function(event, ui) {
          console.log('resizer start', ui, this, ui.position)
          dragResizer.startRect = {
            x: ui.position.left,
            y: ui.position.top,
            sizer: items,
            target: this,
            sizerRect: items.getBoundingClientRect()
          }
        },
        drag: function(event, ui) {
          dragResizer.diffRect = {
            width: ui.position.left - dragResizer.startRect.x,
            height: ui.position.top - dragResizer.startRect.y
          }

          // 根据拖动的方向改变宽高
          console.log('dragReiszer', this, dragResizer)
          self.calRect(dragResizer, ui)
          console.log('resizer drag', ui, dragResizer.startRect, dragResizer.diffRect)
        },
        stop: function(event, ui) {
          dragResizer.stopRect = {
            width: ui.position.left - dragResizer.startRect.x,
            height: ui.position.top - dragResizer.startRect.y
          }
          console.log('resizer stop', dragResizer.stopRect)
          event.target.setAttribute('style', '')
        }
      })
    }
    $(function () {
      $(items).draggable({
        start: function(event, ui) {
          console.log('items start', event, ui)
        },
        drag: function() {
          console.log('drag')
        },
        stop: function() {
          console.log('stop')
        }
      })
    })

  },
  methods: {
    // 计算拖动的时候, 根据方向改变container的宽高.
    calRect (dragResizer, ui) {
      console.log(`calRect 方向:${dragResizer.startRect.target.getAttribute('class')},`)
      // 鼠标拖动的元素
      const dtarget = dragResizer.startRect.target
      // 需要改变位置和大小的元素 (鼠标拖动的元素不需要变更)
      const dContainer = dragResizer.startRect.sizer
      const direct = dtarget.getAttribute('class').split(' ')[0] // 方向, 左上, 上中, 右上, 右中， 右下, 下中.
      // 右下角的标志, 只改变宽高,
      if (direct === 'resize-topLeft') {
        const currentCoor = ui.position
        const originCoor = ui.originPosition
        const originWidth = dragResizer.startRect.sizerRect.width
        const originHeight = dragResizer.startRect.sizerRect.height
        dContainer.setAttribute('style', `left:${currentCoor.x}px;top:${currentCoor.y};width:${originWidth - dragResizer.diffRect.width}px;height:${originHeight - dragResizer.diffRect.height}px`)
      }
      // 左上角的标志， 改变宽高，同时改变left, top
      if (direct === 'resize-bottomRight') {
        const originWidth = dragResizer.startRect.sizerRect.width
        const originHeight = dragResizer.startRect.sizerRect.height
        const origin = dragResizer.startRect.sizer
        origin.setAttribute('style', `width:${originWidth + dragResizer.diffRect.width}px; height:${originHeight + dragResizer.diffRect.height}px`)
      }
    },
    // 选择指标类型
    handleSelect (item) {
      console.log(item.type, OptionTemplate[item.type])
      this.selectedOption = null
      this.selectedOption = OptionTemplate[item.type]()
    },

    /**
     * 将服务器返回的数据，进行封装，转换为类目轴， 值轴的数据.
     * 返回的有 legend(值轴label集合), datas: [[]](多个值轴的集合), category:[](类目轴的结合.)
     */
    renderChart (res) {
      console.log('renderChart', res)
      const { hotSettings, optionMap} = res
      const { colHeaders, data } = hotSettings
      // key colHeaders. xaxisName(单个或数组, 类别轴), yaxisName(数组， 值轴)
      console.log('colHeaders', colHeaders)
      const categorys = this.categoryAxisMap(colHeaders, data, optionMap)
      const values = this.valueAxisMap(colHeaders, data, optionMap)
      console.log('类目周', categorys, '值轴', values)
      const legendMap = this.legendMap(optionMap)
      // 修改之前的option的series data, category data , lengend
      const newOption = Object.assign({}, this.selectedOption)
      this.selectedOption = null
      newOption.legend = legendMap
      newOption.series = [
        {
          type: 'line',
          data : values[0],
          name : legendMap.data[0]
        }
      ]
      newOption.xAxis[0].data = categorys[0]
      this.selectedOption = newOption
      console.log('配置option', this.selectedOption)
    },

    legendMap (map) {
      // legend 是值轴的数据.
      const legend = { data: []}
      const yaxisLabel = map['yaxisLabel']
      legend.data.push(yaxisLabel)
      return legend
    },

    valueAxisMap (colHeaders, data, map) {
      const yaxisName = map['yaxisName']
      const valueAxis = []
      const index = this.getAxisNameIndex(yaxisName, colHeaders)
      for (var i = 0; i < 1; i++) {
        const valueItem = [] // 一个valueItem 代表一个值轴(y轴)
        data.forEach(item => {
          valueItem.push(item[index])
        })
        valueAxis.push(valueItem)
      }
      return valueAxis
    },

    categoryAxisMap (colHeaders, data, map) {
      const categoryName = map['xaxisName']
      const categorys = []
      const index = this.getAxisNameIndex(categoryName, colHeaders)
      for (var i = 0; i < 1; i++) {
        const category = [] // 一个category 代表一个类目轴(x轴)
        data.forEach(item => {
          category.push(item[index])
        })
        categorys.push(category)
      }
      return categorys
    },
    // 查找axisName 处于colHeaders第几列，这样data里的第几列的数据就是 axis的数据.
    getAxisNameIndex (axisName, colHeaders) {
      for (let i = 0; i < colHeaders.length; i++) {
        if (axisName === colHeaders[i]) {
          return i
        }
      }
    },
    // 生成默认option
    generateDefaultOption (type) {

    },
    setTitle() {
      this.setOption.title = this.seter.title;
      this.setOption = Object.assign({}, this.setOption);
      console.log("setTitle", this.setOption);

    },
    // 由ChartParamEdit.vue 改变的option...
    changeOption() {
      console.log("ChartEdit付组件获取到option改变的事件", this.setOption);
      this.setOption = Object.assign({}, this.setOption);
    }
  }
};
</script>

<style lang="less">
@import "./ChartEdit.less";
@import './../../../node_modules/codemirror/lib/codemirror.css';
.chart-edit {
  width: 100%;
  height: 100%;
}
</style>
