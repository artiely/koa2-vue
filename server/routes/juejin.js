import mongoose from 'mongoose'
import {Controller, Get, Required, Log} from '../decorator/router'
import {getJuejin} from '../service/juejin'

@Controller('/api/v0/juejin')
export default class JuejinRouter {
  @Get('/:page/:limit')
  @Log
  async getJuejinList(ctx, next) {
    const page = ctx.params.page
    const limit = Number(ctx.params.limit)
    const {juejin,count} = await getJuejin(page, limit)
    ctx.body = {data: juejin, code: 0,count:count}
  }
}
