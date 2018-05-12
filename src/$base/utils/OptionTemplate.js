/**
 * 这里是chart Option 的模板, 插槽主要是可变的数据.
 *
 *
 */

const OptionTemplate = {
  // top 10 模板, 标题 (title), x坐标轴(category), y值(value), y值(bgValue)
  bar2: {
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

  bar: () => ({
    title: {
      text: '主标题',
      subtext: '副标题'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['系列一', '系列二', '系列三']
    },
    calculable: true,
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '系列一',
        type: 'bar',
        smooth: true,
        itemStyle: {
          normal: {
            areaStyle: {
              type: 'default'
            }
          }
        },
        data: [10, 12, 21, 54, 260, 830, 710]
      },
      {
        name: '系列二',
        type: 'bar',
        smooth: true,
        itemStyle: {
          normal: {
            areaStyle: {
              type: 'default'
            }
          }
        },
        data: [30, 182, 434, 791, 390, 30, 10]
      },
      {
        name: '系列三',
        type: 'bar',
        smooth: true,
        itemStyle: {
          normal: {
            areaStyle: {
              type: 'default'
            }
          }
        },
        data: [1320, 1132, 601, 234, 120, 90, 20]
      }
    ]
  }),
  line: () => ({
    title: {
      text: '主标题',
      subtext: '副标题'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['系列一', '系列二', '系列三']
    },
    calculable: true,
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '系列一',
        type: 'line',
        smooth: true,
        itemStyle: {
          normal: {
            areaStyle: {
              type: 'default'
            }
          }
        },
        data: [10, 12, 21, 54, 260, 830, 710]
      },
      {
        name: '系列二',
        type: 'line',
        smooth: true,
        itemStyle: {
          normal: {
            areaStyle: {
              type: 'default'
            }
          }
        },
        data: [30, 182, 434, 791, 390, 30, 10]
      },
      {
        name: '系列三',
        type: 'line',
        smooth: true,
        itemStyle: {
          normal: {
            areaStyle: {
              type: 'default'
            }
          }
        },
        data: [1320, 1132, 601, 234, 120, 90, 20]
      }
    ]
  }),
  pie: () => (
    {
      title : {
          text: '某站点用户访问来源',
          subtext: '纯属虚构',
          x:'center'
      },
      tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
          orient: 'vertical',
          left: 'left',
          data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
      },
      series : [
          {
              name: '访问来源',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:[
                  {value:335, name:'直接访问'},
                  {value:310, name:'邮件营销'},
                  {value:234, name:'联盟广告'},
                  {value:135, name:'视频广告'},
                  {value:1548, name:'搜索引擎'}
              ],
              itemStyle: {
                  emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
              }
          }
      ]
    }
  ),
  scatter: () => (
    {
      xAxis: {},
      yAxis: {},
      series: [{
          symbolSize: 20,
          data: [
              [10.0, 8.04],
              [8.0, 6.95],
              [13.0, 7.58],
              [9.0, 8.81],
              [11.0, 8.33],
              [14.0, 9.96],
              [6.0, 7.24],
              [4.0, 4.26],
              [12.0, 10.84],
              [7.0, 4.82],
              [5.0, 5.68]
          ],
          type: 'scatter'
      }]
    }
  ),
  // 桑吉图
  sankey: () => (
    {
    series: {
        type: 'sankey',
        layout:'none',
        data: [{
            name: 'a'
        }, {
            name: 'b'
        }, {
            name: 'a1'
        }, {
            name: 'a2'
        }, {
            name: 'b1'
        }, {
            name: 'c'
        }],
        links: [{
            source: 'a',
            target: 'a1',
            value: 5
        }, {
            source: 'a',
            target: 'a2',
            value: 3
        }, {
            source: 'b',
            target: 'b1',
            value: 8
        }, {
            source: 'a',
            target: 'b1',
            value: 3
        }, {
            source: 'b1',
            target: 'a1',
            value: 1
        }, {
            source: 'b1',
            target: 'c',
            value: 2
        }]
    }
    }
  ),

  // 漏斗图
  funnel: () => (
    {
    title: {
        text: '漏斗图',
        subtext: '纯属虚构'
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c}%"
    },
    toolbox: {
        feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
        }
    },
    legend: {
        data: ['展现','点击','访问','咨询','订单']
    },
    calculable: true,
    series: [
        {
            name:'漏斗图',
            type:'funnel',
            left: '10%',
            top: 60,
            //x2: 80,
            bottom: 60,
            width: '80%',
            // height: {totalHeight} - y - y2,
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            label: {
                normal: {
                    show: true,
                    position: 'inside'
                },
                emphasis: {
                    textStyle: {
                        fontSize: 20
                    }
                }
            },
            labelLine: {
                normal: {
                    length: 10,
                    lineStyle: {
                        width: 1,
                        type: 'solid'
                    }
                }
            },
            itemStyle: {
                normal: {
                    borderColor: '#fff',
                    borderWidth: 1
                }
            },
            data: [
                {value: 60, name: '访问'},
                {value: 40, name: '咨询'},
                {value: 20, name: '订单'},
                {value: 80, name: '点击'},
                {value: 100, name: '展现'}
            ]
        }
      ]
    }
  )
}

export default OptionTemplate
