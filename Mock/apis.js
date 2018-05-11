const moment = require('moment')
const smsAna = require('./smsAna')
const api = {
  'GET /api/401': (req, res) => {
    res.json({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: ''
    })
  },
  'POST /api/login': (req, res) => {
    res.json({token: '1231234A'})
  },
  // top10 App 异常数
  'GET /api/top10': (req, res) => {
    res.json([
      {name: 'Top10', value: 23489},
      {name: 'Top9', value: 33489},
      {name: 'Top8', value: 43489},
      {name: 'Top7', value: 53489},
      {name: 'Top6', value: 63489},
      {name: 'Top5', value: 73489},
      {name: 'Top4', value: 83489},
      {name: 'Top3', value: 93489},
      {name: 'Top2', value: 103489},
      {name: 'Top1', value: 113489}
    ])
  },
  'GET /api/last30Num': (req, res) => {
    // 最近30分钟异常数量, 刻度分钟.
    const now = moment();
    const result = []
    for (var i = 30; i > 0; i--) {
      const formatminute = now.clone().subtract(i, 'minute')
      const label = `${formatminute.hours()}:${formatminute.minutes()}:${formatminute.seconds()}`
      result.push({name: label, value: Math.ceil(Math.random(1, 1000) * 1000)})
    }
    // 刻度 分钟
    res.json(result)
  },
  // 日度，周度，月度， 最近30分钟趋势
  'GET /api/trend': (req, res) => {
    // 日度 刻度为24 * 60 =  1440 分钟有1440个
    const beginTime = req.params.beginTime
    const endTime = req.params.endTime
    const metric = req.params.metric
    const scale = req.params.scale

  },
  'GET /api/thisMonthNum': (req, res) => {
    // 本月的异常数量， 刻度天.
    const now = moment()
    console.log('当天', now, now.date(), now.month())
    const result = []
    for (var i = 30; i > 0; i--) {
      const formatDay = now.clone().subtract(i, 'days')
      console.log(i, now.clone().subtract(i, 'days'), now.clone().subtract(i))
      const label = `${formatDay.month() + 1}-${formatDay.date()}`
      result.push({name: label, value: Math.ceil(Math.random(1, 1000) * 1000)})
    }
    res.json(result)
  },
  'GET /api/graph': (req, res) => {
    const appNames = ['消费分期', '金融租赁', '我来贷android', '我来贷ios', '我来贷官网', '我来贷H5', '简单贷', '闪电贷', 'Staff H5', 'Staff PC', 'SDD H5', '财务管理系统',
      'lender系统', 'saas系统', '运维管理系统', 'OA', '静态资源系统', 'OPS 系统', 'VPN', 'Docker自动部署']
    const classNames = ['PayClass', 'ApplicationCLass', 'SMSClass', 'DockerService', 'SentMgt', 'HibernateDAO', 'SpringApplicationContext', 'ConfigManager',
      'HttpClient', 'Approve', 'Rejct', 'DBConnection', 'RedisConnection', 'LDAPConnection']
    var list = []
    for (var i = 0; i < appNames.length; i++) {
      const random = Math.ceil(Math.random(1, 14) * 10)
      list.push({appName: appNames[i], classNames: classNames[random], num: random})
    }
    res.json(list)
  },
  // 异常数总览
  'GET /api/total': (req, res) => {
    res.json({
      totalSum: 2 + new Date().getMinutes(),
      weekSum: 9 + new Date().getMinutes(),
      daySum: 8 + new Date().getMinutes()
    })
  },

  'GET /api/smsAna': (req, res) => {
    res.json(smsAna)
  },
  // 按渠道获取短信余量
  'GET /api/channel': (req, res) => {
    res.json([
      {
        channel: '渠道A',
        account: [
          {value: '账号1', restName: 1220, sucName: 160, failName: 160},
          {value: '账号2', restName: 350, sucName: 340, failName: 333}
        ]
      },
      {
        channel: '渠道B',
        account: [
          {value: '账号1', restName: 1220, sucName: 160, failName: 160}
        ]
      },
      {
        channel: '渠道C',
        account: [
          {value: '账号1', restName: 1220, sucName: 160, failName: 160},
          {value: '账号2', restName: 1220, sucName: 160, failName: 160}
        ]
      },
      {
        channel: '渠道D',
        account: [
          {value: '账号1', restName: 1220, sucName: 160, failName: 160},
          {value: '账号2', restName: 1220, sucName: 800, failName: 340},
          {value: '账号3', restName: 220, sucName: 160, failName: 160},
          {value: '账号4', restName: 720, sucName: 1160, failName: 160}
        ]
      },
      {
        channel: '渠道E',
        account: [
          {value: '账号1', restName: 1220, sucName: 160, failName: 160},
          {value: '账号2', restName: 1220, sucName: 160, failName: 160}
        ]
      },
      {
        channel: '渠道F',
        account: [
          {value: '账号1', restName: 1220, sucName: 160, failName: 160},
          {value: '账号2', restName: 2220, sucName: 1160, failName: 160},
          {value: '账号3', restName: 4220, sucName: 6660, failName: 360}
        ]
      }
    ])
  }
}

exports.api = api
