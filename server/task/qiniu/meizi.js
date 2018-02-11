const qiniu = require('qiniu')
const nanoid = require('nanoid')
const {AK, SK, bucket} = require('./config')
const mongoose = require('mongoose')
const {connect} = require('../../db/index')
const Meizi = mongoose.model('Meizi')

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
// let meiziList = [
//   {
//     groupId: '5591',
//     title: '送福利，祝大家2018年元旦快乐',
//     links: [
//       'http://mm.chinasareview.com/wp-content/uploads/2017a/08/02/01.jpg',
//       'http://mm.chinasareview.com/wp-content/uploads/2017a/08/02/02.jpg',
//       'http://mm.chinasareview.com/wp-content/uploads/2017a/08/02/03.jpg',
//       'http://mm.chinasareview.com/wp-content/uploads/2017a/08/02/04.jpg',
//       'http://mm.chinasareview.com/wp-content/uploads/2017a/08/02/05.jpg',
//       'http://mm.chinasareview.com/wp-content/uploads/2017a/08/02/06.jpg',
//       'http://mm.chinasareview.com/wp-content/uploads/2017a/08/02/07.jpg',
//       'http://mm.chinasareview.com/wp-content/uploads/2017a/08/02/08.jpg',
//       'http://mm.chinasareview.com/wp-content/uploads/2017a/08/02/09.jpg',
//       'http://mm.chinasareview.com/wp-content/uploads/2017a/08/02/10.jpg',
//     ],
//     poster:
//       'http://mm.chinasareview.com/wp-content/uploads/2017a/08/02/limg.jpg',
//   },
// ]

void (async () => {
  // 查库 验证是否已上传过七牛
  let meiziList = await Meizi.find({
    $or: [
      // 查询条件为不存在或为空
      {posterKey: {$exists: false}},
      {posterKey: null},
      {posterKey: ''},
      {linksKey: []},
    ],
  }).exec()

  meiziList.map(async meizi => {
    if (meizi.poster && !meizi.posterKey && meizi.linksKey.length == 0) {
      try {
        let posterData = await uploadqiniu(meizi.poster, nanoid() + '.png')
        if (posterData.key) {
          meizi.posterKey = posterData.key
        }
        var linksKey = []

        // 这里的注意事项 在异步进程中不要再使用异步函数（除非用promise包装） 注释的就是错误示例
        // meizi.links.map(async link => {
        //   var linkData = await uploadqiniu(link, nanoid() + '.png')
        //   if (linkData.key) {
        //     linksKey.push(linkData.key)
        //   }
        // })

        for (let i = 0; i < meizi.links.length; i++) {
          try {
            var linkData = await uploadqiniu(meizi.links[i], nanoid() + '.png')
            if (linkData.key) {
              linksKey.push(linkData.key)
            }
          } catch (e) {
            console.log('七牛上传meizi详情出错', e)
          }
        }

        meizi.linksKey = linksKey
        await meizi.save()
      } catch (err) {
        console.log('七牛上传meizi封面出错', err)
      }
    }
  })
})()
