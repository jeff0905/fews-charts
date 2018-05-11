import moment from 'moment'
const genRandom = (min, max) => {
  return Math.ceil(Math.random() * (max - min) + min)
}
// top10 app error nums
const lastTop10 = {
  x: [
    '我来贷H5',
    '闪电贷',
    '简单贷',
    '天枢',
    '审批系统',
    '短信系统',
    '运营管理',
    'SAAS',
    '客服',
    'Lender'
  ],
  y: [
    182,
    180,
    157,
    123,
    118,
    107,
    106,
    99,
    54,
    23
  ],
  allY: [
    182 + 40,
    182 + 40,
    182 + 40,
    182 + 40,
    182 + 40,
    182 + 40,
    182 + 40,
    182 + 40,
    182 + 40,
    182 + 40
  ]
}

const appNames = ['消费分期', '金融租赁', '我来贷android', '我来贷ios', '我来贷官网', '我来贷H5', '简单贷', '闪电贷', 'Staff H5', 'Staff PC', 'SDD H5', '财务管理系统',
  'lender系统', 'saas系统', '运维管理系统', 'OA', '静态资源系统', 'OPS 系统', 'VPN', 'Docker自动部署']
const classNames = ['PayClass', 'ApplicationCLass', 'SMSClass', 'DockerService', 'SentMgt', 'HibernateDAO', 'SpringApplicationContext', 'ConfigManager',
  'HttpClient', 'Approve', 'Rejct', 'DBConnection', 'RedisConnection', 'LDAPConnection']
// last 30minutes, week, day, month.
// 最近30分钟异常数量, 刻度分钟.
const now = moment()
const result = []
for (var i = 30; i > 0; i--) {
  const formatminute = now.clone().subtract(i, 'minute')
  const label = `${formatminute.hours()}:${formatminute.minutes()}分`
  const allNum = genRandom(802, 1000)// 千个
  const maxNum = genRandom(131, 800) // 最大
  const minNum = genRandom(1, 130)   // 最小
  const maxName = appNames[ genRandom(1, 19)]
  const minName = appNames[ genRandom(1, 19)]
  result.push({
    name: label,
    value: allNum,
    max: maxNum,
    min: minNum,
    avg: allNum / 10,
    maxName,
    minName
  })
}

const last30Data = result
const lastWeekData = result
const lastMonthData = result
const lastDayData = result

// 200多个app bar.
const apps = []
for (var t = 0; t < 250; t ++) {
  apps.push({ name: appNames[genRandom(1, 19)], value: genRandom(50, 1000) })
}

// 总览数据mock
let daySum = 10
let weekSum = 20
let monthSum = 800
const getDaySum = function () {
  return daySum++
}
const getWeekSum = function () {
  return weekSum++
}
const getMonthSum = function () {
  return monthSum++
}
// end.总览数据mock

// 依赖图mock
var graph = []
for (var ii = 0; ii < appNames.length; ii++) {
  const random = Math.ceil(Math.random(1, 14) * 10)
  graph.push({appName: appNames[ii], classNames: classNames[random], num: random, classNum: random})
}
// end.依赖图mock

// sms mock data 默认取一个月的数据.
class SmsItem {
  constructor () {
    this.date = ''
    this.sourceChannel = ''
    this.sendChannel = ''
    this.allNum = 0
    this.sucNum = 0
    this.failNum = 0
    this.sucRate = ''
  }
}

const random = function (x) {
  return Math.floor(Math.random() * x + 1)
}
// 30天的数据，以当天为结束时间
const sms = []
for (var m = 0; m < 30; m++) {
  const formatDay = now.clone().subtract(m, 'days')
  const smsItem = new SmsItem()
  smsItem.date = `${formatDay.month() + 1}-${formatDay.date()}`
  smsItem.sourceChannel = `来源渠道${m}`
  smsItem.sendChannel = `发送渠道${m}`
  const all = random(150)
  const small = random(10)
  smsItem.allNum = all + small
  smsItem.failNum = small
  smsItem.sucNum = all
  smsItem.sucRate = parseFloat(all / (all + small), 2)
  sms.push(smsItem)
}
export default {
  lastTop10,
  last30Data,
  lastWeekData,
  lastDayData,
  lastMonthData,
  getDaySum,
  getWeekSum,
  getMonthSum,
  graph,
  sms,
  apps // app对应的出错数量
}
