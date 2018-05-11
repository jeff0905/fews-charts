
<template>
  <div class="title-wrapper">
    <span class="title" :style="{'color':color, 'font-size': size}">{{ title }}</span>
  </div>
</template>
<script>
export default {
  name: 'Title',
  props: ['title', 'color', 'size']
}
</script>

<style lang="less">
.title-wrapper {
  width: 100%;
  height: 100%;
  display:inline-block;
  text-align:center;
  .title {
    margin: 0 auto;
    font-size: 20px;
    color:#fff;
  }
}
</style>
