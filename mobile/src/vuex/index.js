import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import article from './modules/article'
import createLogger from 'vuex/dist/logger'
// import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    user,
    article
  },
  plugins: [
    createLogger()
    // createPersistedState()
  ]
})

export default store
