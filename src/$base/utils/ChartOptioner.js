/**
 * 生成特定的样式的管理器.
 */
import ChartOption from './ChartOption'
import OptionTemplate from './OptionTemplate'
import config from '@/components/charts/config'
export default class ChartOptioner {
  constructor () {
    this.config = []  // 配置的数据源, 等等。
  }

  /**
   * Bar-Chart: Bar Chart
   * 生成Top10的 柱状图。
   * @param {*} title 标题
   * @param {*} category 类别
   * @param {*} value 值
   * @param {*} bgValue 背景值。
   * @param {*} yname y轴名称.
   */
  convertBarOption (title, category, value, bgValue, yname) {
    const option = new ChartOption()

    option
      .appendTitle({text: title || '最近30分钟Top 10 App异常数量', textStyle: {fontSize: 14}})
      .appendXAxis({type: 'value',  position: 'top',  splitLine: {show: false}})
      .appendGrid({containLabel: true,show: false, left: '5%', top: 20})
      .appendYAxis({type: 'category', data: category, inverse: true, z: 10, zlevel: 10, splitLine: {show: false}, axisLabel: {show: true, inside: false, color: '#fff'}})
      .appendSeries({
          name: yname || '数量',
          type: 'pictorialBar',
          data: value,
          symbol: 'circle',
          symbolSize: [8, 8],
          symbolRepeat: true,
          barGap: 0,
          xAxisIndex: 0,
          z: 5,
          zlevel: 5,
          yAxisIndex: 0
      })
      .appendSeries({
          name: '',
          type: 'pictorialBar',
          data: bgValue,
          symbol: 'circle',
          symbolSize: [8, 8],
          symbolRepeat: true,
          barGap: '-100%',
          xAxisIndex: 0,
          z: 2,
          zlevel: 2,
          yAxisIndex: 0,
          itemStyle: {
            show: true,
            opacity: 0.5,
            color: 'rgba(255,255,255,.5)'
          }
      })
      .seriesColor(3, config.rainbow, 0)
    return option
  }

  /**
   * Graph-node, 根据数组, key, 生成node节点
   * preNodes 是已经有的nodes节点列表.
   */
  convertResult2Nodes (data, nameKey, valueKey, category, preNodes) {
    const nodes = []
    for (var i = 0; i < data.length; i++) {
      const nodeTpl = this.initNodesTemplate()
      nodeTpl.name = data[i][nameKey]
      nodeTpl.category = category
      nodeTpl.value = data[i][valueKey]
      nodeTpl.symbolSize = data[i][valueKey] * 5 // 限定一定大小.
      // 是否有重复的数据.
      let hasItem = preNodes.find(item => item.name === nodeTpl.name)
      let thisHasItem = nodes.find(item => item.name === nodeTpl.name)
      console.log('aa', hasItem, nodeTpl.name)
      if (hasItem) {
        const preValue = hasItem.value
        const nowValue = nodeTpl.value + preValue
        nodeTpl.value = nowValue
        nodeTpl.symbolSize = nowValue * 5
        hasItem = nodeTpl
      }
      if (thisHasItem) {
        const preThisValue = thisHasItem.value
        const nowThisValue = nodeTpl.value + preThisValue
        nodeTpl.value = nowThisValue
        nodeTpl.symbolSize = nowThisValue * 5
        thisHasItem = nodeTpl
      }
      if (!thisHasItem && !hasItem) {
        nodes.push(nodeTpl)
      }

    }
    return nodes
  }

  /**
   * Graph-node-template
   */
  initNodesTemplate () {
    const nodes = {}
    nodes.name = ''
    nodes.symbol = [
      'circle',
      'rect',
      'roundRect',
      'triangle',
      'diamond',
      'pin',
      'arrow'
    ][0]
    nodes.symbolSize = 1 // 24 个异常
    nodes.category = ''
    nodes.draggable = true
    nodes.value = 0
    return nodes
  }
  /**
   * Graph-links,
   * @param {*} data
   * @param {*} sourceNameKey , 和 nodes的nameKey 一样.
   * @param {*} targetNameKey
   */
  convertResult2Links (data, sourceNameKey, targetNameKey) {
    const result = data || []
    const links = []
    for (let i = 0; i < result.length; i++) {
      const item = result[i]
      links.push({source: item[sourceNameKey], target: item[targetNameKey]})
    }
    return links
  }
  /**
   * Graph-Chart
   * 生成Graph图. 传入标题, 节点, 连线, 分类数组即可。
   * @param {*} title 标题
   * @param {*} nodes 节点
   * @param {*} links 节点之间的联系
   * @param {*} name 显示名称
   * @param {*} category
   *
   * {sourceNameKey: 'className', sourceName: 'class', sourceValueKey: 'classNums', targetNameKey: 'appName', targetValueKey: 'appNums'}
   */
  convertGraphOption (title, nodes, links, name, category) {
    const option = new ChartOption()
    option
      .appendTitle({text: title})
      .appendSeries({
        type: 'graph',
        label:{ color: '#fff' },
        name: name || 'Classs异常依赖',
        layout: 'force',
        force: {
          initLayout: 'circular',
          repulsion: 440,
          gravity: 0.4,
          edgeLength: 280
        },
        itemStyle: {
          color: function (params) {
            return config.blue[params.dataIndex % config.blue.length]
          }
        },
        data: nodes,
        links: links,
        categories: category || [{ name: 'class'},{name: 'app'}],
        focusNodeAdjacency: true,
        symbol: 'triangle',
        roam: true,
        markPoint: {
          symbol: 'pin'
        },
        label: {
          normal: {
            show: true,
            position: 'top',
            textStyle: {
              fontSize: 14
            }
          }
        },
        lineStyle: {
          normal: {
            color: 'source',
            curveness: 0
          }
        }
      })

    return option
  }

  /**
   * 去掉grid, x, y 轴.
   * @param {*} option
   */
  removeOptionGrid () {
    const replaceOption = Object.assign({}, option)
    this.xAxis.show = false
    this.yAxis.show = false
    this.title.subtext = ''
    const series = this.series
    if (series.length > 0) {
      series.forEach((item, index) => {
        item.markLine = null
        item.visualMap = null
        item.areaStyle = null
      })
    }
    return this
  }
}
