// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/style/main.less'
import Ivue from './package/index'
import VueScroller from 'vue-scroller'
import VueLazyload from 'vue-lazyload'
import VueAwesomeSwiper from 'vue-awesome-swiper'
// require styles
import 'swiper/dist/css/swiper.css'
import store from './vuex/index'
import api from './api'
Vue.use(api)
Vue.use(VueAwesomeSwiper /* { default global options } */)
Vue.use(VueLazyload)
Vue.use(VueScroller)
Vue.use(Ivue)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./assets/logo.png'),
  loading: require('./assets/logo.png'),
  attempt: 1
})
var isDebugMode = process.env.NODE_ENV !== 'production'
Vue.config.debug = isDebugMode
Vue.config.devtools = isDebugMode
Vue.config.productionTip = isDebugMode

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
