/*eslint-disable */

import echarts from 'echarts';


const ChartRender = function () {
  let echarts = null;


}

ChartRender.prototype.init = function (dom) {
  const { width, height } = dom.getBoundingClientRect();
  const chartInstance = echarts.init(dom, 'light')
  this.echarts = chartInstance
  return this.echarts
}

ChartRender.prototype.resize = function (dom) {
  const { width, height } = dom.getBoundingClientRect();
  const chartInstance = echarts.resize({ width: width - 40, height })
  this.echarts = chartInstance
  return this.echarts
}

ChartRender.prototype.getDemoOptions = function(type) {
  if (type === "line") {
    return this.getDemoLineOptions();
  }
  if (type === "pie2") {
    return this.getDemoPieOptions();
  }
  if (type === "map") {
    return this.getDemoMapOptions();
  }
  if (type === "bar") {
    return this.getDemoBarOptions();
  }
  if (type === "barTop") {
    return this.getBarTopChartOptions();
  }

  if (type === "pieSms") {
    return this.getPieSmsChartOptions();
  }
  if (type === "pieSms2") {
    return this.getPieSms2ChartOptions();
  }
  if (type === "pieSms3") {
    return this.getPieSms3ChartOptions();
  }
  if (type === "pieSms4") {
    return this.getPieSms4ChartOptions();
  }
  if (type === "barSmsFail") {
    return this.getbarSmsFailChartOptions();
  }
  if (type === "pieSmsAll") {
    return this.getPieSmsAllChartOptions();
  }
  if (type === "barSms") {
    return this.getbarSmsChartOptions();
  }
  if (type === "barSms2") {
    return this.getbarSms2ChartOptions();
  }
  if (type === "barSms3") {
    return this.getbarSms3ChartOptions();
  }
}

ChartRender.prototype.getDemoLineOptions = function() {
  var getDayTime = function(){
    var temp = [];
    for(var i = 0;i < 24;i++){
        // var hour = i < 10 ? '0' + i + ':00' : i + ':00';
        var hour = i + ':00';
        temp.push(hour);
    }
    return temp;
  }

  var getRandomData = function(){
      var temp = [];
      for(var i = 0;i < 24;i++){
          var item = Math.random() * 100 - Math.random() * 50;
          temp.push(Math.abs(item).toFixed(2));
      }

      return temp;
  }

  const option = {

    color: ['#026bb5','#00c07b','#f48024'],
    color: {
      type: 'radial',
      x: 0.5,
      y: 0.5,
      r: 0.5,
      colorStops: [{
          offset: 0, color: 'rgba(7, 13, 59, .8)' // 0% 处的颜色
      }, {
          offset: 1, color: 'rgba(7, 13, 59, .4)' // 100% 处的颜色
      }],
      globalCoord: false // 缺省为 false
    },
    // color: ['#66CCFF', '#CC6666', '#66CCCC', '#FF9999', '#CCFF99'],
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
      // left: 'left',
      // top: 'bottom',
      // text: ['高', '低'],
      // calculable: true,
      colorLightness: [0.2, 100],
      // dimension: 0,
      inRange: {
        color:['#026bb5','#00c07b'],
      },
      outOfRange: {
        color: '#f48024'
      }
    },
    // grid.top需要根据容器高度调整
    grid: [
      {top: '20%', bottom: '0%',left: '4%',right: '4%', width: '92%' , height: '60%', show: false}
            // {top: '30%',bottom: '30%',left: '5%',right: '5%',height: '30%'},
            // {top: '60%',bottom: 0,left: '5%',right: '5%',height: '30%'}
    ],
    // axisPointer: {
    //   // link: {
    //   //   xAxisIndex: 'all'
    //   // }
    // },
    tooltip: {
      trigger: 'axis',
      formatter: function(params){
        if(params instanceof Array){
          var idxMap = [{
            text: 'cpu使用率',
            data: []
          }, {
            text: '内存使用率',
            data: []
          }, {
            text: 'abc',
            data: []
          }];
          var time = params[0].axisValue;
          for(var i = 0;i < params.length;i++){
            var seriesIdx = params[i].seriesId.split(params[i].seriesId[0]);
            idxMap[seriesIdx[2]].data.push({
              marker: params[i].marker,
              seriesName: params[i].seriesName,
              data: params[i].data
            });
          };

          return '<section style="width:100px;height:50px">'
            + '<time>' + time + '</time>'
            + '<br />'
            + idxMap.map(function(item){
              return '<span>' + item.text + '</span>' + item.data.map(function(i_item){
                return '<p style="margin: 0;padding: 0;">' + i_item.marker + i_item.seriesName + ': ' + i_item.data + '%' + '</p>';
              }).join('');
            }).join('');
          + '</section>'
        }
      }
    },
    axisLabel: {
      color: '#fff'
    },
    xAxis: [{
      type: 'category',
      // gridIndex: 0,
      // boundaryGap: false,
      // axisLabel: {
      //   interval: 20
      // },
      data: getDayTime()
    }
    // , {
    //   type: 'category',
    //   gridIndex: 1,
    //   boundaryGap: false,
    //   data: getDayTime()
    // }, {
    //   type: 'category',
    //   gridIndex: 2,
    //   boundaryGap: false,
    //   axisLabel: {
    //     interval: 0
    //   },
    //   data: getDayTime()
    // }
  ],
    yAxis: [{
      splitLine: {show: false},
      name: 'cpu(%)',
      type: 'value',
      axisTick: {
        show: false,
      },
      axisLine: {
        show: true,
      },
      axisLabel: {
        show: true,
      }
      // nameTextStyle: {
      //   fontSize: 14
      // },
      // min: 0,
      // max: 100,
      // gridIndex: 0,
      // splitLine: {
      //   lineStyle: {
      //     type: 'dashed'
      //   }
      // }
    }
    // , {
    //   name: '内存(%)',
    //   type: 'value',
    //   nameTextStyle: {
    //     fontSize: 14
    //   },
    //   min: 0,
    //   max: 100,
    //   gridIndex: 1,
    //   splitLine: {
    //     lineStyle: {
    //       type: 'dashed'
    //     }
    //   }
    // }, {
    //   name: 'abc',
    //   type: 'value',
    //   nameTextStyle: {
    //     fontSize: 14
    //   },
    //   min: 0,
    //   max: 100,
    //   gridIndex: 2,
    //   splitLine: {
    //     lineStyle: {
    //       type: 'dashed'
    //     }
    //   }
    // }
  ],
    series: [
      {
        name:'192.168.1.1',
        type:'line',
        itemStyle: { //折线拐点标志的样式
          normal: {
              color: 'rgb(137,189,27)',
              borderColor: 'rgba(137,189,2,0.27)', //图形的描边颜色。支持的格式同 color
              borderWidth: 12 //描边线宽。为 0 时无描边。[ default: 0 ]

          }
        },
        data: getRandomData()
      },
      // {
      //   name:'192.168.1.5',
      //   type:'line',
      //   data: getRandomData()
      // },
      // {
      //   name:'192.168.1.1',
      //   type:'line',
      //   xAxisIndex: 1,
      //   yAxisIndex: 1,
      //   data: getRandomData()
      // },
      // {
      //   name:'192.168.1.5',
      //   type:'line',
      //   xAxisIndex: 1,
      //   yAxisIndex: 1,
      //   data: getRandomData()
      // },
      // {
      //   name:'192.168.1.5',
      //   type:'line',
      //   xAxisIndex: 2,
      //   yAxisIndex: 2,
      //   data: getRandomData()
      // }
    ]
  };
  return option;
}

ChartRender.prototype.getDemoPieOptions = function() {
  var dataStyle = {
    normal: {
        label: {
            show: false
        },
        labelLine: {
            show: false
        },
        shadowBlur: 40,
        shadowColor: 'rgba(40, 40, 40, 0.5)',
    }
  };

  var placeHolderStyle = {
      normal: {
          color: 'rgba(44,59,70,1)', // 未完成的圆环的颜色
          label: {
              show: false
          },
          labelLine: {
              show: false
          }
      },
      emphasis: {
          color: 'rgba(44,59,70,1)' // 未完成的圆环的颜色
      }
  };
  return  {
    title: {
        text: 'app异常率',
        x: 'center',
        y: 'bottom',
        textStyle: {
            fontWeight: 'normal',
            color: '#b697cd',
            fontSize: 35
        }
    },
    color : config.color,
    backgroundColor: 'rgba(0,0,0,0.8)',
    series: [{
        type: 'pie',
        clockWise: false,
        radius: ['75%', '85%'],
        itemStyle: dataStyle,
        hoverAnimation: false,
        center: ['50%', '50%'],
        data: [{
            value: 25,
            label: {
                normal: {
                    formatter: '{d}%',
                    position: 'center',
                    show: true,
                    textStyle: {
                        fontSize: '35',
                        fontWeight: 'normal',
                        color: '#3dd4de'
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: '#3dd4de',
                    shadowColor: '#3dd4de',
                    shadowBlur: 10
                }
            }
        }, {
            value: 75,
            name: 'invisible',
            itemStyle: placeHolderStyle,
        }]
    }]
  }
}

ChartRender.prototype.getBarTopChartOptions =  function () {
    const nameArr = ['张三','李四','王五','张三','李四','王五','张三','李四','王五','六六']
    const option = {
        title: {
            text: '30分钟异常Top10',
            textStyle: {
                color: '#fff'
            },
        },
        color: [
            '#026bb5'
        ],
        tooltip: {
            padding: 10,
            backgroundColor: '#222',
            borderColor: '#777',
            borderWidth: 1,
            formatter: function (obj) {
                var value = obj.value;
                return '<div style="font-size: 14px;padding-bottom: 7px;margin-bottom: 7px">'
                    +  obj.name + ' : ' + value
                    + '</div>'
                    + '负责人' + ' : ' + nameArr[obj.dataIndex];
            }

        },
        grid: {
            left: '3%',
            right: '10%',
            bottom: '8%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            // name: '个数',
            nameGap: 10,
            position: ['top', 'bottom'][0],
            nameTextStyle: {
                color: '#fff',
                fontSize: 14
            },
            boundaryGap: [0, 0.01],
            splitLine: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#eee'
                }
            },
        },
        yAxis: {
            type: 'category',
            // name: 'top',
            nameLocation: 'start',
            nameGap: 10,
            // inverse: true,
            nameTextStyle: {
                color: '#fff',
                fontSize: 14
            },
            data: [],
            axisLine: {
                lineStyle: {
                    color: '#eee'
                }
            },
        },
        series: [
            {
                name: 'App',
                type: 'bar',
                itemStyle: {
                    normal: {
                      show: true,
                      color: function(params) {
                        var num =  ['#026bb5', '#00c07b', '#f48024'].length;
                        // console.log(params,params.dataIndex)
                        let topColorIndex = 0;
                        if (params.dataIndex >= 7) {
                          topColorIndex = params.dataIndex - 7;
                        } else {
                          topColorIndex = 3;
                        }
                        return  ['#026bb5', '#00c07b', '#f48024','rgba(255,255,255,.5)'][topColorIndex]
                      }
                    }
                },
                label:{
                    normal: {
                        show: true,
                        textBorderColor: '#333',
                        textBorderWidth: 2,
                        // align: 'center',
                        position:'right',
                        color: '#fff',
                        formatter: function (obj) {
                            var value = obj.value;
                            return '' + value +' | ' + nameArr[obj.dataIndex];
                        }
                    },
                },
                data: []
            }
        ]
    };

    return option;
}

ChartRender.prototype.getbarSmsChartOptions = function () {
    const option = {
        title: {
            text: '渠道短信余量&过去n天使用短信',
            textStyle: {
                color: '#fff'
            },
            top:-3,
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data: ['生产使用','生产余量','TC营销使用','TC营销余量','TB营销使用','TB营销余量','HD生产使用','HD生产余量','HD营销使用','HD营销余量','运维警告使用','运维警告余量'],
            textStyle: {
                color: '#fff',
                fontSize: 14
            },
            right: '5%'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        yAxis:  {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: '#eee'
                }
            },
            splitLine: {
                show: false
            },
        },
        xAxis: {
            type: 'category',
            data: ['创蓝','梦网','天畅','亿美','正通','安信'],
            axisLine: {
                lineStyle: {
                    color: '#eee'
                }
            },
        },
        series: [
            {
                name: '生产使用',
                type: 'bar',
                stack: '生产账号',
                color:'#f48024',
                // barGap: 0,
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data:  [320, 302, null, null, null, null]
            },
            {
                name: '生产余量',
                type: 'bar',
                stack: '生产账号',
                color: '#026bb5',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [220, 182, null, null, null, null]
            },
            {
                name: 'TC营销使用',
                type: 'bar',
                stack: 'TC营销',
                color:'#f48024',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data:  [420, 500, 601, null, 890, 930]
            },
            {
                name: 'TC营销余量',
                type: 'bar',
                stack: 'TC营销',
                color: '#026bb5',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [220, 400, 191, null, 290, 330]
            },
            {
                name: 'TB营销使用',
                type: 'bar',
                stack: 'TB营销',
                color:'#f48024',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data:  [420, null , null, null, null, null]
            },
            {
                name: 'TB营销余量',
                type: 'bar',
                stack: 'TB营销',
                color: '#026bb5',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [220, null, null, null, null, null]
            },
            {
                name: 'HD生产使用',
                type: 'bar',
                stack: 'HD生产',
                color:'#f48024',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data:  [420, null , null, null,null,null]
            },
            {
                name: 'HD生产余量',
                type: 'bar',
                stack: 'HD生产',
                color: '#026bb5',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [220, null, null, null, null,null]
            },
            {
                name: 'HD营销使用',
                type: 'bar',
                stack: 'HD营销',
                color:'#f48024',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data:  [420, null , null, null, null,null]
            },
            {
                name: 'HD营销余量',
                type: 'bar',
                stack: 'HD营销',
                color: '#026bb5',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [220, null, null,null, null,null]
            },
            {
                name: '运维警告使用',
                type: 'bar',
                stack: '运维告警',
                color:'#f48024',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data:  [null, null , null, 666, null,null]
            },
            {
                name: '运维警告余量',
                type: 'bar',
                stack: '运维告警',
                color: '#026bb5',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [null, null, null, 888, null, null]
            }
        ]
    };

    return option;
}

ChartRender.prototype.getbarSms3ChartOptions = function () {
    const option = {
        title: {
            text: '短信余量&过去n天使用短信',
            // textStyle: {
            //     color: '#fff'
            // },
            top:-3,
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data: ['剩余数量','已消费数','可用天数'],
            textStyle: {
                // color: '#fff',
                fontSize: 14
            },
            right: '5%'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        yAxis:  [{
            type: 'value',
            name: '条数',
            axisLine: {
                lineStyle: {
                    // color: '#eee'
                }
            },
            splitLine: {
                show: false
            },
        },
        {
            type: 'value',
            axisLine: {
                lineStyle: {
                    // color: '#eee'
                }
            },
            name: '价格',
            min: 0,
            max: 30,
            interval: 5,
            splitLine: {
                show: false
            },
            axisLabel: {
                formatter: '{value}天'
            }
        }],
        xAxis: {
            type: 'category',
            data: ['创蓝生产账号','创蓝TC营销账号','创蓝TB营销账号','创蓝模拟生产账号','创蓝模拟营销账号','梦网生产账号','梦网生产营销账号',
            '天畅TC营销账号','亿美运维警告账号','正通TC营销账号','安信TC营销账号','讯奇TC营销账号'],
            axisLine: {
                lineStyle: {
                    // color: '#eee'
                }
            },
            "axisLabel": {
                "interval": 0,
                "rotate": -45
            }
        },
        series: [
            {
                name: '已消费数',
                type: 'bar',
                stack: '账号',
                color:'#f48024',
                label: {
                    normal: {
                        show: true,
                        position: 'inside'
                    }
                },
                data:  [3206, 3026,3206, 3026,3206, 3026,3206,3206, 3026,3206, 3026,3206,]
            },
            {
                name: '剩余数量',
                type: 'bar',
                stack: '账号',
                color: '#026bb5',
                label: {
                    normal: {
                        show: true,
                        position: 'inside'
                    }
                },
                data: [3206, 3026,3206, 3026,3206, 3026,3206,3206, 3026,3206, 3026,3206,]
            },
            {
                name: '可用天数',
                type: 'line',
                yAxisIndex: 1,
                label: {
                    normal: {
                        show: true,
                        position: 'inside'
                    }
                },
                data: [1, 2,3, 6,8, 10,25,3, 17,24, 12,7,]
            }

        ]
    };

    return option;
}

ChartRender.prototype.getbarSmsFailChartOptions = function () {
    var xData = function() {
        var data = [];
        for (var i = 1; i < 13; i++) {
            data.push('渠道'+i);
        }
        return data;
    }();
    const option = {
        "title": {
            "text": "渠道短信成功次数&失败次数",
            x: "4%",
            top:'4%',
            textStyle: {
                color: '#fff'
            },
        },
        "tooltip": {
            "trigger": "axis",

            "axisPointer": {
                "type": "shadow",
                textStyle: {
                    color: "#fff"
                }

            },
        },
        "grid": {
            "borderWidth": 0,
            "top": 110,
            "bottom": 95,
            textStyle: {
                color: "#fff"
            }
        },
        "legend": {
            right: '10%',
            top: '4%',
            position:'right',
            textStyle: {
                color: '#90979c',
            },
            "data": ['成功', '失败', '总数']
        },


        "calculable": true,
        "xAxis": [{
            "type": "category",
            "axisLine": {
                lineStyle: {
                    color: '#90979c'
                }
            },
            "splitLine": {
                "show": false
            },
            "axisTick": {
                "show": false
            },
            "splitArea": {
                "show": false
            },
            "axisLabel": {
                "interval": 0,
                "rotate": -60
            },
            "data": xData,
        }],
        "yAxis": [{
            "type": "value",
            "splitLine": {
                "show": false
            },
            "axisLine": {
                lineStyle: {
                    color: '#90979c'
                }
            },
            "axisTick": {
                "show": false
            },
            "axisLabel": {
                "interval": 0,

            },
            "splitArea": {
                "show": false
            },

        }],
        "series": [{
                "name": "成功",
                "type": "bar",
                "stack": "总量",
                "barMaxWidth": 35,
                "barGap": "10%",
                "itemStyle": {
                    "normal": {
                        "color": "rgba(255,144,128,1)",
                        "label": {
                            "show": true,
                            "textStyle": {
                                "color": "#fff"
                            },
                            "position": "insideTop",
                            formatter: function(p) {
                                return p.value > 0 ? (p.value) : '';
                            }
                        }
                    }
                },
                "data": [
                    709,
                    1917,
                    2455,
                    2610,
                    1719,
                    1433,
                    1544,
                    3285,
                    5208,
                    3372,
                    2484,
                    4078
                ],
            },

            {
                "name": "失败",
                "type": "bar",
                "stack": "总量",
                "itemStyle": {
                    "normal": {
                        "color": "rgba(0,191,183,1)",
                        "barBorderRadius": 0,
                        "label": {
                            "show": true,
                            "position": "top",
                            formatter: function(p) {
                                return p.value > 0 ? (p.value) : '';
                            }
                        }
                    }
                },
                "data": [
                    327,
                    1776,
                    507,
                    1200,
                    800,
                    482,
                    204,
                    1390,
                    1001,
                    951,
                    381,
                    220
                ]
            }, {
                "name": "总数",
                "type": "line",
                "stack": "总量",
                symbolSize:10,
                symbol:'circle',
                "itemStyle": {
                    "normal": {
                        "color": "rgba(252,230,48,1)",
                        "barBorderRadius": 0,
                        "label": {
                            "show": true,
                            "position": "top",
                            formatter: function(p) {
                                return p.value > 0 ? (p.value) : '';
                            }
                        }
                    }
                },
                "data": [
                    1036,
                    3693,
                    2962,
                    3810,
                    2519,
                    1915,
                    1748,
                    4675,
                    6209,
                    4323,
                    2865,
                    4298
                ]
            },
        ]
    }

    return option;
}

ChartRender.prototype.getPieSmsAllChartOptions = function () {
   const option = {
        "title": {
            "text": "渠道短信占比",
            x: "4%",
            textStyle: {
                color: '#fff'
            },
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)",

        },
        legend: {

            orient: 'vertical',
            x: 'right',
           itemWidth: 14,
            itemHeight: 14,
            align: 'left',

            data:['渠道1','渠道2','渠道3','渠道4','渠道5','渠道6','渠道7'],
                    textStyle: {
                color: '#fff'
            }
        },
        series: [
            {
                name:'访问来源',
                type:'pie',
                hoverAnimation: false,
                legendHoverLink:false,
                radius: ['40%', '42%'],
                color: ['#915872', '#3077b7', '#9a8169', '#3f8797','#5b8144','#307889','#9c6a79'],
                label: {
                    normal: {
                        position: 'inner'
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    },

                },
                tooltip: {
                   show:false,


                },

                data:[
                    {value:435, name:''},
                    {value:679, name:''},
                    {value:848, name:''},
                     {value:348, name:''},
                     {value:679, name:''},
                    {value:848, name:''},
                     {value:348, name:''}
                ]
            },
            {
                name:'访问来源',
                type:'pie',
                radius: ['42%', '55%'],
                color: ['#d74e67', '#0092ff', '#eba954', '#21b6b9','#60a900','#01949b',' #f17677'],
                label: {
                    normal: {
                        formatter: '{b}\n{d}%'
                    },

                },
                data:[
                    {value:435, name:'渠道1'},
                    {value:679, name:'渠道2'},
                    {value:848, name:'渠道3'},
                    {value:348, name:'渠道4'},
                    {value:679, name:'渠道5'},
                    {value:848, name:'渠道6'},
                    {value:348, name:'渠道7'}

                ]
            }
        ]
    };

    return option;
}

ChartRender.prototype.getPieSmsChartOptions  = function () {
    var dataStyle = {
        normal: {
            label: {
                show: false
            },
            labelLine: {
                show: false
            },
            shadowBlur: 40,
            shadowColor: 'rgba(40, 40, 40, 0.5)',
        }
    };
    var placeHolderStyle = {
        normal: {
            color: 'rgba(44,59,70,1)', //未完成的圆环的颜色
            label: {
                show: false
            },
            labelLine: {
                show: false
            }
        },
        emphasis: {
            color: 'rgba(44,59,70,1)' //未完成的圆环的颜色
        }
    };
    var count = '10000'
    var restData  = 70
    var madeData = 30
    const option = {
        title: {
            text: '短信余量:'+count,
            x: 'center',
            y: 'center',
            textStyle: {
                fontWeight: 'normal',
                color: "#0bb6f0",
                fontSize: 40
            }
        },
        color: ['#eb644b', '#313443', '#fff'],
        tooltip: {
            show: false,
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            show: false,
            itemGap: 12,
            data: ['01', '02']
        },
        toolbox: {
            show: false,
            feature: {
                mark: {
                    show: true
                },
                dataView: {
                    show: true,
                    readOnly: false
                },
                restore: {
                    show: true
                },
                saveAsImage: {
                    show: true
                }
            }
        },
        series: [{
                name: 'Line 1',
                type: 'pie',
                clockWise: false,
                radius: [195, 200],
                itemStyle: dataStyle,
                hoverAnimation: false,

                data: [{
                        value: restData,
                        name: '01'
                    }, {
                        value: madeData,
                        name: 'invisible',
                        itemStyle: placeHolderStyle
                    }

                ]
            }, {
                name: 'Line 2',
                type: 'pie',
                animation: false,
                clockWise: false,
                radius: [220, 218],
                itemStyle: dataStyle,
                hoverAnimation: false,
                tooltip: {
                    show: false
                },
                data: [{
                        value: 100,
                        name: '02',
                        itemStyle: {
                            emphasis: {
                                color: '#313443'
                            }
                        }
                    }, {
                        value: 0,
                        name: 'invisible',
                        itemStyle: placeHolderStyle
                    }

                ]
            },


        ]
    };

    return option;
}

ChartRender.prototype.getPieSms2ChartOptions = function () {
    const option = {
        title: {
            text: '余量:80%',
            x: 'center',
            y: 'center',
            textStyle: {
                fontWeight: 'normal',
                color: '#0580f2',
                fontSize: 40
            }
        },
        color: ['rgba(176, 212, 251, 1)'],
        legend: {
            show: true,
            itemGap: 12,
            data: ['短信余量', '消费短信']
        },

        series: [{
            name: 'Line 1',
            type: 'pie',
            clockWise: true,
            radius: ['50%', '66%'],
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    }
                }
            },
            hoverAnimation: false,
            data: [{
                value: 80,
                name: '短信余量',
                itemStyle: {
                    normal: {
                        color: { // 完成的圆环的颜色
                            colorStops: [{
                                offset: 0,
                                color: '#00cefc' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#367bec' // 100% 处的颜色
                            }]
                        },
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        }
                    }
                }
            }, {
                value: 20,
                name: '消费短信'
            }]
        }]
    };

    return option;
}

ChartRender.prototype.getPieSms3ChartOptions = function () {
    const option = {
        title : {
            text: '梦网短信余量',
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
            data: ['已使用短信','短信余量']
        },
        color: ['#ff6677','green'],
        series : [
            {
                name: '短信',
                type: 'pie',
                radius : '60%',
                center: ['50%', '50%'],
                data:[
                    {value:535, name:'已使用短信'},
                    {value:310, name:'短信余量'},
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                            label: {
                    normal: {
                        formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                        backgroundColor: '#eee',
                        borderColor: '#aaa',
                        borderWidth: 1,
                        borderRadius: 4,
                        // shadowBlur:3,
                        // shadowOffsetX: 2,
                        // shadowOffsetY: 2,
                        // shadowColor: '#999',
                        // padding: [0, 7],
                        rich: {
                            a: {
                                color: '#999',
                                lineHeight: 22,
                                align: 'center'
                            },
                            // abg: {
                            //     backgroundColor: '#333',
                            //     width: '100%',
                            //     align: 'right',
                            //     height: 22,
                            //     borderRadius: [4, 4, 0, 0]
                            // },
                            hr: {
                                borderColor: '#aaa',
                                width: '100%',
                                borderWidth: 0.5,
                                height: 0
                            },
                            b: {
                                fontSize: 16,
                                lineHeight: 33
                            },
                            per: {
                                color: '#eee',
                                backgroundColor: '#334455',
                                padding: [2, 4],
                                borderRadius: 2
                            }
                        }
                    }
                },
            }
        ]
    };

    return option;

}

// 嵌套环形图
ChartRender.prototype.getPieSms4ChartOptions = function () {
    const option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        color:['red','black','green','#ff3477','#873231','#123','blue','#873231','#123','blue','green','#891234','#873231'],
        legend: {
            orient: 'vertical',
            x: 'left',
            data:['创蓝','梦网','天畅','伊美','正通','安信','讯奇']
        },
        series: [
            {
                name:'短信发送供应商',
                type:'pie',
                selectedMode: 'single',
                radius: [0, '30%'],

                label: {
                    normal: {
                        position: 'inner'
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    {value:1000, name:'创蓝', selected:true},
                    
                    {value:1000, name:'梦网'},
                    
                    {value:1000, name:'天畅'},
                    
                    {value:1000, name:'伊美'},
                    
                    {value:1000, name:'正通'},
                    
                    {value:1000, name:'安信'},
                    
                    {value:1000, name:'讯奇'},
                    
                    
                ]
            },
            {
                name:'短信发送账号',
                type:'pie',
                radius: ['40%', '55%'],
                label: {
                    normal: {
                        position: 'inner'
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    {value:200, name:'生产账号'},
                    {value:200, name:'TC营销'},
                    {value:200, name:'TC生产'},
                    {value:200, name:'HD生产'},
                    {value:200, name:'HD营销'},
                    
                    {value:500, name:'生产账号'},
                    {value:500, name:'TC营销'},
                    
                    {value:1000, name:'TC营销'},
                    
                    {value:1000, name:'运维警告'},
                    
                    {value:1000, name:'TC营销'},
                    
                    {value:1000, name:'TC营销'},
                    
                    {value:1000, name:'TC营销'},
                    
                ]
            },
            {
                name:'短信发送',
                type:'pie',
                radius: ['65%', '80%'],
                // label: {
                //     normal: {
                //         formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                //         backgroundColor: '#eee',
                //         borderColor: '#aaa',
                //         borderWidth: 1,
                //         borderRadius: 4,
                //         // shadowBlur:3,
                //         // shadowOffsetX: 2,
                //         // shadowOffsetY: 2,
                //         // shadowColor: '#999',
                //         // padding: [0, 7],
                //         rich: {
                //             a: {
                //                 color: '#999',
                //                 lineHeight: 22,
                //                 align: 'center'
                //             },
                //             // abg: {
                //             //     backgroundColor: '#333',
                //             //     width: '100%',
                //             //     align: 'right',
                //             //     height: 22,
                //             //     borderRadius: [4, 4, 0, 0]
                //             // },
                //             hr: {
                //                 borderColor: '#aaa',
                //                 width: '100%',
                //                 borderWidth: 0.5,
                //                 height: 0
                //             },
                //             b: {
                //                 fontSize: 16,
                //                 lineHeight: 33
                //             },
                //             per: {
                //                 color: '#eee',
                //                 backgroundColor: '#334455',
                //                 padding: [2, 4],
                //                 borderRadius: 2
                //             }
                //         }
                //     }
                // },
                data:[
                    {value:100, name:'成功'},
                    {value:100, name:'失败'},
                    {value:100, name:'成功'},
                    {value:100, name:'失败'},
                    {value:100, name:'成功'},
                    {value:100, name:'失败'},
                    {value:100, name:'成功'},
                    {value:100, name:'失败'},
                    {value:100, name:'成功'},
                    {value:100, name:'失败'},
                    
                    {value:250, name:'成功'},
                    {value:250, name:'失败'},
                    {value:250, name:'成功'},
                    {value:250, name:'失败'},
                    
                    {value:500, name:'成功'},
                    {value:500, name:'失败'},
                    
                    {value:500, name:'成功'},
                    {value:500, name:'失败'},
                    
                    {value:500, name:'成功'},
                    {value:500, name:'失败'},
                    
                    {value:500, name:'成功'},
                    {value:500, name:'失败'},
                    
                    {value:500, name:'成功'},
                    {value:500, name:'失败'},
                    
                ]
            }
        ]
    }

    return option
}

ChartRender.prototype.getbarSms2ChartOptions = function () {
    const option = {
        title: {
            text: '',
            show:false,
            textStyle: {
                // color: '#fff'
            },
            top:-3,
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data: ['短信余量','发送失败','发送成功'],
            textStyle: {
                // color: '#fff',
                fontSize: 12
            },
            // right: '5%'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        yAxis:  {
            type: 'value',
            axisLine: {
                lineStyle: {
                    // color: '#eee'
                }
            },
            splitLine: {
                show: false
            },
        },
        xAxis: {
            type: 'category',
            data: [],
            axisLine: {
                lineStyle: {
                    // color: '#eee'
                }
            },
        },
        series: [
            {
                name: '短信余量',
                type: 'bar',
                color: '#026bb5',
                barGap:  0,
                // barWidth: 50,

                label: {
                    normal: {
                        show: true,
                        position: 'inside'
                    }
                },
                data: []
            },
            // --------------------------------------
            {
                name: '发送成功',
                type: 'bar',
                stack: '使用',
                color:'#f48024',
                // barWidth: 50,

                label: {
                    normal: {
                        show: true,
                        position: 'inside'
                    }
                },
                data:  []
            },
            {
                name: '发送失败',
                type: 'bar',
                stack: '使用',
                color:'#f41234',
                // barWidth: 50,
                label: {
                    normal: {
                        show: true,
                        position: 'inside'
                    }
                },
                data:  []
            },

        ]
    };

    return option;
}
export default ChartRender;
