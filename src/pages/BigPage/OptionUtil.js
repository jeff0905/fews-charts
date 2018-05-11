import config from '@/components/charts/config' // chart的配置信息.
import Mock from './mockData' // mock数据
const OptionUtil = {}
const genGraphSeries = function (data, links) {
  const series = {}
  series.label = {
    color: '#fff'
  }
  series.name = 'Classs异常依赖'
  series.type = 'graph'
  series.layout = ['force', 'none'][0]
  series.coordinateSystem = null
  series.force = {
    initLayout: 'circular',
    repulsion: 440,
    gravity: 0.4,
    edgeLength: 280
  }
  series.itemStyle = {
    color: function (params) {
      return config.blue[params.dataIndex % config.blue.length]
    }
  }
  series.data = data
  series.links = links
  series.categories = [
    {
      name: 'class'
    },
    {
      name: 'app'
    }
  ]
  series.focusNodeAdjacency = true
  series.symbol = 'triangle'
  series.roam = true
  series.markPoint = {
    symbol: 'pin'
  }
  series.label = {
    normal: {
      show: true,
      position: 'top',
      textStyle: {
        fontSize: 14
      }
    }
  }
  series.lineStyle = {
    normal: {
      color: 'source',
      curveness: 0
    }
  }
  return series
}
// node节点的初始模板对象.
const initNodesTemplate = function () {
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

const convertResult2Links = function (data) {
  const result = data || []
  const links = []
  for (let i = 0; i < result.length; i++) {
    const item = result[i]
    links.push({source: item.appName, target: item.classNames})
  }
  return links
}
const convertResult2Nodes = function (data) {
  // const result = data || []
  const nodes = []
  for (var i = 0; i < data.length; i++) {
    // console.log(data)
    const nodeTpl = initNodesTemplate()
    nodeTpl.name = data[i].appName
    nodeTpl.category = 'app'
    nodeTpl.value = data[i].num
    nodeTpl.symbolSize = data[i].num * 5
    nodes.push(nodeTpl)

    const nodeTpl2 = initNodesTemplate()
    nodeTpl2.name = data[i].classNames
    nodeTpl2.category = 'class'
    nodeTpl2.value = data[i].num
    nodeTpl2.symbolSize = data[i].num * 5
    const index = nodes.findIndex(item => item.name === data[i].classNames)
    if (index < 0) {
      nodes.push(nodeTpl2)
    }
  }
  return nodes
}
const genTitle = function (title, subtitle, titleColor, subtitleColor) {
  const optionTitle = {}
  optionTitle.text = title
  optionTitle.subtext = subtitle
  optionTitle.textStyle = {}
  optionTitle.textStyle.color = titleColor
  optionTitle.subtextStyle = {}
  optionTitle.subtextStyle.color = subtitleColor
  return optionTitle
}
// line chart的option, 没有数据类型
const genNoDataLineOption = function (title, subtitle, x, y) {
  const noDataOption = {}
  noDataOption.color = config.color1
  noDataOption.title = genTitle(
    title,
    subtitle,
    config.color1[1],
    config.color1[2]
  )
  // noDataOption.step = true
  noDataOption.visualMap = {
    show: false,
    outOfRange: {
      color: 'red'
    },
    // 分段
    pieces: [
      {
        gt: 0,
        lte: 50,
        color: config.color1[1]
      },
      {
        gt: 50,
        lte: 100,
        color: config.color1[0]
      },
      {
        gt: 100,
        lte: 300,
        color: config.color1[2]
      }
    ]
  }
  // 按数量
  noDataOption.grid = [
    {
      top: '15%',
      left: '5%',
      show: false
    }
  ]
  noDataOption.tooltip = null
  //  //{
  //   trigger: 'axis'
  // }
  noDataOption.axisLabel = {
    color: '#fff' || 'rgba(58,253,119,1)' || config.color1[1] || '#fff'
  }
  noDataOption.xAxis = genxAxis(x, 'category', true)
  noDataOption.yAxis = genyAxis('value', true)
  noDataOption.series = [
    {
      name: name || '',
      type: 'line',
      smooth: true,
      smoothMonotone: 'y',
      symbol: [
        'circle',
        'rect',
        'roundRect',
        'triangle',
        'diamond',
        'pin',
        'arrow'
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
              color: config.color1[0]
            }
          },
          {
            yAxis: 150,
            lineStyle: {
              color: config.color1[1]
            }
          },
          {
            yAxis: 300,
            lineStyle: {
              color: config.color1[2]
            }
          }
        ]
      },
      itemStyle: {
        normal: {
          show: true,
          barBorderRadius: 50,
          borderWidth: 2,
          borderColor: function (params) {
            var num = ['#026bb5', '#00c07b', '#f48024'].length
            return ['#026bb5', '#00c07b', '#f48024'][params.dataIndex % num]
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
  ]
  return noDataOption
}

const genxAxis = function (data, type, isShow) {
  const item = {}
  item.show = isShow
  item.type = type || 'category'
  item.data = data || []
  return item
}
const genyAxis = function (type, isShow) {
  const item = {}
  item.show = isShow
  item.splitLine = {
    show: false
  }
  item.type = type || 'value'
  item.axisTick = {
    show: false
  }
  item.axisLabel = {
    show: true
  }
  item.axisLine = {
    show: true
  }
  return item
}

OptionUtil.genGraphOption = function (data) {
  console.log('data', data)
  data = Mock.graph
  const node = convertResult2Nodes(data)
  const link = convertResult2Links(data)
  const series = genGraphSeries(node, link)
  const option = {}
  option.color = config.blue
  option.title = genTitle('APP和Class依赖图', 'APP和Class的依赖,异常数量多的节点面积大', config.color1[1], config.color1[0])
  option.series = [series]
  return option
}

OptionUtil.genBarOption = function (title) {
  let option = {}
  option.title = {
    text: title || 'Top10 APP异常',
    textStyle: {
      color: config.color1[1]
    }
  }
  option.color = config.blue || config.color1
  option.yAxis = {
    type: ['value', 'category', 'time', 'log'][1],
    inverse: true,
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    splitLine: {
      show: false
    },
    data: Mock.lastTop10.x,
    axisLabel: {
      color: config.color[0],
      fontWeight: 200,
      fontSize: 12
    }
  }
  option.grid = {
    left: '3%',
    right: '3%',
    bottom: '3%',
    top: '3%',
    containLabel: true
  }
  option.xAxis = {
    show: false,
    type: 'value',
    position: ['top', 'bottom'][0],
    splitLine: {
      show: false
    },
    axisLabel: {
      color: '#fff',
      show: true
    }
  }
  const barSeries = {
    name: '数量',
    type: 'pictorialBar' || 'bar',
    symbol: 'circle',
    symbolRepeat: true,
    symbolSize: [8, 8],
    barGap: 0,
    z: 10,
    itemStyle: {
      show: true,
      color: function (params) {
        var num = config.blue.length
        let topColorIndex = 0
        topColorIndex = params.dataIndex % num
        return config.blue[topColorIndex]
      }
    },
    data: Mock.lastTop10.y
  }
  const bgBarSeries = Object.assign({}, barSeries)
  // 纹理
  // var piePane =
  // 'data:image/pngbase64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAKElEQVQ4jWP8//8/AwXgPxMluhkYGBhGDRg1YNQAKhnAwsDAQFF+BgBtSwUd6uvSywAAAABJRU5ErkJggg=='
  // var piePatternImg = new Image()
  // piePatternImg.src = piePane
  bgBarSeries.z = 5
  bgBarSeries.barGap = '-100%'
  bgBarSeries.itemStyle = {
    opacity: 0.5
  }
  bgBarSeries.data = Mock.lastTop10.allY
  const lineSeries = {
    name: '数量',
    type: 'line',
    z: 12,
    label: {
      show: true,
      position: 'right',
      fontSize: 4,
      // width: '40',
      color: '#fff',
      rich: {
        fontSize: 4
      }
    },
    itemStyle: {
      show: true,
      barBorderRadius: 50,
      borderWidth: 2,
      borderColor: config.color[1]
    },
    data: Mock.lastTop10.y
  }

  option.series = [barSeries, bgBarSeries, lineSeries]
  return option
}
// 生成line option
OptionUtil.genLineOption = function (data, title, subtitle) {
  const x = data.map(item => item.name)
  const y = data.map(item => item.value)
  const option = genNoDataLineOption(
    title || '最近30分钟异常数量',
    subtitle || '查看最近的趋势',
    x,
    y
  )
  return option
}

OptionUtil.removeOptionGrid = function (option) {
  const replaceOption = Object.assign({}, option)
  replaceOption.xAxis.show = false
  replaceOption.yAxis.show = false
  replaceOption.title.subtext = ''
  const series = replaceOption.series
  if (series.length > 0) {
    series.forEach((item, index) => {
      item.markLine = null
      item.visualMap = null
      item.areaStyle = null
    })
  }
  replaceOption.series = [series[0]]
  return replaceOption
}
export default OptionUtil
