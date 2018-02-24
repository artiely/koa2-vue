import mongoose from 'mongoose'
import {Controller, Get, Required, Log} from '../decorator/router'
import {getShijue} from '../service/shijue'

@Controller('/api/v0/shijue')
export default class ShijueRouter {
  @Get('/:page/:limit')
  @Log
  async getShijueList(ctx, next) {
    const page = ctx.params.page
    const limit = Number(ctx.params.limit) 
    const shijue = await getShijue(page, limit)

    ctx.body = {data: shijue, code: 0}
  }

}
