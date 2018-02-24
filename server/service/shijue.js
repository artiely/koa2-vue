import mongoose from 'mongoose'
const Shijue = mongoose.model('Shijue')

export const getShijue = async (page, limit) => {
  var page = page || 1
  var limit = Number(limit) || 10

  const shijue = await Shijue.find({})
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({_id: -1})
    .exec()
  return shijue
}
