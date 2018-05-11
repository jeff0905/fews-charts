<template>
  <v-container class="dataSource"  fluid  fill-height  grid-list-mdpa-0>
    <v-layout row wrap >
      <v-flex xl4 sm4 lg4>
          <v-flex d-flex>
            <v-text-field label="数据源接口地址" v-model="dataSource.uri"/>
          </v-flex>
          <v-flex d-flex>
            <v-text-field label="数据源接口名称"  v-model="dataSource.name"/>
          </v-flex>
          <v-flex d-flex>
            <v-btn @click="handleSave">添加</v-btn>
          </v-flex>
      </v-flex>
      <v-flex xl8 sm8 md8 lg8 pa-2>
        <v-data-table
          :headers="headers"
          :items="dataSources"
          hide-actions
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.name }}</td>
            <td class="text-xs-right">{{ props.item.uri }}</td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import data from './datasource.json'
export default {
  name: 'DataSource',
  data: function () {
    return {
      headers: [
        { text: '名称', value: 'name', align: 'left' },
        { text: '地址', value: 'uri', align: 'left' }
      ],
      dataSources: this.init(),
      dataSource: {
        name: '',
        uri: ''
      }
    }
  },
  mounted: function () {
    console.log('data', data)
  },
  methods: {
    init: function () {
      return this.getList()
    },

    getList: function () {
      const dataSources = localStorage.getItem('dataSources')
      let list = []
      if (dataSources) {
        list = JSON.parse(dataSources)
      }
      return list
    },
    // 去重.
    handleSave: function () {
      const newSource = Object.assign({}, this.dataSource)
      const data = this.getList()
      data.push(newSource)
      localStorage.setItem('dataSources', JSON.stringify(data))
      this.dataSource = { name: '', uri: '' }
      this.dataSources.push(newSource)
    }
  }
}
</script>
<style lang="less">

</style>
