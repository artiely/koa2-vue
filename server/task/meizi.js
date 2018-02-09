const cp = require('child_process')
const mongoose = require('mongoose')
const Article = mongoose.model('Article')

void (async () => {
  const script = __dirname + '../crawler/meizi.js'
  const child = cp.fork(script, [])

  child.on('message',async data => {
    let res = data
    // 拿到结果 入库操作 然后转七牛空间
    data.forEach(item => {
      

      let ArticleEntry = new Article(item)
      await ArticleEntry.save()
    });
  })
})()
