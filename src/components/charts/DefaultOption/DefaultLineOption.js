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

export default option
