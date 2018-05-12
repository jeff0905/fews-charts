<template>
  <v-app id='inspire'>
    <v-toolbar
      app
      dark color="primary"
      height="46px"
    >
      <v-toolbar-title class='ml-0 pl-3'>
        <v-toolbar-side-icon @click.stop='drawer = !drawer;'></v-toolbar-side-icon>
        <span class='hidden-sm-and-down'></span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn icon large>
        <v-avatar size='32px' tile>
          <img style="" src="http://service.wolaidai.com/static/img/welab5.png" height="32px">
        </v-avatar>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer
      width="190"
      fixed
      app
      v-model='drawer'
      :mini-variant.sync="mini"
      dark
      class="primary black--text"
    >
    <v-toolbar pa-16 color="primary" light height="46px">
      <v-avatar size='48px ' tile>
        <img src="http://service.wolaidai.com/static/img/welab5.png" style="height:22px;width:22px" />
      </v-avatar>
      <div  @click.stop='mini = !mini;' :style="{'display': (mini ? 'none': 'block') }"  style="transition:* 12.5s ease-in; text-align:center;color:#fff;padding-left:18px;">
        全景监控
      </div>
    </v-toolbar>
      <!-- <v-divider></v-divider> -->
      <v-list style="font-size:12px;">
        <template v-for='item in items'>
          <v-list-group
            v-if='item.children'
            v-model='item.model'
            :key='item.text'
            v-bind:append-icon='item.model ? upIcon : downIcon'
          >
            <v-list-tile slot='activator'
              :class="{'blue--text': item.isActive}"
              @click='goto(item)'>
              <v-list-tile-action v-if='item.icon' style="font-size:12px">
                <v-icon color="grey">{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title style="font-size:12px">
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for='(child, i) in item.children'
              :key='i'
              @click='gotoChildren(child)'
              color='light'
              light
              :class="{'blue--text': $route.path === child.path}"
              style="padding-left:10px"
            >
              <v-list-tile-action v-if='child.icon' style="font-size:12px">
                <v-icon  color="grey">{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title  style="font-size:12px">
                 {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <!-- 没有子元素 -->
          <v-list-tile  v-else :key='item.text' @click='goto(item)' :class="{'active': $route.path === item.path}">
            <v-list-tile-action style="font-size:12px">
              <v-icon  color="grey">{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title style="font-size:12px">
               {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

        </template>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <v-container fluid fill-height pa-0>
        <v-layout justify-center align-center>
          <router-view/>
        </v-layout>
      </v-container>
    </v-content>
    <v-btn
      fab
      bottom
      right
      color='pink'
      dark
      fixed
      @click.stop='dialog = !dialog'
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-dialog v-model='dialog' width='800px'>
      <v-card>
        <v-card-title
          class='grey lighten-4 py-4 title'
        >
          Create contact
        </v-card-title>
        <v-container grid-list-sm class='pa-4'>
          <v-layout row wrap>
            <v-flex xs12 align-center justify-space-between>
              <v-layout align-center>
                <v-avatar size='40px' class='mr-3'>
                  <img
                    src='//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png'
                    alt=''
                  >
                </v-avatar>
                <v-text-field
                  placeholder='Name'
                ></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                prepend-icon='business'
                placeholder='Company'
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                placeholder='Job title'
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                prepend-icon='mail'
                placeholder='Email'
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                type='tel'
                prepend-icon='phone'
                placeholder='(000) 000 - 0000'
                mask='phone'
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                prepend-icon='notes'
                placeholder='Notes'
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-btn flat color='primary'>More</v-btn>
          <v-spacer></v-spacer>
          <v-btn flat color='primary' @click='dialog = false'>Cancel</v-btn>
          <v-btn flat @click='dialog = false'>Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>
<script>
export default {
  name: 'home',
  data: () => ({
    dialog: false,
    drawer: null,
    mini: false,
    downIcon: 'keyboard_arrow_down',
    upIcon: 'keyboard_arrow_up',
    items: [
      {
        icon: 'show_chart',
        text: '短信监控',
        model: false,
        isActive: false,
        children: [
          {icon: 'sms', text: '短信统计', path: '/main/visual/smsPage', isActive: false},
          {icon: 'sms', text: '短信统计2', path: '/main/visual/smsPage2', isActive: false},
          {icon: 'sms', text: '短信统计3', path: '/main/visual/smsPage3', isActive: false}
        ]
      },
      {
        icon: 'show_chart',
        text: '异常监控',
        model: false,
        isActive: false,
        children: [
          {icon: 'bug_report', text: '概览', path: '/main/visual/overview', isActive: false},
          // {icon: 'bug_report', text: '异常概览', path: '/main/visual/bigPage', isActive: false},
          // {icon: 'bug_report', text: '异常概览2', path: '/main/visual/bigPage2', isActive: false},
          {icon: 'bug_report', text: '应用异常分析', path: '/main/visual/inspector', isActive: false}
        ]
      },
      {
        icon: 'sd_storage',
        'icon-alt': 'keyboard_arrow_down',
        text: '指标库',
        model: true,
        isActive: true, // 默认active
        children: [
          {icon: 'list', text: '指标库列表', path: '/main/indicator', isActive: true}, // 默认active.
          {icon: 'edit', text: '添加修改指标', path: '/main/indicator/chartEditer', isActive: false},
          {icon: 'content_copy', text: '数据源管理', path: '/main/DataSource', isActive: false}
        ]
      },
      {
        icon: '',
        text: '报警设置',
        model: false,
        isActive: false
      }
    ]
  }),
  // 默认进入的router, 还有直接在浏览器输入其他地址进入的. 两种情况.
  mounted: function () {
    const currentPath = this.$route.path
    this.activeNavgiator(currentPath) // 根据当前路由激活对应的导航.
  },
  methods: {
    gotoChildren: function (item) {
      if (item.path) {
        this.activeNavgiator(item.path)
        this.$router.push({ path: item.path })
      }
    },
    // 父元素点击, 如果没有子元素，直接跳转. 2: 负责关闭收缩list
    goto: function (item) {
      console.log('click ', item)
      if (item.path) {
        this.activeNavgiator(item.path)
        this.$router.push({ path: item.path })
      }
    },

    activeNavgiator (path) {
      this.items.forEach(parentItem => {
        parentItem.isActive = false
        parentItem.model = false
        // 没有子节点的情况
        if (parentItem.path === path) {
          parentItem.isActive = true
          parentItem.model = true // 如果是激活则要展开.
        }
        // 有子节点的情况
        let childFlag = false // 如果子节点选中，则childFlag = true
        const childs = parentItem.children || []
        childs.forEach(childItem => {
          childItem.isActive = false
          if (childItem.path === path) {
            childItem.isActive = true
            childFlag = true
          }
        })
        if (childFlag) {
          parentItem.isActive = true
          parentItem.model = true
        }
      })
    },
    // 关闭其他item的isActive,
    closeOtherItem (item, isChildren) {
      this.items.forEach((parentItem, index) => {
        if (isChildren) {
          const children = parentItem.children
          let thisFlag = false
          children.forEach((citem, cindex) => {
            citem.isActive = false
            // 匹配.
            if (item.path === citem.path) {
              citem.isActive = true
              thisFlag = true
            }
          })
          if (thisFlag) {
            parentItem.model = true // 展开list
            parentItem.isActive = true
          }
        } else {
          item.isActive = true
        }
      })
    }
  }
}
</script>
<style lang="less">
.active {
  background: rgba(0,0,0,0.12) !important;
}
.list__group__header--active {
  background: rgba(0,0,0,0.12) !important;
}
</style>
