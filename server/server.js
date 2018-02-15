const Koa = require('koa')
const app = new Koa()
const serve = require('koa-static')
const {connect} = require('./db/index')

// 连接数据库
void (async () => {
  await connect()
})()
const router = require('./router')

app.use(router.routes()).use(router.allowedMethods())
// app.use(serve(__dirname + '/dist/', {extensions: ['html']}))
app.listen(3001, function(err) {
  if (err) {
    console.log(err)
  } else {
    console.log('启动成功:3001')
  }
})
