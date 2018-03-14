const cp = require('child_process')
const mongoose = require('mongoose')
const data = require('./juejin-like.json')
const {resolve} = require('path')
const fs = require('fs')
const Article = mongoose.model('Article')

void (async () => {
  const script = resolve(__dirname, '../crawler/find.js')
  const child = cp.fork(script, [])
  let invoked = false

  child.on('error', err => {
    if (invoked) return
    invoked = true
    console.log(err)
  })

  child.on('exit', code => {
    if (invoked) return
    invoked = true
    let err = code === 0 ? null : new Error('exit code ' + code)
    console.log(err)
  })
  child.on('message', data => {
    console.log('收到消息,开始入库')
    // 写入文件备份
    var ws = fs.createWriteStream(__dirname + '/juejin-like.json')
    ws.write(JSON.stringify(data))
    ws.on('end', function() {
      console.log('文件写入完成')
    })
    // 写入数据库
    data.forEach(async item => {
      let id = item.id
      let article = await Article.findOne({id: id}).exec()
      if (!article) {
        let articleEntity = new Article(item)
        await articleEntity.save()
      }
    })
  })
})()
