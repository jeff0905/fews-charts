/**
 * becuase the moment class constructor is lowercase, and the eslint disallow constructor start with a lowercase letter
 * so we use eslint-disable to disable the eslint rule.
 */
/* eslint-disable */
import moment from 'moment'


/**
 * @param{format} string , 'YYYY-MM-dd HH:mm:ss' ...
 * @returns {string}
 */
export let getNow = function (format) {
  const now = new moment()
  if (format) {
    return now.format(format)
  } else {
    return now.format('YYYY-MM-DD HH:mm:ss')
  }
}

/**
 * 获取当天的开始时间, 0点0分的时间.
 */
export let getTodayBegin = function (format) {
  const now = new moment()
  const year = now.year()
  const month = now.month()
  const day = now.date()
  const newDate = new moment([year, month, day, 0, 0, 0])  // when set the date, the month don't need add 1.
  if (format) {
    return newDate.format(format)
  } else {
    return newDate.format('YYYY-MM-DD HH:mm:ss')
  }
}

/**
 * 获取当月的开始时间, N月1日0点0分0秒.
 */
export let getMonthBegin = function (format) {
  const now = new moment()
  const year = now.year()
  const month = now.month()
  const date = 1
  const newDate = new moment([year, month, date, 0, 0, 0])  // when set the date, the month don't need add 1.
  if (format) {
    return newDate.form(format)
  } else {
    return newDate.format('YYYY-MM-DD HH:mm:ss')
  }
}

/**
 * 获取当周开始时间, N月本周周一0点0分0秒.
 * Sunday as 0 and Saturday as 6
 * day() the day of the week
 */
export let getWeekBegin = function (format) {
  const now = new moment()
  const newDate = now.set({'day': 'Monday', 'hour': 0, 'minute': 0, 'second': 0})

  if (format) {
    return newDate.format(format)
  } else {
    return newDate.format('YYYY-MM-DD HH:mm:ss')
  }
}


/**
 * 获取当前时间前N秒时间段内的开始时间, 前1分钟， 前30分钟等等.
 * @param {diff} 时间差,单位为秒.
 */
export let getLastBegin = function (diff, format) {
  const now = new moment()
  const newDate = now.subtract(diff, 'seconds')
  if (format) {
    return newDate.format(format)
  } else {
    return newDate.format('YYYY-MM-DD HH:mm:ss')
  }
}

/**
 * 获取某时间之前 N 秒的 时间.
 * @param {diff} 时间差, 单位秒
 *
 */
export let getDateBegin = function (date, diff, format) {
  const mdate = new moment(date)
  const newDate = mdate.subtract(diff, 'seconds')
  if (format) {
    return newDate.format(format)
  } else {
    return newDate.format('YYYY-MM-DD HH:mm:ss')
  }
}
