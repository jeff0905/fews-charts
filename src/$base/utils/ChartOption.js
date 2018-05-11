/**
 * 配置echarts的Option.
 * 这里, 类似line, bar, 等简单的chart. x|y轴坐标体系, 则只需要传入x,y, title, subtitle即可获得一个默认的option,如下
 * ```javascript
 *  let option = new ChartOption()
 *  option.setTitle(title, subTitle)
 *        .setBackground()
 *        .setGrid()
 *        .setXAxis()
 *        .setYAxis()
 *        .
 * ```
 */
class ChartOption {
  constructor () {
    // this.color = config && config.color  // config = config
    // this.grid = []
    this.series = []
    this.title = null
    this.legend = []
    this.xAxis = [] // 多个的时候
    this.yAxis = [] // 数组是如果有多个Y轴的情况.

    this.tooltip = {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    } // default tooltip

  }
  setColor (color) {
    this.color = color
    return this
  }
  setTitle (text, subText, isShow = true, textStyle, subTextStyle) {
    if (text || subText) {
      this.title = {}
      this.title.show = isShow
      this.title.text = text
      this.title.subtext = subText
      this.title.textStyle = textStyle || {color: '#bbb'}
    }
    return this
  }

  appendTitle (titleObj) {
    this.title = titleObj
    return this
  }

  // 设置背景
  setBackground (backgroundColor) {
    if (backgroundColor) {
      this.backgroundColor = backgroundColor
    } else {
      this.backgroundColor = '#fff'
    }
    return this
  }

  setGrid (grid = {top: '20%', left: '8%', right: '8%', bottom: '2%', show: false}) {
    this.grid.push(grid)
    return this
  }

  // 默认grid, 如果只有一个grid, 不需要设置。 如果appendGrid调用之后，就需要设置了.
  appendGrid (grid) {
    if (!this.grid) {
      this.grid = []
    }
    this.grid.push(grid)
    return this
  }
  // 设置X轴
  setXAxis (data = [], type = 'category', isShow = true, ...rest) {
    let xAxis = {}
    xAxis.show = isShow
    xAxis.type = type
    xAxis.data = data
    rest.forEach(item => {
      xAxis[item.key] = item.value
    })
    this.xAxis.push(xAxis)
    return this
  }
  appendXAxis( rest ) {
    let xAxis = rest
    this.xAxis.push(xAxis)
    return this
  }
  /**
   * 设置Y轴, 可以设置多个,
   * @param {type} 类型
   * @param {name} Y轴name
   */
  setYAxis (type = 'value', name = '', isShow = true, ...rest) {
    let yAxis = {}
    yAxis.show = isShow
    yAxis.type = type
    yAxis.name = name
    yAxis.splitLine = {}
    yAxis.splitLine.show = false
    yAxis.axisTick = {}
    yAxis.axisTick.show = false
    yAxis.axisLabel = {}
    yAxis.axisLabel.show = isShow
    yAxis.axisLine = {}
    yAxis.axisLine.show = isShow

    // grid.
    rest.forEach(item => {
      yAxis[item.key] = item.value
    })
    // position, offset
    if (this.yAxis.length > 0) {
      yAxis.position = 'right'
      yAxis.offset = 50 * (this.yAxis.length - 1)
      this.yAxis.push(yAxis)
    } else {
      yAxis.position = 'left'
      this.yAxis.push(yAxis)
    }
    return this
  }

  appendYAxis (rest) {
    let yAxis = rest
    this.yAxis.push(yAxis)
    return this
  }
  /**
   * 设置legend
   */
  setLegend (data) {
    let legend = {}
    legend.data = data
    this.legend.push(legend)
    return this
  }

  // 添加不同的series, 默认折线图, lineStyle='abc'
  addSeries (data, type = 'line', name = '', yAxisIndex = 0, ...rest) {
    const series = {}
    series.name = name
    series.type = type
    series.data = data
    series.yAxisIndex = yAxisIndex
    series.smooth = true
    rest.forEach(item => {
      console.log(item)
      series[item.key] = item.value
    })
    // series.smoothMonotone = 'y'
    this.series.push(series)
    return this
  }

  appendSeries (rest) {
    const series = rest
    console.log('series ', series)
    this.series.push(series)
    return this
  }

  /**
   * 执行series颜色的策略.
   * 1: 前N个策略,
   * @param {number} topNum,  前number数量个
   * @param {array} color,  颜色数组
   *
   * */
  seriesColor (topNum, color, seriesIndex) {
    const series = this.series[seriesIndex]
    const selectColor = color || []
    if (series) {
      const itemStyle = series.itemStyle || {}
      itemStyle.color = (params) => {
          var num = selectColor.length
          let topColorIndex = params.dataIndex % num
          return selectColor[topColorIndex]
      }
      this.series[seriesIndex].itemStyle = itemStyle
    }

    return this
  }
}


export default ChartOption

