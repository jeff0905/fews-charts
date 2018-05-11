/**
 * 这里配置的是用于生成Chart的信息.
 * 包含:
 * 1. 数据源, 主要是接口地址.
 * 2. Chart option, (option对象保存到数据库?,那数据变化呢?, option依赖于数据源的结果.)
 * 3. 频率 (option)
 */

export default class ChartConfig {
  constructor () {
    this.configs = []
  }

}
