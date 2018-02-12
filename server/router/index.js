var Koa = require('koa')
var Router = require('koa-router')
const mongoose = require('mongoose')
const Shijue = mongoose('Shijue')

var app = new Koa()
var router = new Router()

router.get('/shijue', async (ctx, next) => {
  // ctx.router available
  const shijue = await Shijue.find({}).exec()
  ctx.success({code: 0, data: shijue})
})

app.use(router.routes()).use(router.allowedMethods())
