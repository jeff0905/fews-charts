<template>
  <v-layout column class="chart-panel-wrapper chart-panel-wrapper-border"
    :class="{noHover: 'chart-panel-wrapper-hover'}"
    :style="{'height': `${height}px`}">
    <v-flex d-inline-flex class="panel-header" style="height:40px">
      <v-toolbar d-inline-flex card height="40">
        <v-toolbar-title class="body-2 grey--text">{{title}} {{height - 40}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon color='grey lighten-1'>date_range</v-icon>
        </v-btn>
        <v-btn icon @click="handleShowData()">
          <v-icon color='grey lighten-1'>apps</v-icon>
        </v-btn>
        <v-btn icon @click="handleBig()">
          <v-icon color='grey lighten-1'>settings_overscan</v-icon>
        </v-btn>
      </v-toolbar>
    </v-flex>
    <v-flex class="panel-body"  ref="pbody" v-bind:style="{'min-height': (height - 40) + 'px'}">
        <!-- <slot name="chart" class="slot"></slot> -->
        <Charts v-bind:option='option' :theme="'light'" v-on:click="handleDrill" :group="group" ref="ichart"/>
    </v-flex>
  </v-layout>
</template>

<script>
import Charts from '@/components/charts/Charts'

export default {
  name: 'ChartPanel',
  components: {
    Charts
  },
  props: [
    'title',
    'option',
    'group',
    'height', // 高度
    'noHover',
    'isshowTitle',
    'isshowBorder',
    'isPopup' // 是否下转指标.
  ],
  mounted: function () {
    console.log('ChartPanel init', this.group, this.$refs.pbody.clientWidth, this.title, this.$refs.pbody.getBoundingClientRect())
  },
  methods: {
    handleClick () {
      console.log('handle Click')
      this.$emit('drill')
      // window.open('about:blank', '_blank', 'width=400,height=240,menubar=no,toolbar=no, status=no,scrollbars=yes')
    },

    // 放大..
    handleBig () {
      console.log('click big --> handleBig()')
      this.$emit('onBig')
      this.$refs.ichart.resize()
    },

    // 显示数据
    handleShowData () {
      this.$emit('onShowData')
    },
    // 钻取
    handleDrill () {
      this.$emit('drill')
    }
  }
}
</script>

<style lang='less'>
@import "./ChartPanel.less";
</style>
