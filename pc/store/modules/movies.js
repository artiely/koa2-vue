import * as types from '../mutation-types'
// import api from '@/api/api'
// import Cookies from 'js-cookie'
import axios from 'axios'

// initial state
const state = {
  movies:[]
}

// getters
const getters = {}

// mutations
const mutations = {
  [types.ARTICLE_DETAIL](state, payload) {
    state.articleDetail = {...payload}
  },
}

// actions
const actions = {
  getMovies({commit}, payload) {
   
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
