const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Mixed = Schema.Types.Mixed

const meiziSchema = new Schema({
  title: String,
  poster: String,
  links: [String],
  posterKey:String,
  linksKey:[String],
  groupId: {
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
meiziSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }
  next()
})

mongoose.model('Meizi', meiziSchema)
