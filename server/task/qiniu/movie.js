const qiniu = require('qiniu')
const mongoose = require('mongoose')
const nanoid = require('nanoid')
const config = require('./config')
const {connect} = require('../../db/index')
const bucket = config.bucket
const mac = new qiniu.auth.digest.Mac(config.AK, config.SK)
const cfg = new qiniu.conf.Config()
const client = new qiniu.rs.BucketManager(mac, cfg)
void (async () => {
  await connect()
})()
const Movie = mongoose.model('Movie')

const uploadToQiniu = async (url, key) => {
  return new Promise((resolve, reject) => {
    client.fetch(url, bucket, key, (err, ret, info) => {
      if (err) {
        reject(err)
      } else {
        if (info.statusCode === 200) {
          resolve({key})
        } else {
          reject(info)
        }
      }
    })
  })
}
;(async () => {
  let movies = await Movie.find({
    $or: [{videoKey: {$exists: false}}, {videoKey: null}, {videoKey: ''}],
  }).exec()

  for (let i = 0; i < movies.length; i++) {
    let movie = movies[i]

    if (movie.video && !movie.videoKey) {
      try {
        let videoData = await uploadToQiniu(movie.video, nanoid() + '.mp4')
        let coverData = await uploadToQiniu(movie.cover, nanoid() + '.png')
        let posterData = await uploadToQiniu(movie.poster, nanoid() + '.png')

        console.log(videoData)
        console.log(movie)

        if (videoData.key) {
          movie.videoKey = videoData.key
        }
        if (coverData.key) {
          movie.coverKey = coverData.key
        }
        if (posterData.key) {
          movie.posterKey = posterData.key
        }

        await movie.save()
      } catch (err) {
        console.log(err)
      }
    }
  }
})()
