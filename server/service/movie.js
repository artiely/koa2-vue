import mongoose from 'mongoose'

const Movie = mongoose.model('Movie')

export const getAllMovies = async (type, year) => {
  let query = {}

  if (type) {
    query.movieTypes = {$in: [type]}
  }
  if (year) {
    query.year = year
  }

  const movies = await Movie.find(query)

  return movies
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
