const Router = require('koa-router')
const router = new Router()
const mongoose = require('mongoose')
const Shijue = mongoose.model('Shijue')
const Juejin = mongoose.model('Article')

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

router.get('/api/juejin/:page/:limit', async (ctx, next) => {
  var page = ctx.params.page || 1
  var limit = Number(ctx.params.limit) || 10

  const juejin = await Juejin.find({})
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({_id: -1})
    .exec()
  ctx.status = 200
  return (ctx.body = {code: 0, data: juejin})
})

module.exports = router