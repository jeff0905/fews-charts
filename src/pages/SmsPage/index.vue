<template>
  <div class="testSms-page">
    <!-- <div class="time-select-area">
      <div class="box-toolbar">
          <label class="tab-circle-label">最近</label>
          <a class="chartselectHours" href="javascript:void(0)">24h</a>
          <a class="chartselect" href="javascript:void(0)">7天</a>
          <a class="chartselect chartselect-click" href="javascript:void(0)">30天</a>
          <a class="chartselect" href="javascript:void(0)">90天</a>
          <a class="chartselect" href="javascript:void(0)">半年</a>
          <a class="chartselect" href="javascript:void(0)">全部</a>
          <a class="chartselectdiy" href="javascript:void(0)">自定义</a>
        </div>
    </div> -->
    <v-container>
      <v-layout row wrap fill-height>
        <v-flex xs12 sm12 md12 xl12 lg12 d-inline-flex height="50">
          <v-toolbar d-inline-flex card height="50">
          <v-toolbar-title class="body-2 grey--text">最近</v-toolbar-title>
          <!-- <v-spacer></v-spacer> -->
          <v-btn> 1天</v-btn>
          <v-btn> 7天</v-btn>
          <v-btn> 10天</v-btn>
          <v-btn> 30天</v-btn>
          <v-btn> 自定义</v-btn>
        </v-toolbar>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container grid-list-md text-xs-center column>
      <v-layout row wrap>
        <v-flex lg12 md12 sm12 xs12 style="height: 500px;">
            <BarSmsChart></BarSmsChart>
        </v-flex>
        <v-flex lg12 md12 sm12 xs12 style="height: 500px;">
            <BarSms3Chart></BarSms3Chart>
        </v-flex>
        <v-flex lg4 md6 sm12 xs12 style="height: 500px;" v-for="(item , index) in channelData" :key='index'>
           <BarSms2Chart :itemData="item"></BarSms2Chart>
        </v-flex>
        <v-flex lg4 md6 sm12 xs12 style="height: 500px;">
            <PieSmsAllChart></PieSmsAllChart>
        </v-flex>
        <v-flex lg4 md6 sm12 xs12 style="height: 500px;">
            <BarSmsFailChart></BarSmsFailChart>
        </v-flex>
        <v-flex lg4 md6 sm12 xs12 style="height: 500px;" ref="fullClick">
            <PieSmsChart></PieSmsChart>
        </v-flex>
        <v-flex lg4 md6 sm12 xs12 style="height: 500px;">
            <PieSms2Chart></PieSms2Chart>
        </v-flex>
        <v-flex lg4 md6 sm12 xs12 style="height: 500px;">
            <PieSms3Chart></PieSms3Chart>
        </v-flex>
        <v-flex lg12 md12 sm12 xs12 style="height: 1000px;background: #fff;">
            <PieSms4Chart></PieSms4Chart>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
/* eslint-disable */
  import BarSmsChart from '@/components/charts/BarSmsChart'
  import BarSmsFailChart from '@/components/charts/BarSmsFailChart'
  import PieSmsAllChart from '@/components/charts/PieSmsAllChart'
  import PieSmsChart from '@/components/charts/PieSmsChart'
  import PieSms2Chart from '@/components/charts/PieSms2Chart'
  import PieSms3Chart from '@/components/charts/PieSms3Chart'
  import PieSms4Chart from '@/components/charts/PieSms4Chart'
  import BarSms2Chart from '@/components/charts/BarSms2Chart'
  import BarSms3Chart from '@/components/charts/BarSms3Chart'

  import $http from '@/$base/http'
  
  export default {
    name: 'BigPage',
    components: {
      BarSmsChart,
      BarSmsFailChart,
      PieSmsAllChart,
      PieSmsChart,
      PieSms2Chart,
      PieSms3Chart,
      BarSms2Chart,
      BarSms3Chart,
      PieSms4Chart
    },
    data () {
      return {
        channelData: [
            {
              channel: '渠道A',
              account: [
                {value: '账号1', restName: 1220, sucName: 160, failName: 160},
                {value: '账号2', restName: 350, sucName: 340, failName: 333}
              ]
            },
            {
              channel: '渠道B',
              account: [
                {value: '账号1', restName: 1220, sucName: 160, failName: 160}
              ]
            },
            {
              channel: '渠道C',
              account: [
                {value: '账号1', restName: 1220, sucName: 160, failName: 160},
                {value: '账号2', restName: 1220, sucName: 160, failName: 160}
              ]
            },
            {
              channel: '渠道D',
              account: [
                {value: '账号1', restName: 1220, sucName: 160, failName: 160},
                {value: '账号2', restName: 1220, sucName: 800, failName: 340},
                {value: '账号3', restName: 220, sucName: 160, failName: 160},
                {value: '账号4', restName: 720, sucName: 1160, failName: 160}
              ]
            },
            {
              channel: '渠道E',
              account: [
                {value: '账号1', restName: 1220, sucName: 160, failName: 160},
                {value: '账号2', restName: 1220, sucName: 160, failName: 160}
              ]
            },
            {
              channel: '渠道F',
              account: [
                {value: '账号1', restName: 1220, sucName: 160, failName: 160},
                {value: '账号2', restName: 2220, sucName: 1160, failName: 160},
                {value: '账号3', restName: 4220, sucName: 6660, failName: 360}
              ]
            }
        ]
      }
    },
    mounted () {
      // 全屏
      const _this = this
      this.$refs.fullClick.addEventListener('click', function () {
        _this.requestFullScreen(_this.$refs.fullClick)
        setTimeout(function () {
          _this.exitFullscreen()
        }, 3000)
      }, false)

      // 请求数据
      // $http.get('http://localhost:8080/api/channel').then(function (res) {
      //   console.log(res.data)
      //   const channelData = res.data
      //   _this.channelData = channelData
      // })
    },
    methods: {
      submit () {
        console.log('查询')
      },
      requestFullScreen (el) {
      var de = el
      if (de.requestFullscreen) {
        de.requestFullscreen()
      } else if (de.mozRequestFullScreen) {
        de.mozRequestFullScreen()
      } else if (de.webkitRequestFullScreen) {
        de.webkitRequestFullScreen()
      }
      },
      exitFullscreen () {
        var de = document
        if (de.exitFullscreen) {
          de.exitFullscreen()
        } else if (de.mozCancelFullScreen) {
          de.mozCancelFullScreen()
        } else if (de.webkitCancelFullScreen) {
          de.webkitCancelFullScreen()
        }
      }
    }
  }
</script>

<style lang="less">
  @import './SmsPage.less';
</style>
