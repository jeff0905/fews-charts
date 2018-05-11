<template>
  <v-container fill-height pa-0>
    <v-layout row>
      <v-flex xs2 md2>
        <v-layout column>
          <v-list>
            <v-list-group>
              <v-list-tile slot="activator">
                <v-list-tile-content>
                  <v-list-tile-title>选择图表类型</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-card>
                <div  ref="left">
                  <!-- <transition-group> -->
                  <div class="icon-chart" v-for="chartIcon in chartIcons" :key="chartIcon.name">
                    <img :src="chartIcon.svg" alt="">
                    <input type="checkbox" name="scatter">
                    <h5>
                      <div>{{chartIcon.name}}</div>
                    </h5>
                  </div>

                  <!-- </transition-group> -->
                </div>
              </v-card>
            </v-list-group>
          </v-list>

          <v-flex>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs10 md10 class="opt-content">
        <div fill-height class="drop" pa-10 v-on:mousemove="mousemove"  @click="clicks($event)"
              v-on:mousedown="mousedown($event)"
              v-on:mouseup="mouseup($event)"
            >
            <Panel v-for="(pa, index) in panels"
              :did="index" :key="pa.name" v-bind:selected="pa.selected"></Panel>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable */
  import draggable from 'vuedraggable'
  import {
    Drag,
    Drop
  } from 'vue-drag-drop';
  import dragula from 'dragula'
  import LineChart from '@/components/charts/LineChart'
  import Panel from '@/components/panel/Panel'
  const chartIcons = [{
      svg: "http://echarts.baidu.com/images/builder/chart/bar.svg",
      name: "柱状图 "
    },
    {
      svg: "http://echarts.baidu.com/images/builder/chart/line.svg",
      name: "折线图"
    },
    {
      svg: "http://echarts.baidu.com/images/builder/chart/pie.svg",
      name: "饼图 "
    },
    {
      svg: "http://echarts.baidu.com/images/builder/chart/scatter.svg",
      name: "散点图 "
    },
    {
      svg: "http://echarts.baidu.com/images/builder/chart/tree.svg",
      name: "树图 "
    },
    {
      svg: "http://echarts.baidu.com/images/builder/chart/treemap.svg",
      name: "矩形树图 "
    },
    {
      svg: "http://echarts.baidu.com/images/builder/chart/map.svg",
      name: "地图  "
    },
    {
      svg: "http://echarts.baidu.com/images/builder/chart/lines.svg",
      name: "线图  "
    }
  ]


  export default {
    components: {
      draggable,
      Drag,
      Drop,
      LineChart,
      Panel
    },
    data: () => ({
      chartIcons,
      canMove: false,
      coord: {},
      items: [],
      panels: [
        {selected: false, name: 'line'},  // 选中的panel.
        {selected: false, name: 'bar'}  // 选中的panel.
      ],
      dragData: {
        dragText: '拖动',
        dropText: '放下'
      }
    }),
    name: "ReportEdit",
    mounted: function () {
      console.log(this.$refs,this.$refs.left, this.$refs.right)
      const drake = dragula([this.$refs.left, this.$refs.right], { copy: true })
      drake.on("drop", (e) => {
        console.log('dragend', e);
        this.items.push({
          component: "LineChart"
        })
      })

      const drake2 = dragula([this.$refs.dropInDrag]);
    },
    methods: {
      // 选中了panel,
      clicks($event) {
        const target = $event.target;
        const className = target.className;
        const index = target.getAttribute('did');
        console.log('[editor.vue] 父窗口点击了panel.vue', className, index, $event);
        if (className.indexOf('panel') >= 0) {
          for( var panel of this.panels) {
            panel.selected = false;
          }
          this.panels[index].selected = true;
          console.log('this.panels[index]', this.panels[index])
        }

        console.log(this.panels);
      },

      mousedown($event) {
        console.log('[editor.vue] mousedown', $event);
        const target = $event.target;
        if (target.className.indexOf('resize-') >= 0) {
          this.coord = {};
          this.coord = editor.coords($event);
          const parentNode = target.parentNode.parentNode;
          this.coord.w = parentNode.getBoundingClientRect().width;
          this.coord.h = parentNode.getBoundingClientRect().height;
          console.log("开始启动拖动",this.coord);
          this.canMove = true;
        }
      },
      // panel 已经选中要拖动了.
      mousemove($event) {
        const target = $event.target;
        if (this.canMove) {
          // if (target.className.indexOf('resize-') >= 0) {
            console.log("开始拖动", editor.coords($event) );
            const tempCoords = editor.coords($event);
            const cha = {
              w: tempCoords.x - this.coord.x,
              h: tempCoords.y - this.coord.y
            }
            // 获取父节点的宽高.
            const parentNode = target.parentNode.parentNode;
            const rect = {
              w: parentNode.getBoundingClientRect().width + cha.w,
              h: parentNode.getBoundingClientRect().height + cha.h
            }
            console.log(parentNode, rect)
            // 设置新的宽高
            parentNode.setAttribute('style', `width:${rect.w}px;height:${rect.h}px`);
          // }
        }
      },
      // 鼠标松开.
      mouseup($event) {
        console.log('鼠标松开',$event);
        this.canMove = false;
      }

    }
  };

  const editor = {}
  editor.coords = function(e) {
    if (e.pageX || e.pageY) {
      return {x: e.pageX, y: e.pageY };
    }
    return{
      x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
      y:ev.clientY + document.body.scrollTop - document.body.clientTop
    };
  }
</script>

<style lang="less" scoped>
  @import './../../node_modules/dragula/dist/dragula.css';
  .opt-content {
    background: rgba(0, 0, 0, 0.15);
  }

  // icon-chart
  .icon-chart {
    box-shadow: 0px 0px 15px #293c55;
    border: 1px solid rgba(41, 60, 85, 0.6);
    display: inline-block;
    vertical-align: top;
    margin: 10px 10px;
    text-align: center;
    width: 60px;
    border: 2px solid transparent;
    cursor: pointer;
    -webkit-transition: all 0.4s;
    transition: all 0.4s;
    img {
      margin-top: 5px;
      width: 40px;
      height: 40px;
      padding: 5px 10px;
    }
    .h5 {
      color: #000;
      font-weight: normal;
      margin: 5px 0;
      padding: 0;
      line-height: 10px;
      position: relative;
    }
  }

  // drag drop
  .drop {
    width: 100%;
    height: 100%;
  }

  // panel
  .panel {

  }
</style>
