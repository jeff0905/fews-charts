<template>
  <div class="bar">
    <div class="bar-chart" ref="barChart"></div>
  </div>
</template>

<script>
/* eslint-disable */
  import ChartRender from './chart'
  const options = {
    color: '#fff',
    title: {
      text: '食品生产监管情况',
      textStyle: {
        color: '#fff'
      },
      // subtext: '事项办理类型发展趋势',
      subtextStyle: {
        color: '#fff'
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      // data: ['办理事项数'],
      // left:'27%'
    },
    grid: {
      containLabel: true,
    },
    axisLabel: {
      color: '#fff'
    },
    xAxis: {
      type: 'value',
      color: '#fff',
      position: 'top',
      splitLine: {
        show: false
      },
      axisLabel: {
        color: '#fff'
      }
    },
    yAxis: {
      type: 'category',
      data: ['崇左市', '来宾市', '河池市', '贺州市', '百色市', '玉林市', '贵港市', '钦州市', '防城港市', '北海市']
    },
    series: [{
      name: '办理事项数',
      itemStyle: {
        normal: {
          color: function(params) {
            var colorList = [
              '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
              '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
              '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
            ];
            return colorList[params.dataIndex]
          },
          shadowBlur: 20,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      type: 'bar',
      data: [9263, 13203, 14203, 18103, 21203, 28903, 38203, 41603, 48203, 53489]
    }]
  };

  export default {
    name: 'BarVChart',
    mounted: function() {
      const chartRender = new ChartRender()
      console.log(chartRender, this.$refs.barChart)
      const chartInstance = chartRender.init(this.$refs.barChart)
      console.log(options)
      chartInstance.setOption(options)
    }
  }
</script>

<style lang="less">
  .bar {
    width: 100%;
    height: 100%;
    .bar-chart {
      width: 100%;
      height: 100%;
      padding: 10px;
    }
  }
</style>
