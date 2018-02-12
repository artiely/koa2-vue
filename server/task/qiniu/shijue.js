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
      // {cover: {$exists: false}},
      {cover: true},
    ],
  }).exec()

  shijueList.map(async shijue => {
    console.log('开始了')
    if (shijue.poster && !shijue.posterKey) {
      console.log('满足条件1')
      try {
        // 封面上传至七牛
        let posterData = await uploadqiniu(shijue.poster, nanoid() + '.png')
        if (posterData.key) {
          shijue.posterKey = posterData.key
        }
      } catch (err) {
        console.log('七牛上传shijue封面出错', err)
      }
    }
    if (shijue.cover) {
      console.log('满足条件2')
      // 内容的图片上传至七牛并替换
      // 匹配所有的img   匹配a下为img的 <a.*?>(<img.*?>)<\/a>
      var imgArr = shijue.content.match(/<a.*?>(<img.*?>)<\/a>/gi)
      //匹配src属性
      var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i

      for (var i = 0; i < imgArr.length; i++) {
        var src = imgArr[i].match(srcReg)
        console.log('src', src)
        //获取图片地址
        if (src[1]) {
          var _src = src[1]
          // 上传到七牛
          try {
            let srcData = await uploadqiniu(_src, nanoid() + '.png')
            var _key
            if (srcData.key) {
              _key = srcData.key
              shijue.cover = false // (后来加的需求所以加了一个字段来判断)
            }
            // 全部替换
            shijue.content = shijue.content.replace(
              imgArr[i],
              `<img src="http://qiniu.08tj.com/${_key}" />`
            )
          } catch (e) {
            console.log('内容图片替换出错', e)
          }
        }
      }
    }

    await shijue.save()
  })
})()
