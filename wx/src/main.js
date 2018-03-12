import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    pages: ['^pages/index/index', 'pages/counter/counter', 'pages/logs/logs'], // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#a9b7b7',
      selectedColor: '#11cd6e',
      borderStyle: 'white',
      list: [
        {
          selectedIconPath: 'static/img/1.png',
          iconPath: 'static/img/1.png',
          pagePath: 'pages/index/index',
          text: '文章'
        },
        {
          selectedIconPath: 'static/img/2.png',
          iconPath: 'static/img/2.png',
          pagePath: 'pages/counter/counter',
          text: '电影'
        },
        {
          selectedIconPath: 'static/img/3.png',
          iconPath: 'static/img/3.png',
          pagePath: 'pages/logs/logs',
          text: '福利'
        }
      ]
    }
  }
}
