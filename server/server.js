import {join,resolve} from 'path'
import Koa from 'koa'
const serve = require('koa-static')
import R from 'ramda'
import chalk from 'chalk'
import config from './config'
var cors = require('koa2-cors')

const MIDDLEWARES = ['db', 'router']

const useMiddlewares = app => {
  R.map(
    R.compose(R.forEachObjIndexed(e => e(app)), require, name =>
      join(__dirname, `./middleware/${name}`)
    )
  )(MIDDLEWARES)
}

// 其实上面的代码就等价于下面 使用ramda将引入与使用结合为一个函数
//  const {database} = require('./middleware/db')
//  const {router} = require('./middleware/router')

 
async function start() {
  const app = new Koa()
  const {port} = config
  // if (process.env.NODE_ENV === 'development') {
  //    app.use(cors())
  // }
   app.use(cors())
  app.use(serve(resolve(__dirname , '../pc/dist')))
  await useMiddlewares(app)
  //等价于下面
  // database(app)
  // router(app)
  const server = app.listen(port, () => {
    console.log(
      process.env.NODE_ENV === 'development'
        ? `Open ${chalk.green('http://localhost:' + port)}`
        : `App listening on port ${port}`
    )
  })
}

start()
