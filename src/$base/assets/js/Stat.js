
export default class Stat {
  // MA 移动均线, 1,2,3,4,5 . 2日均线, (1, (1+2)/2, (2+3)/2, (3+4)/2, )
  getMA (num, list) {
    return list.map((item, index) => {
      if (index <= num) {
        let newList = list.slice(0, index + 1)
        return this.addInList(newList) / (index + 1)
      } else {
        let newList = list.slice(index - num, index)
        return this.addInList(newList) / num
      }
    })
  }

  /**
   * list的每个元素相加.
   * @param {*} list
   */
  addInList (list) {
    let result = 0
    for (var i = 0; i < list.length; i++) {
      result += list[i]
    }
    return result
  }
}
