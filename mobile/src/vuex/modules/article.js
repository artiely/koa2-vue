import * as types from '../mutation-types'
// import api from '@/api/api'
// import Cookies from 'js-cookie'

// initial state
const state = {
  articleDetail: {} // 登录用户信息
}

// getters
const getters = {}

// mutations
const mutations = {
  [types.ARTICLE_DETAIL](state, payload) {
    state.articleDetail = {...payload}
  }
}

// actions
const actions = {
  getUserInfo({commit}, payload) {}
}

export default {
  state,
  getters,
  actions,
  mutations
}
