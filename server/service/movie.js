import mongoose from 'mongoose'

const Movie = mongoose.model('Movie')

export const getAllMovies = async (type, year,page,limit) => {
  var query ={}
  if (type) {
    query.movieTypes = {$in: [type]}
  }
  if (year) {
    query.year = year
  }
  const count = await Movie.count()
  const movies = await Movie.find(query).skip((page - 1) * limit)
    .limit(limit)
    .sort({_id: -1})
    .exec()

  return {movies, count}
}

export const getRelativeMovies = async movie => {
  const relativeMovies = await Movie.find({
    movieTypes: {$in: movie.movieTypes},
  })

  return relativeMovies
}

export const getSingleMovie = async id => {
  const movie = await Movie.findOne({_id: id})

  return movie
}
