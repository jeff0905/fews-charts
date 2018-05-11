<template>
  <div class="test-page">
    <v-container grid-list-md text-xs-center fill-height column>
      <v-layout row>
            <v-flex lg1 >
              <v-select
                :items="items"
                v-model="kpi"
                label="请选择指标"
                single-line
              ></v-select>
            </v-flex>
            <v-flex lg1 >
              <v-select
                :items="items2"
                v-model="time"
                label="请选择时间"
                single-line
              ></v-select>
            </v-flex>
            <v-flex lg1>
              <v-btn color="primary" @click="submit">查询</v-btn>
            </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>

export default {
  name: 'TestPage',
  components: {

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
.test-page {
  width:100%;
  height:100%;
}
</style>
