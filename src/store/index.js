import Vue from 'vue'
import Vuex from 'vuex'
// vuex持久化  1.引入
import VuexPersistence from 'vuex-persist'
// 2. 创建一个 vuexlocal实例
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    historylist: []
  },
  getters: {
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    sethistorylist (state, payload) {
      let arr = state.historylist
      arr.unshift(payload)
      arr = [...new Set(arr)]
      state.historylist = arr
    },
    delHistory (state, index) {
      state.historylist.splice(index, 1)
    },
    delAllHistory (state) {
      state.historylist = []
    }
  },
  actions: {
  },
  modules: {
  },
  // 3.配置插件
  plugins: [vuexLocal.plugin]
})
