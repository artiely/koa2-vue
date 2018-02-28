const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const MovieCateSchema = new mongoose.Schema({
  name:{
    unique:true,
    type:String
  },
  movies:[{
    type:ObjectId,
    ref:'Movie' // ref指向Movie模型
  }],
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

MovieCateSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }

  next()
})

mongoose.model('MovieCate', MovieCateSchema)
