import {Route} from '../decorator/router'
import {resolve} from 'path'

export const router = app => {
  const routesPath = resolve(__dirname, '../routes')
  const instance = new Route(app, routesPath)

  instance.init()
}
