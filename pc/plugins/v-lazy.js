import Vue from 'vue'
Vue.use(require('vue-lazyload'), {
  preLoad: 1.3,
  error: require('../assets/logo.png'),
  loading: require('../assets/logo.png'),
  attempt: 1,
})
