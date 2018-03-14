import mongoose from 'mongoose'
import {Controller, Get, Required, Log} from '../decorator/router'
import {getTags} from '../service/tag'

@Controller('/api/v0/tags')
export default class TagsRouter {
  @Get('/:page/:limit')
  @Log
  async getTagList(ctx, next) {
    const page = ctx.params.page
    const limit = Number(ctx.params.limit)
    const {tags, count} = await getTags(page, limit)
    ctx.body = {data: tags, code: 0, count: count}
  }
}
