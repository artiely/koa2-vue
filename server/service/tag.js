import mongoose from 'mongoose'
const Tag = mongoose.model('Tag')

export const getTags = async (page, limit) => {
  var page = page || 1
  var limit = Number(limit) || 10
  var count = await Tag.count()
  const tags = await Tag.find({})
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({_id: -1})
    .exec()
  return {tags, count}
}
