import config from '@/components/charts/config'
export default {
  getDefaultOption: function (type) {
    return this[`genDefault${type}Option`]()
  },

  // 默认line option
  genDefaultlineOption: function (title) {
    var getDayTime = function () {
      var temp = []
      for (var i = 0; i < 24; i++) {
        // var hour = i < 10 ? '0' + i + ':00' : i + ':00'
        var hour = i + ':00'
        temp.push(hour)
      }
      return temp
    }

    var getRandomData = function () {
      var temp = []
      for (var i = 0; i < 24; i++) {
        var item = Math.random() * 100 - Math.random() * 50
        temp.push(Math.abs(item).toFixed(2))
      }

      return temp
    }

    const option = {
      color: config.color,
      title: {
        text: '异常数量',
        textStyle: {
          color: '#fff'
        },
        top: -5
      },
      visualMap: {
        show: false,
        min: 0,
        max: 50,
        colorLightness: [0.2, 100],
        inRange: {
          color: ['#026bb5', '#00c07b']
        },
        outOfRange: {
          color: '#f48024'
        }
      },
      // grid.top需要根据容器高度调整
      grid: [
        {top: '20%', bottom: '0%', left: '4%', right: '4%', width: '92%', height: '60%', show: false}
      ],
      tooltip: {
        trigger: 'axis',
        formatter: function (params) {
          if (params instanceof Array) {
            var idxMap = [{
              text: 'cpu使用率',
              data: []
            }, {
              text: '内存使用率',
              data: []
            }, {
              text: 'abc',
              data: []
            }]
            var time = params[0].axisValue
            for (var i = 0; i < params.length; i++) {
              var seriesIdx = params[i].seriesId.split(params[i].seriesId[0])
              idxMap[seriesIdx[2]].data.push({
                marker: params[i].marker,
                seriesName: params[i].seriesName,
                data: params[i].data
              })
            }

            return '<section style="width:100px;height:50px">' +
              '<time>' + time + '</time>' +
              '<br />' +
              idxMap.map(function (item) {
                return '<span>' + item.text + '</span>' + item.data.map(function (dItem) {
                  return '<p style="margin: 0;padding: 0;">' + dItem.marker + dItem.seriesName + ': ' + dItem.data + '%' + '</p>'
                }).join('')
              }).join('') +
              '</section>'
          }
        }
      },
      axisLabel: {
        color: '#fff'
      },
      xAxis: [{
        type: 'category',
        data: getDayTime()
      }
      ],
      yAxis: [{
        splitLine: {show: false},
        name: 'cpu(%)',
        type: 'value',
        axisTick: {
          show: false
        },
        axisLine: {
          show: true
        },
        axisLabel: {
          show: true
        }
      }
      ],
      series: [
        {
          name: '192.168.1.1',
          type: 'line',
          itemStyle: { // 折线拐点标志的样式
            normal: {
              color: 'rgb(137,189,27)',
              borderColor: 'rgba(137,189,2,0.27)', // 图形的描边颜色。支持的格式同 color
              borderWidth: 12 // 描边线宽。为 0 时无描边。[ default: 0 ]

            }
          },
          data: getRandomData()
        }
      ]
    }
    return option
  },
  // 默认bar option
  genDefaultbarOption: function (title) {
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
      data: ['我来贷H5', '我来贷H5', '我来贷H5', '我来贷H5', '我来贷H5', 6, 7, 8, '我来贷H5', '我来贷'],
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
      symbolSize: [8, 8],
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
      data: [0, 1, 1, 1, 2, 4, 9, 15, 16, 17]
    }
    const bgBarSeries = Object.assign({}, barSeries)
    // 纹理
    var piePane = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAKElEQVQ4jWP8//8/AwXgPxMluhkYGBhGDRg1YNQAKhnAwsDAQFF+BgBtSwUd6uvSywAAAABJRU5ErkJggg=='
    var piePatternImg = new Image()
    piePatternImg.src = piePane
    bgBarSeries.z = 5
    bgBarSeries.barGap = '-100%'
    bgBarSeries.itemStyle = {
      // color: {
      //   image: piePatternImg,
      //   repeat: 'repeat',
      //   backgroundSize: '10% 10%'
      // },
      opacity: 0.15
    }
    bgBarSeries.data = [17, 17, 17, 17, 17, 17, 17, 17, 17, 17]
    const lineSeries = {
      name: '',
      type: 'line',
      symbol: ['circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'][5],
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
      data: [0, 1, 1, 1, 2, 4, 9, 15, 16, 17]
    }
    option.series = [ barSeries, bgBarSeries, lineSeries ]
    return option
  },
  getDayTime: function () {
    var temp = []
    for (var i = 0; i < 24; i++) {
      var hour = i + ':00'
      temp.push(hour)
    }
    return temp
  },
  getRandomData: function () {
    var temp = []
    for (var i = 0; i < 24; i++) {
      var item = Math.random() * 100 - Math.random() * 50
      temp.push(Math.abs(item).toFixed(2))
    }
    return temp
  }
}
