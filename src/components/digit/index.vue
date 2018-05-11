<template>
  <div class="digit-wrapper"
    :style="{'color': color}"
    :class="{'digit-wrapper-big': type === 'big', 'digit-wrapper-mid': type !== 'big'}">
    <!-- <canvas ref="dcanvas" style="height:16px;width:16px;"></canvas> -->
    <span class="num-top" :class="{'ani-out': canStart}" ref="nt">{{this.pre}}</span>
    <span class="num-bottom" :class="{'ani-in': canStart}" ref="nb">
      {{this.no}}
    </span>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "Digit",
  props: {
    number: [String, Number],
    type: [String, Number],
    color: [String, Number]
  },
  data: function() {
    return {
      no: this.number,
      pre: this.number,
      canStart: false
    };
  },
  watch: {
    number: function(cur, pre) {
      console.log(
        `现在的值是:${cur}, 之前的值是:${pre},初始是${this.pre},动画是否开始 ${
          this.canStart
        }`
      );
      this.no = cur;
      this.canStart = true;
      window.setTimeout(() => {
        this.canStart = false;
        this.pre = cur;
      }, 300);
    }
  }
};
</script>

<style lang="less" scoped>
@width: 30px;
@height: 60px;
@fontSize: 60px;
@font-face {
  font-family: "efont";
  src: url("DS-DIGIT.ttf");
}

.digit-wrapper {
  position: relative;
  display: inline-block;
  height: @height;
  width: 100%;
  overflow: hidden;
  font-size: @fontSize;
  color: #026bb5;
  font-family: "efont";
  .num-top {
    position: absolute;
    top: 0;
    height: @height;
    left: 0;
    text-align: center;
    width: 100%;
  }
  .num-bottom {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: @height;
  }
}

.ani-in {
  animation-name: slideInUp;
  animation-duration: 0.5s;
}

.ani-out {
  animation-name: slideOutUp;
  animation-duration: 0.5s;
}

.digit-wrapper2 {
  position: relative;
  display: inline-block;
  margin: 0 2px;
  height: @height;
  width: @width;
  -webkit-border-radius: 5px;
  -webkit-background-clip: padding-box;
  -moz-border-radius: 5px;
  -moz-background-clip: padding;
  border-radius: 5px;
  background-clip: padding-box;
  text-align: center;
  text-shadow: #ffffff 0px -3px 0px, #000000 0px 3px 0px;
  background-color: #353a48;
  -webkit-box-shadow: 0 2px 0px rgba(0, 0, 0, 0.25),
    inset 0 2px 0px rgba(255, 255, 255, 0.25), 2px 2px 3px rgba(0, 0, 0, 1),
    -2px -2px 3px rgba(0, 0, 0, 1), 2px -2px 3px rgba(0, 0, 0, 1),
    -2px 2px 3px rgba(0, 0, 0, 1);
  -moz-box-shadow: 0 2px 0px rgba(0, 0, 0, 0.25),
    inset 0 2px 0px rgba(255, 255, 255, 0.25), 2px 2px 3px rgba(0, 0, 0, 1),
    -2px -2px 3px rgba(0, 0, 0, 1), 2px -2px 3px rgba(0, 0, 0, 1),
    -2px 2px 3px rgba(0, 0, 0, 1);
  box-shadow: 0 2px 0px rgba(0, 0, 0, 0.25),
    inset 0 2px 0px rgba(255, 255, 255, 0.25), 2px 2px 3px rgba(0, 0, 0, 1),
    -2px -2px 3px rgba(0, 0, 0, 1), 2px -2px 3px rgba(0, 0, 0, 1),
    -2px 2px 3px rgba(0, 0, 0, 1);
  overflow: hidden;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.7);
  font-family: "Source Code Pro", monospace;
  font-size: @fontSize;
  font-weight: 400;
  color: #fff;
  &-big {
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgeG1sbnM9Imh0d…g9IjEiIGhlaWdodD0iMSIgZmlsbD0idXJsKCNsZXNzaGF0LWdlbmVyYXRlZCkiIC8+PC9zdmc+);
    background-image: -webkit-linear-gradient(
      -90deg,
      rgba(68, 75, 93, 1),
      rgba(46, 50, 62, 1) 100%
    );
    background-image: -moz-linear-gradient(
      -90deg,
      rgba(68, 75, 93, 1),
      rgba(46, 50, 62, 1) 100%
    );
    background-image: -o-linear-gradient(
      -90deg,
      rgba(68, 75, 93, 1),
      rgba(46, 50, 62, 1) 100%
    );
    background-image: linear-gradient(180deg, #0b7732, #052688 100%);
  }
  &-mid {
    background-image: linear-gradient(
      180deg,
      rgb(51, 183, 255),
      rgb(7, 85, 128) 100%
    );
  }
  &::after {
    content: " ";
    border: 2px solid rgba(0, 0, 0, 0.15);
    width: @width;
    margin-top: 3px;
    height: 100%;
    font-size: 1em;
    -webkit-border-radius: 5px;
    -webkit-background-clip: padding-box;
    -moz-border-radius: 5px;
    -moz-background-clip: padding;
    border-radius: 5px;
    background-clip: padding-box;
    display: inline-block;
  }
  .num-top {
    position: absolute;
    top: 0px;
    left: 00px;
    display: inline-block;
    z-index: 1;
    height: 50%;
    overflow: hidden;
    width: 100%;
    -webkit-box-shadow: 0 2px 0px rgba(0, 0, 0, 0.25),
      inset 0 2px 0px rgba(255, 255, 255, 0.25);
    -moz-box-shadow: 0 2px 0px rgba(0, 0, 0, 0.25),
      inset 0 2px 0px rgba(255, 255, 255, 0.25);
    box-shadow: 0 2px 0px rgba(0, 0, 0, 0.25),
      inset 0 2px 0px rgba(255, 255, 255, 0.25);
    &-flip {
      animation: flipOutX 0.2s ease;
    }
  }
  .num-bottom {
    position: absolute;
    top: 0px;
    left: 00px;
    display: inline-block;
    z-index: 1;
    height: 50%;
    overflow: hidden;
    width: 100%;
    -webkit-box-shadow: 0 2px 0px rgba(0, 0, 0, 0.25),
      inset 0 2px 0px rgba(255, 255, 255, 0.25);
    -moz-box-shadow: 0 2px 0px rgba(0, 0, 0, 0.25),
      inset 0 2px 0px rgba(255, 255, 255, 0.25);
    box-shadow: 0 2px 0px rgba(0, 0, 0, 0.25),
      inset 0 2px 0px rgba(255, 255, 255, 0.25);
    top: 53%;
    height: 46%;
    .bottom-container {
      margin-top: -76%;
    }
    &-flip {
      animation: flipInX 0.2s ease;
    }
  }
}

@keyframes slideInUp {
  0% {
    transform: translate3d(0, 0, 0);
    visibility: visible;
  }
  to {
    transform: translate3d(0, -@height, 0);
  }
}

@keyframes slideOutUp {
  0% {
    transform: translate3d(0, 0, 0);
  }
  to {
    visibility: hidden;
    transform: translate3d(0, -@height, 0);
    display: none;
  }
}

@keyframes flipOutX {
  0% {
    transform: perspective(400px);
  }
  30% {
    transform: perspective(400px) rotateX(-20deg);
    opacity: 1;
  }
  to {
    transform: perspective(400px) rotateX(90deg);
    opacity: 0;
  }
}

@keyframes flipInX {
  0% {
    transform: perspective(400px) rotateX(90deg);
    animation-timing-function: ease-in;
    opacity: 0;
  }
  30% {
    transform: perspective(400px) rotateX(-20deg);
    animation-timing-function: ease-in;
  }
  to {
    transform: perspective(400px);
  }
}
</style>
