import Vue from 'vue'
import Router from 'vue-router'
// const HelloWorld = () => import('@/components/HelloWorld')
const Home = () => import('@/views/Home')
const Index = () => import('@/views/Index')
const Chat = () => import('@/views/Chat')
const Find = () => import('@/views/Find')
const Fun = () => import('@/views/Fun')
const User = () => import('@/views/User')
const Detail = () => import('@/views/Detail')
const Login = () => import('@/views/Login')
const Register = () => import('@/views/Register')

Vue.use(Router)
Router.prototype.back = function() {
  this.isBack = true
  window
    .history
    .go(-1)
}
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
        }, {
          path: '/chat',
          name: 'Chat',
          component: Chat
        }, {
          path: '/find',
          name: 'Find',
          component: Find
        }, {
          path: '/fun',
          name: 'Fun',
          component: Fun
        }, {
          path: '/user',
          name: 'User',
          component: User
        }
      ]
    }, {
      path: '/detail',
      name: 'Detail',
      component: Detail
    }, {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    // 登录验证
    /* let token = null
    if (token) {
      next({
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } */
  } else {
    next()
  }
})

export default router
