let option = {}
option.title = {
  text: title || 'Top10 APP异常',
  textStyle: {
    color: config.color[0]
  }
}
option.color = config.color
option.yAxis = {
  // show:false,
  type: ['value', 'category', 'time', 'log'][1],
  position: ['left', 'right'][0],
  data: [
    '我来贷H5',
    '我来贷H5',
    '我来贷H5',
    '我来贷H5',
    '我来贷H5',
    6,
    7,
    8,
    '我来贷H5',
    '我来贷'
  ],
  splitLine: {
    show: false
  },
  axisLabel: {
    color: '#fff'
  }
  // inverse: true,
}
option.xAxis = {
  // show:false,
  type: 'value',
  position: ['top', 'bottom'][0],
  splitLine: {
    show: false
  },
  axisLabel: {
    color: '#fff'
  }
}
const barSeries = {
  name: '',
  type: 'pictorialBar' || 'bar',
  symbol: 'circle',
  symbolRepeat: true,
  symbolSize: [
    8, 8
  ],
  barGap: 0,
  z: 10,
  itemStyle: {
    normal: {
      show: true,
      color: function (params) {
        var num = config.color.length
        console.log(params, params.dataIndex)
        let topColorIndex = 0
        if (params.dataIndex >= 7) {
          topColorIndex = params.dataIndex - 7
        } else {
          topColorIndex = params.dataIndex % num
        }
        return config.color[topColorIndex]
      }
    }
  },
  label: {
    normal: {
      position: 'right',
      show: true
    }
  },
  data: [
    0,
    1,
    1,
    1,
    2,
    4,
    9,
    15,
    16,
    17
  ]
}
const bgBarSeries = Object.assign({}, barSeries)
// 纹理
var piePane = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAKElEQVQ4jW' +
    'P8//8/AwXgPxMluhkYGBhGDRg1YNQAKhnAwsDAQFF+BgBtSwUd6uvSywAAAABJRU5ErkJggg=='
var piePatternImg = new Image()
piePatternImg.src = piePane
bgBarSeries.z = 5
bgBarSeries.barGap = '-100%'
bgBarSeries.itemStyle = {
  // color: {   image: piePatternImg,   repeat: 'repeat',   backgroundSize: '10%
  // 10%' },
  opacity: 0.15
}
bgBarSeries.data = [
  17,
  17,
  17,
  17,
  17,
  17,
  17,
  17,
  17,
  17
]
const lineSeries = {
  name: '',
  type: 'line',
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
  showSymbol: true,
  z: 12,
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
  data: [
    0,
    1,
    1,
    1,
    2,
    4,
    9,
    15,
    16,
    17
  ]
}
option.series = [barSeries, bgBarSeries, lineSeries]
return option
