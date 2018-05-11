<template>
  <div class="frequently">
    <v-container grid-list-md text-xs-center fill-height column class="bg">
      <v-layout column>
          <v-layout row style="height: 400px;">
            <v-flex xs2 >
              <v-select
                :items="items"
                v-model="kpi"
                label="请选择指标"
                single-line
              ></v-select>
            </v-flex>
            <v-flex xs2 >
              <v-select
                :items="items2"
                v-model="time"
                label="请选择时间"
                single-line
              ></v-select>
            </v-flex>
            <v-flex xs2>
              <v-btn color="primary" @click="submit">查询</v-btn>
            </v-flex>
          </v-layout>
          <v-layout row >
              <v-flex xs10 >
                  <Line2Chart style="height:800px"/>
              </v-flex>
          </v-layout>
          <v-layout row >
              <v-flex xs10 >
                  <LineAndBarChart style="height:800px"/>
              </v-flex>
          </v-layout>
          <v-layout row >
              <v-flex xs10 >
                  <MultipleYChart style="height:800px"/>
              </v-flex>
          </v-layout>
          <v-layout row >
              <v-flex xs10 >
                  <PieNestedChart style="height:800px"/>
              </v-flex>
          </v-layout>
          <v-layout row >
              <v-flex xs10 >
                  <PieRefererChart style="height:800px"/>
              </v-flex>
          </v-layout>
          <v-layout row >
              <v-flex xs10 >
                  <CoffeeChart style="height:800px"/>
              </v-flex>
          </v-layout>
          <v-layout row >
              <v-flex xs10 >
                  <SankeyChart style="height:800px"/>
              </v-flex>
          </v-layout>
          <v-layout row >
              <v-flex xs10 >
                  <ScatterSizeChart style="height:800px"/>
              </v-flex>
          </v-layout>
          <v-layout row >
              <v-flex xs10 >
                  <BarSmsChart style="height:800px"/>
              </v-flex>
          </v-layout>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import Line2Chart from '@/components/charts/Line2Chart'
import LineAndBarChart from '@/components/charts/LineAndBarChart'
import MultipleYChart from '@/components/charts/MultipleYChart'
import PieNestedChart from '@/components/charts/PieNestedChart'
import PieRefererChart from '@/components/charts/PieRefererChart'
import CoffeeChart from '@/components/charts/CoffeeChart'
import SankeyChart from '@/components/charts/SankeyChart'
import ScatterSizeChart from '@/components/charts/ScatterSizeChart'
import BarSmsChart from '@/components/charts/BarSmsChart'

export default {
  name: 'frequently',
  components: {
    Line2Chart: Line2Chart,
    LineAndBarChart: LineAndBarChart,
    MultipleYChart: MultipleYChart,
    PieNestedChart: PieNestedChart,
    PieRefererChart: PieRefererChart,
    CoffeeChart: CoffeeChart,
    SankeyChart: SankeyChart,
    ScatterSizeChart: ScatterSizeChart,
    BarSmsChart
  },
  data () {
    return {
      kpi: null,
      time: null,
      items: [
        { text: '邮件营销' },
        { text: '联盟广告' },
        { text: '视频广告' },
        { text: '直接访问' },
        { text: '搜索引擎' }
      ],
      items2: [
        { text: '今天' },
        { text: '本周' },
        { text: '本月' }
      ]
    }
  },
  computed: {

  },
  created () {

  },
  methods: {
    submit () {
      console.log(this.kpi.text)
      console.log(this.time.text)
    }
  }
}
</script>
<style lang="less">
.frequently {
  width:100%;
  height:100%;
  // .bg {
  //   background: url('./../$base/assets/image/vbanner.png');
  //   background-size: cover;
  // }
}
</style>
