import mongoose from 'mongoose'
const Juejin = mongoose.model('Article')

export const getJuejin = async (page, limit) => {
  var page = page || 1
  var limit = Number(limit) || 10
  var count = await Juejin.count()
  const juejin = await Juejin.find({})
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({_id: -1})
    .exec()
  return {juejin,count}
}
