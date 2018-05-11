import Vue from 'vue'
import Vuex from 'vuex'
import Account from './AccountStore'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

console.log('debug', debug)
export default new Vuex.Store({
  modules: {
    Account
  },
  strict: debug,
  plugins: debug ? [] : []
})
