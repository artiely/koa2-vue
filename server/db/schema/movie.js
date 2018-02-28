const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {Mixed,ObjectId} = Schema.Types

const MovieSchema = new mongoose.Schema({
  doubanId: String,
  rate: Number,
  title: String,
  summary: String,
  video: String,
  cover: String,
  poster: String,
  videoKey: String,
  coverKey: String,
  posterKey: String,
  rawTitle: String,
  movieTypes: [String],
  pubdate: Mixed,
  tags: Mixed,
  category: [
    {
      type: ObjectId,
      ref: 'MovieCate', 
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

MovieSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }

  next()
})

mongoose.model('Movie', MovieSchema)
