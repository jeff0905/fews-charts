/**
 * 这里是chart Option 的模板, 插槽主要是可变的数据.
 *
 *
 */

const OptionTemplate = {
  // top 10 模板, 标题 (title), x坐标轴(category), y值(value), y值(bgValue)
  bar: {
    title: {text: (ptitle) => ptitle, textStyle: {fontSize: 14}},
    grid: {containLabel: true,show: false, left: '5%', top: 20},
    xAxis: {type: 'value',  position: 'top',  splitLine: {show: false}},
    yAxis: {type: 'category', data: `category`, inverse: true, z: 10, zlevel: 10, splitLine: {show: false}, axisLabel: {show: true, inside: false, color: '#fff'}},
    series: [
      {
        name: yname => yname,
        type: 'pictorialBar',
        data: `value`,
        symbol: 'circle',
        symbolSize: [8, 8],
        symbolRepeat: true,
        barGap: 0,
        xAxisIndex: 0,
        z: 5,
        zlevel: 5,
        yAxisIndex: 0
      },
      {
        name: '',
        type: 'pictorialBar',
        data: `bgValue`,
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
      }
    ]
  },

  line: () => (
    {}
  )
}

export default OptionTemplate
