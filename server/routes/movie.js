import mongoose from 'mongoose'
import {Controller, Get, Required,Log} from '../decorator/router'
import {getAllMovies, getSingleMovie, getRelativeMovies} from '../service/movie'

@Controller('/api/v0/movies')
export default class MovieRouter {
  @Get('/')
  @Log
  async getMovieList(ctx, next) {
    const type = ctx.query.type
    const year = ctx.query.year
    const movies = await getAllMovies(type, year)

    ctx.body = {
      data: movies,
      success: true,
    }
  }

  @Get('/detail/:id')
  async getMovieDetail(ctx, next) {
    const id = ctx.params.id
    const movie = await getSingleMovie(id)
    const relativeMovies = await getRelativeMovies(movie)

    ctx.body = {
      data: {
        movie,
        relativeMovies,
      },
      success: true,
    }
  }
}
