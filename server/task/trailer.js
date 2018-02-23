const cp = require('child_process')
const {resolve} = require('path')
const mongoose = require('mongoose')
const {connect} = require('../db/index')
const Movie = mongoose.model('Movie')

// 连接数据库
void (async () => {
  await connect()
})()
void (async () => {
  let movies = await Movie.find({
    $or: [{video: {$exists: false}}, {video: null}],
  }).exec()

  let invoked = false
  let script = resolve(__dirname, '../crawler/video')
  let child = cp.fork(script, [])

  child.on('error', err => {
    if (invoked) return
    invoked = true

    console.log(err)
  })

  child.on('exit', code => {
    if (invoked) return
    invoked = false
    let err = code === 0 ? null : new Error('exit code ' + code)

    console.log(err)
  })

  child.on('message', async data => {
    let doubanId = data.doubanId
    let movie = await Movie.findOne({
      doubanId: doubanId,
    }).exec()

    if (data.video) {
      movie.video = data.video
      movie.cover = data.cover

      await movie.save()
    } else {
      await movie.remove()
    }
  })

  child.send(movies)
})()
