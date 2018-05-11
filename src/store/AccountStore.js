// import * as types from './mutation-types'
import AccountService from '@/services/AccountService'
const state = {
  list: []
}

const getters = {
  allList: state => state.list
}

const actions = {
  getList ({ commit }) {
    AccountService.getList().then(res => { commit('setList', res) })
  }
}

const mutations = {
  setList (state, list) {
    const { data: { result } } = list
    console.log(' result: ', result)
    state.list = result
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
