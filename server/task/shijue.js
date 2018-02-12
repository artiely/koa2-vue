const cp = require('child_process')
const mongoose = require('mongoose')
const {connect} = require('../db/index')
const fs = require('fs')
const {resolve} = require('path')
const Shijue = mongoose.model('Shijue')
// 连接数据库
void (async () => {
  await connect()
})()
void (async () => {
  const script = resolve(__dirname, '../crawler/shijue.js')
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

  child.on('message', async data => {
    // 写入文件备份
    var ws = fs.createWriteStream(__dirname + '/shijue.json')
    ws.write(JSON.stringify(data))
    ws.on('end', function() {
      console.log('文件写入完成')
    })
    // 拿到结果 入库操作 然后转七牛空间
    data.forEach(async item => {
      let shijue = await Shijue.findOne({id: item.id}).exec()
      if (!shijue) {
        let shijueEntity = new Shijue(item)
        await shijueEntity.save()
      }
    })
  })
})()
