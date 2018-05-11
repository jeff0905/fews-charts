import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

import Login from '@/pages/Login'
import Main from '@/pages/Main'
// import Indicator from '@/indicator/Indicator'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: 'datav',
  routes: [
    {
      path: '',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/bigPage2',
      name: 'bigPage2',
      icon: 'compose',
      title: '大屏',
      component: () => import(/* webpackChunkName: 'big' */ '@/pages/BigPage/BigPage2')
    },
    // 指标库管理
    {
      path: '/main',
      name: 'main',
      redirect: '/main/indicator',
      component: Main,
      children: [
        {
          path: 'indicator',
          icon: 'compose',
          name: 'indicator',
          component: () => import(/* webpackChunkName: 'indicator' */ '@/pages/Indicator/index'),
          children: [
            {
              path: '',
              icon: 'compose',
              title: '指标列表',
              component: () => import(/* webpackChunkName: 'indicator' */ '@/pages/Indicator/List')
            },
            {
              path: 'chartEdit',
              icon: 'compose',
              title: '新增或修改指标',
              component: () => import(/* webpackChunkName: 'indicator' */ '@/pages/Indicator/ChartEdit')
            }
          ]
        },
        {
          path: 'visual',
          name: 'visual',
          title: '可视化',
          component: () => import(/* webpackChunkName: 'visual' */ '@/pages/visual'),
          children: [
            {
              path: 'overview',
              name: 'overview',
              icon: 'compose',
              title: '概览',
              component: () => import(/* webpackChunkName: 'visual' */ '@/pages/BigPage/overview')
            },
            {
              path: 'inspector',
              name: 'inspector',
              icon: 'compose',
              title: '应用分析',
              component: () => import(/* webpackChunkName: 'visual' */ '@/pages/BigPage/ApplicationInspector')
            },
            {
              path: 'bigPage',
              name: 'bigPage',
              icon: 'compose',
              title: '大屏',
              component: () => import(/* webpackChunkName: 'visual' */ '@/pages/BigPage')
            },
            {
              path: 'smsPage',
              name: 'smsPage',
              icon: 'compose',
              title: '短信大屏',
              component: () => import(/* webpackChunkName: 'visual' */ '@/pages/visual/SmsPage')
            },
            {
              path: 'smsPage2',
              name: 'smsPage2',
              icon: 'compose',
              title: '短信大屏2',
              component: () => import(/* webpackChunkName: 'visual' */ '@/pages/visual/SmsPage2')
            },
            {
              path: 'smsPage3',
              name: 'smsPage3',
              icon: 'compose',
              title: '短信大屏3',
              component: () => import(/* webpackChunkName: 'visual' */ '@/pages/visual/SmsPage3')
            },
            {
              path: 'errorReport',
              name: 'errorReport',
              icon: 'compose',
              title: '异常报告',
              component: () => import(/* webpackChunkName: 'visual' */ '@/pages/Report/ErrorReport')
            }
          ]
        },
        // 数据源管理
        {
          path: 'dataSource',
          name: 'dataSource',
          icon: 'compose',
          title: '数据源管理',
          component: () => import(/* webpackChunkName: 'dataSource' */ '@/pages/DataSource/index')
        },
        {
          path: 'testPage',
          name: 'testPage',
          component: () => import('@/pages/TestPage')
        },
        {
          path: 'testSmsPage',
          name: 'testSmsPage',
          component: () => import(/* webpackChunkName: 'SmsPage' */ '@/pages/SmsPage')
        }
      ]
    }
  ]
})
