const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const TagSchema = new mongoose.Schema({
  name: {
    unique: true,
    type: String,
  },
  articles: [
    {
      type: ObjectId,
      ref: 'Article', // ref指向Article模型
    },
  ],
  meta: {
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
  },
})

TagSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }
  next()
})

mongoose.model('Tag', TagSchema)
