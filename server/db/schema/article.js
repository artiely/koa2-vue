const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {Mixed,ObjectId} = Schema.Types

const articleSchema = new Schema({
  avatar: String,
  author: String,
  title: String,
  id: {
    type: String,
    unique: true,
    require: true,
  },
  tags: [String],
  tagsId: [
    {
      type: ObjectId,
      ref: 'Tag',
    }
  ],
  create_time: Mixed,
  content: String,
  meta: {
    createAt: {
      type: Date,
      defaut: Date.now(),
    },
    updateAt: {
      type: Date,
      defaut: Date.now(),
    },
  },
})
// 通过中间件判断当前是否新数据来赋值系统时间
articleSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }
  next()
})

mongoose.model('Article', articleSchema)
