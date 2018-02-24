/**
 * Created by Artiely on 2017/7/20.
 */
import fetch from './fetch'

/**
 * 登录
 * @param {String} username
 * @param {String} password
 */
const LOGIN = params => {
  return fetch({
    url: '/api/sys/login',
    method: 'post',
    data: params
  })
}

/**
 * 获取掘金的文章
 * @param {Number} page
 * @param {Number} limit
 */
const GET_JUEJIN = params => {
  return fetch({
    url: `/api/v0/juejin/${params.page}/${params.limit}`,
    method: 'get',
    params: ''
  })
}

/**
 * 获取小姐姐图片
 * @param {Number} page
 * @param {Number} limit
 */
const GET_MEIZI = params => {
  return fetch({
    url: `/api/v0/meizi/${params.page}/${params.limit}`,
    method: 'get',
    params: ''
  })
}

/**
 * 获取电影
 * @param {Number} page
 * @param {Number} limit
 */
const GET_MOVIES = params => {
  return fetch({
    url: `/api/v0/movies/${params.page}/${params.limit}`,
    method: 'get',
    params: ''
  })
}

/**
 * 获取视觉设计
 * @param {Number} page
 * @param {Number} limit
 */
const GET_SHIJUE = params => {
  return fetch({
    url: `/api/v0/shijue/${params.page}/${params.limit}`,
    method: 'get',
    params: ''
  })
}

const apiList = {
  LOGIN,
  GET_JUEJIN,
  GET_MEIZI,
  GET_MOVIES,
  GET_SHIJUE
}

export default apiList
