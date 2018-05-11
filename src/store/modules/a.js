import * as types from '../mutation-types'

const a = {
  state: {
    sidebarOpened: true
  },
  // 同步的提交
  mutations: {
    [types.TOGGLE_SIDEBAR] (state) {
      state.sidebarOpened = !state.sidebarOpened
    }
  },
  // 异步的触发
  actions: {
    toggleSideBar ({ commit }) {
      commit('TOGGLE_SIDEBAR')
    }
  }
}

export default a
