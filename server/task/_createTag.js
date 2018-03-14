const {connect} = require('../db/index')
const mongoose = require('mongoose')
const Article = mongoose.model('Article')
const Tag = mongoose.model('Tag')

void (async () => {
  await connect()
  let articles = await Article.find({}).exec()
  console.log('文章长度', articles.length)
  for (let i = 0; i < articles.length; i++) {
    let article = articles[i]
    console.log(`开始第${i}个文章`)
    let tags = article.tags
    console.log('标签个数', tags.length)
    for (let j = 0; j < tags.length; j++) {
      // 单篇文章的单个标签
      let tag = tags[j]
      // 然后查询这个标签是否存在
      let _tag = await Tag.findOne({name: tag}).exec()
      console.log('查出来的tag', _tag)
      // 如果不存在这个_tag就新建一个tag name 同时关联文章
      if (!_tag) {
        _tag = new Tag({name: tag, articles: [article._id]})
      } else {
        // 这里是已经保存过了tag 但是没有关联文章
        console.log(_tag.articles, article._id)
        if (_tag.articles.indexOf(article._id) === -1) {
          _tag.articles.push(article._id)
        }
      }
      await _tag.save()

      // 给文章关联tagsid
      if (!article.tagsId) {
        article.tagsId.push(_tag._id)
      } else {
        if (article.tagsId.indexOf(_tag._id) === -1) {
          article.tagsId.push(_tag._id)
        }
      }
      await article.save()
    }
  }
})()
