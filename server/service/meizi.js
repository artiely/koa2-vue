import mongoose from 'mongoose'
const Meizi = mongoose.model('Meizi')

export const getMeizi = async (page, limit) => {
  var page = page || 1
  var limit = Number(limit) || 10

  const meizi = await Meizi.find({})
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({_id: -1})
    .exec()
  return meizi
}
