const moment = require('moment')

// 默认取一个月的数据.
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

// 30天的数据，以当天为结束时间
const now = moment()
const result = []
for (var i = 0; i < 30; i++) {
  const formatDay = now.clone().subtract(i, 'days')
  const smsItem = new SmsItem()
  smsItem.date = `${formatDay.month() + 1}-${formatDay.date()}`
  smsItem.sourceChannel = `来源渠道${i}`
  smsItem.sendChannel = `发送渠道${i}`
  smsItem.allNum = i * 100
  smsItem.sucNum = i * 100 - 2
  smsItem.failNum = i
  smsItem.sucRate = `${i}%`
  result.push(smsItem)
}

export default result
