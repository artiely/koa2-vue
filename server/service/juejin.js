import mongoose from 'mongoose'
const Juejin = mongoose.model('Article')

export const getJuejin = async (page, limit, ids) => {
  var page = page || 1
  var limit = Number(limit) || 10
  var count = await Juejin.count()
  var ids = ids || null
  if (ids) {
    console.log('有id')
    const juejin = await Juejin.find({_id: {$in: ids}})
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({_id: -1})
      .exec()
    return {juejin, count}
  } else {
    console.log('无id')
    const juejin = await Juejin.find({})
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({_id: -1})
      .exec()
    return {juejin, count}
  }
}

/* export const getJuejinByIds = async (page, limit,ids) => {
  var ids =ids
  var page = page || 1
  var limit = Number(limit) || 10
 
  var count = await Juejin.count()
  const juejin = await Juejin.find({id:{$in:ids}})
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({_id: -1})
    .exec()
  return {juejin,count}
} */
