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
    const page = ctx.params.page
    const limit = Number(ctx.params.limit)
    const {movies,count} = await getAllMovies(type, year,page,limit)

    ctx.body = {data: movies, code: 0, count:count}
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
      code: 0,
    }
  }
}
