<template>
    <v-container fluid class="apm-error-report" fill-height>
      <v-layout row wrap  align-content-start>
        <!-- 导航 -->
        <v-flex d-inline-flex xs12 sm12 md12 xl12 lg12 elevation-2 style="height:40px;">
          <v-breadcrumbs divider="/">
            <v-breadcrumbs-item
              v-for="item in items"
              :key="item.text"
              :disabled="item.disabled"
            >
              {{ item.text }}
            </v-breadcrumbs-item>
          </v-breadcrumbs>
        </v-flex>

        <!-- 查询区域 -->
        <v-flex  my-2 xs12 sm12 md12 xl12 lg12 elevation-2 style="height:80px">
          <v-layout row wrap align-content-start>
            <v-flex d-inline-flex xs12 sm12 md1 xl1 lg1  class="justify-content-end align-center" style="height:34px">
              <label >App名称</label>
            </v-flex>
            <v-flex d-inline-flex  xs12 sm12 md2 xl2 lg2  justify-center align-end  style="height:34px">
              <v-text-field clearable color="grey" single-line hide-details label="请输入app的名称" />
            </v-flex>
            <v-flex d-inline-flex xs12 sm12 md1 xl1 lg1  class="justify-content-end align-center" style="height:34px">
              <label >App名称</label>
            </v-flex>
            <v-flex d-inline-flex  xs12 sm12 md2 xl2 lg2  justify-center align-end  style="height:34px">
              <v-text-field clearable color="grey" single-line hide-details label="请输入app的名称" />
            </v-flex>
            <v-flex d-inline-flex xs12 sm12 md1 xl1 lg1  class="justify-content-end align-center" style="height:34px">
              <label >开始日期</label>
            </v-flex>
            <v-flex d-inline-flex  xs12 sm12 md2 xl2 lg2  justify-center align-end  style="height:34px">
              <v-text-field clearable color="grey" single-line hide-details label="请选择开始日期" />
            </v-flex>
            <v-flex d-inline-flex xs12 sm12 md1 xl1 lg1  class="justify-content-end align-center" style="height:34px">
              <label >结束日期</label>
            </v-flex>
            <v-flex d-inline-flex  xs12 sm12 md2 xl2 lg2  justify-center align-end  style="height:34px">
              <v-text-field clearable color="grey" single-line hide-details label="请选择结束日期" />
            </v-flex>
            <v-flex d-inline-flex xs12 sm12 md1 xl1 lg1  class="justify-content-end align-center" style="height:34px">
              <label >App名称</label>
            </v-flex>
            <v-flex d-inline-flex  xs12 sm12 md2 xl2 lg2  justify-center align-end  style="height:34px">
              <v-text-field clearable color="grey" single-line hide-details label="请输入app的名称" />
            </v-flex>
            <v-flex d-inline-flex  xs12 sm12 md2 xl2 lg2 text-xs-center justify-center align-center  style="height:34px">
              <v-btn small color="primary">查询</v-btn>
            </v-flex>
            <v-flex d-inline-flex  xs12 sm12 md2 xl2 lg2 text-xs-center justify-center align-center  style="height:34px">
              <v-btn small>重置</v-btn>
            </v-flex>
          </v-layout>

        </v-flex>

        <!-- 图表区域 -->
        <v-flex xs12 sm12 md12 xl12 lg12  elevation-2 style="height:600px">
          <v-layout row wrap>
            <v-flex xs12 sm12 md8 xl8 lg8>
              <Charts :option="mainOption" />
            </v-flex>
            <v-flex xs12 sm12 md4 xl4 lg4>
              <v-layout column>
                <v-flex xs12 sm12 md6 xl6 lg6>
                  <Charts :option="subOption" />
                </v-flex>
                <v-flex xs12 sm12 md6 xl6 lg6>
                  <Charts :option="subOption1" />
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
        <!-- table 数据区域 -->
        <v-flex xs12 sm12 md12 xl12 lg12 elevation-2 my-2>
          <v-layout row wrap  align-content-start>
            <v-flex d-inline-flex md2 color="grey"  class="grey white--text justify-center align-center" style="height:34px">
              标记
            </v-flex>
            <v-flex d-inline-flex md2   class="grey white--text justify-center align-center" style="height:34px">
              标记
            </v-flex>
            <v-flex d-inline-flex md4   class="grey white--text justify-center align-center" style="height:34px">
              标记
            </v-flex>
            <v-flex  d-inline-flex md2   class="grey white--text justify-center align-center" style="height:34px">
              发生时间
            </v-flex>
            <v-flex  d-inline-flex md2   class="grey white--text justify-center align-center" style="height:34px">
              耗时
            </v-flex>

            <template v-for="item in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]">
              <v-flex d-inline-flex md2  class="justify-center align-center" style="height:34px"  :key="`col1-${item}`">
                标记{{item}}
              </v-flex>
              <v-flex d-inline-flex md2   class="justify-center align-center" style="height:34px"  :key="`col2-${item}`">
                标记{{item}}
              </v-flex>
              <v-flex d-inline-flex md4   class="justify-center align-center" style="height:34px" :key="`col3-${item}`">
                标记{{item}}
              </v-flex>
              <v-flex  d-inline-flex md2   class="justify-center align-center" style="height:34px" :key="`col4-${item}`">
                发生时间{{item}}
              </v-flex>
              <v-flex  d-inline-flex md2   class="justify-center align-center" style="height:34px" :key="`col5-${item}`">
                耗时{{item}}
              </v-flex>
            </template>

          </v-layout>
        </v-flex>
      </v-layout>

    </v-container>
</template>
<script>
import Charts from '@/components/charts/Charts'
import ChartOption from '@/$base/utils/ChartOption'
export default {
  name: 'ErrorReport',
  components: {
    Charts
  },
  data: () => (
    {
      mainOption: {},
      subOption: {},
      subOption1: {},
      items: [
        {
          text: 'Dashboard',
          disabled: false
        },
        {
          text: 'Link 1',
          disabled: false
        },
        {
          text: 'Link 2',
          disabled: true
        }
      ]
    }
  ),
  mounted: function () {
    this.mainOption = this.genMainOption()
    this.subOption = this.genSubOption()
    this.subOption1 = this.genSubOption1()
  },
  methods: {
    genMainOption () {
      const option = new ChartOption()
      option.setXAxis(['a', 'b', 'c'])
        .setYAxis()
        .addSeries([1, 2, 3], 'line')
      return option
    },
    genSubOption () {
      const option = new ChartOption()
      option.setXAxis(['a', 'b', 'c'])
        .setYAxis()
        .addSeries([15, 20, 9], 'bar')
      return option
    },
    genSubOption1 () {
      const option = new ChartOption()
      option.setXAxis(['a', 'b', 'c'])
        .setYAxis()
        .addSeries([15, 20, 9], 'pie')
      return option
    }
  }
}
</script>
<style lang="less" scoped>

</style>
