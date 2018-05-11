
<template>
  <div class="head-wrapper">
    {{title}}
  </div>
</template>
<script>
export default {
  name: 'Header',
  data () {
    return {
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  methods: {

  },
  mounted  () {

  }
}
</script>

<style lang="less">

@media (min-width: 0) {
  .head-wrapper {
      background-image: url('./header.png');
      background-size: 200% 50px;
      background-position-x: center;
      height: 50px;
      width: 100%;
      position: absolute;
      color: #fff;
      font-size: 24px;
      // padding-top: 10px;
  }
}
@media (min-width: 960px) {
  .head-wrapper {
      background-image: url('./header.png');
      background-size: 100% 50px;
      background-position-x: center;
      height: 50px;
      width: 100%;
      position: absolute;
      color: #fff;
      font-size: 24px;
      line-height: 40px;  // need update.

  }
}

</style>
