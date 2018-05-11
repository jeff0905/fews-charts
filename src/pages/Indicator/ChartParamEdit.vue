<template>
  <div class="chart-param">
    <v-container fluid fill-height pa-1 dark>
        <v-btn small>重置</v-btn>
        <v-btn small color='blue' v-on:click="handleSubmit()">
          提交
        </v-btn>
    </v-container>
    <v-divider />
    <v-spacer />
    <v-container fluid fill-height pa-0>
      <v-layout fill-height>
        <v-flex fill-height xs3>
          <v-list dark>
            <v-list-tile v-ripple style="background:#fff; color:#000">
              <div>基础</div>
            </v-list-tile>
            <v-list-tile v-ripple>标题</v-list-tile>
            <v-list-tile v-ripple>视区</v-list-tile>
            <v-list-tile v-ripple>X轴</v-list-tile>
            <v-list-tile v-ripple>Y轴</v-list-tile>
            <v-list-tile v-ripple>图例</v-list-tile>
            <v-list-tile v-ripple>提示</v-list-tile>
            <v-list-tile v-ripple>工具</v-list-tile>
          </v-list>
        </v-flex>
        <v-divider />
        <v-spacer />
        <v-flex fill-height xs9>
          <v-layout fill-height>
            <v-flex xs2 fill-height>
              <div class="param-title">
                <v-list light>
                  <v-list-tile v-ripple>内容</v-list-tile>
                  <v-list-tile v-ripple>样式</v-list-tile>
                </v-list>
              </div>
            </v-flex>
            <v-flex xs10 fill-height dark>
              <ul dark>
                <li>
                  <div class="main-title"></div>
                  <div class="main-title-input">
                    <v-text-field label="主标题文案" v-model="editOption.title.text" solo style="height:20px" />
                  </div>
                </li>
                <li>
                  <v-text-field label="主标题文案超链接"  v-model="editOption.title.link" solo row-height="14" />
                </li>
                <li>
                  <v-text-field label="副标题文案"  v-model="editOption.title.subtext" solo row-height="14" />
                </li>
                <li>
                  <v-text-field label="副标题文案超链接"  v-model="editOption.title.sublink" solo row-height="14" />
                </li>
              </ul>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
/* eslint-disable */
  // 这里的option应该是mixins进来或者导入进来.
  export default {
    name: 'ChartParamEdit',
    props: ['option'],
    data: () => ({
      editOption: {
        title: {
          text: '', // 主标题文本，支持使用 \n 换行。
          link: '', // 主标题文本超链接。
          subtext: '', // 副标题文本，支持使用 \n 换行。
          sublink: '', // 副标题文本超链接。
          textStyle: {
            color: 'rgba(0,0,0,1)'
          },
          subtextStyle: {},
          // top: 0,
          // right: 0,
          // bottom: 0,
          // left: 0
        }, //标题
      }
    }),

    created: function() {
      console.log('this.setOption', this.option)
      this.editOption = Object.assign({}, this.option)
    },
    methods: {
      handleSubmit() {
        console.log('submit', this.editOption);
        this.$emit('setOption', this.editOption);
      }
    }
  }
</script>

<style lang="less">
  @import './ChartParamEdit.less';
</style>
