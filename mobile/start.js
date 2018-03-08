const {resolve} = require('path')
const Koa = require('koa')
const serve = require('koa-static')
const app = new Koa()
const port = 3003
app.use(serve(resolve(__dirname, './dist')))
const server = app.listen(port, () => {
  console.log(
    process.env.NODE_ENV === 'development'
      ? `Open ${chalk.green('http://localhost:' + port)}`
      : `App listening on port ${port}`
  )
})
