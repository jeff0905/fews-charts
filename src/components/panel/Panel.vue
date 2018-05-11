<template>
  <div class="panel panel-default" dragable :class="{'panel-selected': selected}">
    <div class="u-resize">
        <!--inlcude-->
          <div class="resize-topLeft dragable"></div>

        <!--inlcude-->
          <div class="resize-top dragable"></div>

        <!--inlcude-->
          <div class="resize-topRight dragable"></div>

        <!--inlcude-->
          <div class="resize-right dragable"></div>

        <!--inlcude-->
          <div class="resize-bottomRight dragable"></div>

        <!--inlcude-->
          <div class="resize-bottom dragable"></div>

        <!--inlcude-->
          <div class="resize-bottomLeft dragable"></div>

        <!--inlcude-->
          <div class="resize-left dragable"></div>

      </div>

      <div class="panel-header">

      </div>
      <div class="panel-body">
        <slot name="chart"></slot>
      </div>
  </div>
</template>

<script>
/* eslint-disable */
const resize = [
  "resize-topLeft",
  "resize-top",
  "resize-topRight",
  "resize-right",
  "resize-bottomRight",
  "resize-bottom",
  "resize-bottomLeft",
  "resize-left"
];
export default {
  name: "Panel",
  props: ["selected"],
  data: () => ({
    canMove: false
  }),
  mounted: function() {
    console.log(this.selected);
    // 监听宽高的变化以及位置的变化.
    this.listenResize()
  },
  methods: {
    listenResize () {
      console.log('Panel 组件监听Resize')

    }
  }
};

const helper = {
  isContainResize: function(className) {
    const splits = `${className} `.split(" ");
    for (const split of splits) {
      if (resize.includes(split)) {
        console.log(split);
        return true;
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "./Panel.less";
</style>
