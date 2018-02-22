const Koa = require('koa')
const app = new Koa()
const serve = require('koa-static')
const {connect} = require('../db/index')
const mongoose = require('mongoose')
const Shijue = mongoose.model('Shijue')
const Juejin = mongoose.model('Article')
const Router = require('koa-router')
const router = new Router()

// 连接数据库
void (async () => {
  await connect()
})()

router.get('/api/shijue/:page/:limit', async (ctx, next) => {
  var page = ctx.params.page || 1
  var limit = Number(ctx.params.limit) || 10

  const shijue = await Shijue.find({})
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({_id: -1})
    .exec()
  ctx.status = 200
  return (ctx.body = {code: 0, data: shijue})
})

app.use(router.routes()).use(router.allowedMethods())
app.listen(3001, function(err) {
  if (err) {
    console.log(err)
  } else {
    console.log('启动成功:3001')
  }
})
