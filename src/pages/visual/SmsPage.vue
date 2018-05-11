<template>
  <v-container fill-height pa-0 class="sms-page">
    <v-layout row wrap>
      <v-flex xs12 sm12 md12 xl12 lg12>
        <v-card>
          <v-toolbar flat>
            <v-flex lg2 md1 sm1 xs1>
              <v-select :items="items" v-model="size"></v-select>
            </v-flex>
            <v-flex lg2 md1 sm1 xs1>
              <v-select :items="items" v-model="size"></v-select>
            </v-flex>
            <v-flex lg2 md1 sm1 xs1>
              <v-btn >
                搜索
              </v-btn>
            </v-flex>
          </v-toolbar>
        </v-card>
        <!-- <v-toolbar>
          <v-btn >
            <v-icon>date_range</v-icon>
            选择自定义时间
          </v-btn>
          <v-btn >
            <v-icon>search</v-icon>
            搜索
          </v-btn>
        </v-toolbar> -->
      </v-flex>
      <v-container grid-list-xs >
          <v-layout row wrap>
            <v-flex lg6 md6 sm12 xs12 style="height: 500px;" class="barSms-item">
              <BarSms3Chart></BarSms3Chart>
            </v-flex>
            <v-flex lg6 md6 sm6 xs12 style="height: 500px;" class="barSms-item">
              <PieSms4Chart></PieSms4Chart>
            </v-flex>
          </v-layout>
      </v-container>
      <v-container grid-list-xs>
          <v-layout row wrap>
            <v-flex lg3 md4 sm4 sm12 xs12 class="barSms-item" style="height: 520px;" v-for="(item , index) in channelData" :key='index'>
                <v-subheader class="item-title">{{item.channel}}</v-subheader>
                <BarSms2Chart :itemData="item"></BarSms2Chart>
            </v-flex>
          </v-layout>
      </v-container>
    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable */
  import BarSms2Chart from '@/components/charts/BarSms2Chart'
  import BarSms3Chart from '@/components/charts/BarSms3Chart'
  import PieSms4Chart from '@/components/charts/PieSms4Chart'

  import $http from '@/$base/http'

  export default {
    name: 'SmsPage',
    components: {
      BarSms2Chart,
      BarSms3Chart,
      PieSms4Chart
    },
    data () {
      return {
              size: 'md',
              items: [
                { text: 'Extra small (2px)', value: 'xs' },
                { text: 'Small (4px)', value: 'sm' },
                { text: 'Medium (8px)', value: 'md' },
                { text: 'Large (16px)', value: 'lg' },
                { text: 'Extra large (24px)', value: 'xl' }
              ],
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
      // 请求数据
      // const _this = this
      // $http.get('http://localhost:8080/api/channel').then(function (res) {
      //   console.log(res.data)
      //   const channelData = res.data
      //   _this.channelData = channelData
      // })
    }
  }
</script>

<style lang="less">
  @import './SmsPage.less';
</style>
