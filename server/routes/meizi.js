import mongoose from 'mongoose'
import {Controller, Get, Required, Log} from '../decorator/router'
import {getMeizi} from '../service/meizi'

@Controller('/api/v0/meizi')
export default class MeiziRouter {
  @Get('/:page/:limit')
  @Log
  async getMeiziList(ctx, next) {
    const page = ctx.query.page
    const limit = ctx.query.limit
    const meizi = await getMeizi(page, limit)

    ctx.body = {data: meizi, code: 0}
  }
}
