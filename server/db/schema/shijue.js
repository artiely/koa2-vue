const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Mixed = Schema.Types.Mixed

const shijueSchema = new Schema({
  title: String,
  poster: String,
  content: String,
  posterKey: String,
  cover: {
    type: Boolean, // 这其实是一个多余字段（用来判断内容的img是否替换过）
    default: false,
  },
  id: {
    type: String,
    unique: true,
    require: true,
  },
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
shijueSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }
  next()
})

mongoose.model('Shijue', shijueSchema)
