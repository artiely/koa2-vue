const qiniu = require('qiniu')
const nanoid = require('nanoid')
const {AK, SK, bucket} = require('./config')
const mongoose = require('mongoose')
const {connect} = require('../../db/index')
const Shijue = mongoose.model('Shijue')

var mac = new qiniu.auth.digest.Mac(AK, SK)
const cfg = new qiniu.conf.Config()
const client = new qiniu.rs.BucketManager(mac, cfg)
// 连接数据库
void (async () => {
  await connect()
})()
const uploadqiniu = async (url, key) => {
  return new Promise((resolve, reject) => {
    client.fetch(url, bucket, key, (err, ret, info) => {
      if (err) {
        reject(err)
      } else {
        if (info.statusCode === 200) {
          resolve({key})
        } else {
          reject(info)
        }
      }
    })
  })
}


void (async () => {
  // 查库 验证是否已上传过七牛
  let shijueList = await Shijue.find({
    $or: [
      // 查询条件为不存在或为空
      {posterKey: {$exists: false}},
      {posterKey: null},
      {posterKey: ''},
    ],
  }).exec()

  shijueList.map(async shijue => {
    if (shijue.poster && !shijue.posterKey) {
      try {
        let posterData = await uploadqiniu(shijue.poster, nanoid() + '.png')
        if (posterData.key) {
          shijue.posterKey = posterData.key
        }
        await shijue.save()
      } catch (err) {
        console.log('七牛上传shijue封面出错', err)
      }
    }
  })
})()
