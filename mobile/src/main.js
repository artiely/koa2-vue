// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/style/main.less'
import Ivue from './package/index'
// import vueg from './package/erouter'
import VueScroller from 'vue-scroller'
import VueLazyload from 'vue-lazyload'
import VueAwesomeSwiper from 'vue-awesome-swiper'
// require styles
import 'swiper/dist/css/swiper.css'
import store from './vuex/index'
// import './assets/style/animate.css'
Vue.use(VueAwesomeSwiper /* { default global options } */)
Vue.use(VueLazyload)
Vue.use(VueScroller)
Vue.use(Ivue)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/error.png',
  loading: 'dist/loading.gif',
  attempt: 1
})
// Vue.use(vueg, router) // ←注意这一句应该在router实例化之后
var isDebugMode = process.env.NODE_ENV !== 'production'
console.log('123------', isDebugMode, store)
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
