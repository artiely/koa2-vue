import mongoose from 'mongoose'
import {Controller, Get, Required,Log} from '../decorator/router'
import {getAllMovies, getSingleMovie, getRelativeMovies} from '../service/movie'

@Controller('/api/v0/movies')
export default class MovieRouter {
  @Get('/:page/:limit')
  @Log
  async getMovieList(ctx, next) {
    const type = ctx.query.type
    const year = ctx.query.year
    const page = ctx.query.page
    const limit = ctx.query.limit
    const movies = await getAllMovies(type, year,page,limit)

    ctx.body = {
      data: movies,
      code: 0,
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
