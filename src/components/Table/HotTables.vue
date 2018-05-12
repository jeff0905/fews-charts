<template>
    <HotTable root="hot-example" :settings="list" :rowHeaders="true" allowInsertRow />
</template>


</<script>
import HotTable from '@handsontable/vue'
export default {
  name: 'HotTables',
  components: {
    HotTable
  },
  props: ['hotSettings'],
  data: () => ({
    list: {}
  }),
  mounted: function () {
    if (!this.hotSettings) {
      this.list= {
        data: [
          ['sample', 'data', 'abc', 'dddd', 'my', 'jeff', 'sasdf'],
          ['sample', 'data', 'abc', 'dddd', 'my', 'jeff', 'sasdf'],
          ['sample', 'data', 'abc', 'dddd', 'my', 'jeff', 'sasdf'],
          ['sample', 'data', 'abc', 'dddd', 'my', 'jeff', 'sasdf'],
          ['sample', 'data', 'abc', 'dddd', 'my', 'jeff', 'sasdf']
        ],
        colHeaders: ['简单贷', '闪电贷', 'Team', 'Status'],
        rowHeaders: true,
        readOnly: false,
        width: 600,
        height: 400,
        minRows: 40,
        minCols: 10
      }
    } else {
      this.list = this.hotSettings
    }
  }
}
</script>

<style lang="less">
@import './../../../node_modules/handsontable/dist/handsontable.full.css';
</style>

