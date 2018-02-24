
小前端从无到有实战系列
> 包含前后端数据库及爬虫 包含前后端分离和服务端渲染 vue ,react,koa2,mongodb 
> 开发中...

服务端 koa2系列  

移动端 vue系列

后台管理 react系列

pc端 vue系列


## 知识点
vue一个渐进式web框架

vuex 状态管理库

vue-router 前端路由管理库

axios 前后端请求库

koa2 nodejs web开发框架

mongodb 数据库

mongoose 数据库模型

puppeteer 爬虫

七牛上传

开发模式包含前后端分离和服务端渲染

## 第一节 环境搭建
1.nodejs 安装 推荐最新稳定版（不多BB）
2.vue-cli 安装
```
# 安装
npm install vue-cli
# 初始项目
vue init webpack <你的项目名称>
cd <你的项目名称>
# 安装依赖 （最新的vue-cli似乎不需要这步了）
npm i 
# 启动项目
npm run dev
```
> 插曲如果安装依赖很慢 可以安装一个模块 nrm
```
npm i nrm -g
# 测试可用源
nrm test
# 使用指定的源
nrm use taobao 
# 推荐使用淘宝源
```
3.安装polyfill (作用简单BB一句 ,让浏览器支持更多特性, 不然uc会给你翻白眼)
```
npm i babel-polyfill
#修改build/webpack.base.conf.js
...
 entry: {
    app: ["babel-polyfill", "./src/main.js"]
  },
...

```
4.我们对vue-cli做简单修改,方便开发
> 为了方便手机端调试 为了让vue-cli自动以本机ip启动
```
# 安装address模块
npm i address -D
# 修改config/index.js
const address = require('address')
const _localhost = address.ip()

 dev: {
...
    host: (_localhost || 'localhost'), 
    port: 8080, 
...
```
> ps:在开启梯子并开启内部vpn的时候ip会不准确

这样启动后地址栏就直接是ip了 然后下载 二维码生成工具（谷歌应用商店很多） 直接将地址转为二维码手机一扫就可以在手机上调试

到此环境告一段落

## 项目结构
```
src
  -api //接口
  -assets // 资源(未编译)
  -components // 小组件(业务相关)
  -package // 自己写的组件(业务无关)
  -router // 路由
  -views // 页面组件
  -vuex // 状态
  -static //资源(已编译)
```
## 页面及路由搭建
views 下创建几个页面
```
views
  -Home.vue #主页
  -Index.vue #首页
  -Chat.vue 
  -Fun.vue 
  -User.vue
  ...
```
router/index.js
```
import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('@/views/Home')
const Index = () => import('@/views/Index')
const Chat = () => import('@/views/Chat')
const Find = () => import('@/views/Find')
const Fun = () => import('@/views/Fun')
const User = () => import('@/views/User')

Vue.use(Router)

const router = new Router({
  scrollBehavior(to, from, savedPosition) {
    return {x: 0, y: 0}
  },
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'Index',
          component: Index
        },
        {
          path: '/chat',
          name: 'Chat',
          component: Chat
        },
        {
          path: '/user',
          name: 'User',
          component: User
        }
      ]
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    },
   ...
  ]
})


export default router

```

> 全局变量eslint报错解决

```
/*  global DPlayer:true  */
```





