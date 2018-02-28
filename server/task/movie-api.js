// http://api.douban.com/v2/movie/subject/1764796
const rp = require('request-promise-native')
const {connect} = require('../db/index')
const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')
const MovieCate = mongoose.model('MovieCate')

async function fetchMovie(item) {
  
  const url = `http://api.douban.com/v2/movie/${item.doubanId}`
  console.log(url)
  let res = await rp(url)

  try {
    res = JSON.parse(res)
  } catch (err) {
    console.log(err)
    res = null
  }

  return res
}

void(async () => {
  await connect()
  let movies = await Movie.find({
    $or: [
      {summary: {$exists: false}},
      {summary: null},
      {title: ''},
      {summary: ''},
    ],
  }).exec()

  for (let i = 0; i < movies.length; i++) {
    let movie = movies[i]
    let movieData = await fetchMovie(movie)

    if (movieData) {
      let tags = movieData.tags || []

      movie.tags = []
      movie.summary = movieData.summary || ''
      movie.title = movieData.alt_title || movieData.title
      movie.rawTitle = movieData.title || ''

      if (movieData.attrs) {
        movie.movieTypes = movieData.attrs.movie_type || []
        for(let i=0;i<movie.movieTypes.length;i++){
          let item = movie.movieTypes[i]
          let cate = await MovieCate.findOne({
            name:item
          })

          if(!cate){
            cate = new MovieCate({name:item,movies:[movie._id]})
          }else{
            if(cate.movies.indexOf(movie._id)===-1){
              cate.movies.push(movie._id)
            }
          }
          await cate.save()
          if(!movie.category){
            movie.category.push(cate._id)
          }else{
            if(movie.category.indexOf(cate._id)===-1){
              movie.category.push(cate._id)
            }
          }
        }
        
        let dates = movieData.attrs.pubdate || []
        let pubdates = []

        dates.map(item => {
          if (item && item.split('(').length > 0) {
            let parts = item.split('(')
            let date = parts[0]
            let country = '未知'

            if (parts[1]) {
              country = parts[1].split(')')[0]
            }

            pubdates.push({
              date: new Date(date),
              country,
            })
          }
        })

        movie.pubdate = pubdates
      }

      tags.forEach(tag => {
        movie.tags.push(tag.name)
      })

      await movie.save()
    }
  }
})()
