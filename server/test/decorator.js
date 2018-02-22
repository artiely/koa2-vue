const Koa = require('koa')
const app = new Koa()
const serve = require('koa-static')
const {connect} = require('../db/index')
const mongoose = require('mongoose')
const Shijue = mongoose.model('Shijue')
const Router = require('koa-router')
const router = new Router()

// 连接数据库
void (async () => {
  await connect()
})()

class Route {
  constructor() {
    this.app = app
    this.router = router
  }

  init() {
    routerMap.map(item=>{
      router[item.method](item.path, item.callback)
    })
    app.use(router.routes())
    app.use(router.allowedMethods())
  }
}

var routerMap = []

function get(path) {
  return function(target, key, descriptor) {
    routerMap.push({path, target, method: 'get', callback: target[key]})
    return descriptor
  }
}
var logTimes = 0
function log() {
  return function(target, key, descriptor) {
    app.use(async function(ctx, next) {
      logTimes++
      console.time(`${logTimes}: ${ctx.method} - ${ctx.url}`)
      await next()
      console.timeEnd(`${logTimes}: ${ctx.method} - ${ctx.url}`)
      return descriptor
    })
  }
}

class ShijueRouter {
  @get('/api')
  @log()
  async getShijue(ctx, next) {
    // await ...
    return (ctx.body = {code: 0, data: 'shijue'})
  }
}

app.use(router.routes())
app.use(router.allowedMethods())

async function start() {
  var r = new Route()
  r.init()
  app.listen(3001, function(err) {
    if (err) {
      console.log(err)
    } else {
      console.log('启动成功:3001')
    }
  })
}
start()
